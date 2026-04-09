import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/posts";
import { storeHooks } from "../store/storeHooks";
import CreatePost from "../components/CreatePost"

  const FeedPage = () => {
  const [openAddPost, setOpenAddPost] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const { setPosts, posts } = storeHooks();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("newest");
  const [errorTxt, setErrorTxt] = useState("Loading...");

  useEffect(() => {
  if (showToast) {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }
}, [showToast]);

  const handleSortChange = (e) => {
  const value = e.target.value;
    setSort(value);

    let sortedPosts = [...posts];

    if (value === "newest") {
      sortedPosts.sort(
        (a, b) => new Date(b.applicationDate) - new Date(a.applicationDate),
      );
    } else if (value === "a-z") {
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "status") {
      sortedPosts.sort((a, b) => a.status.localeCompare(b.status));
    }

    setPosts(sortedPosts);
  };
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        setLoading(true);
        let data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setErrorTxt(err.message);
      }
    };
    getUserPosts();
  }, []);
  return (
    <>

      <div className="feed-layout">
        <h1>Job Handler</h1>
        <div className="content-center">
          <div className="row-between margin-b1">
           <button onClick={() => setOpenAddPost(true)}>+ Add</button>
            <select value={sort} onChange={handleSortChange}>
              <option value="newest">Newest</option>
              <option value="status">Status</option>
              <option value="a-z">A-Z</option>
            </select>
          </div>
          {openAddPost && (
          <CreatePost
    closePost={() => setOpenAddPost(false)}
    showToast={() => setShowToast(true)}
  />
)}
          <div>
            {loading ? (
              <p className="center">{errorTxt}</p>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </div>
      {showToast && <div className="toast">Post created!</div>}
    </>
  );
};

export default FeedPage;
