import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/posts";
import { storeHooks } from "../store/storeHooks";
import ShowPost from "../components/ShowPost";

const FeedPage = () => {
  const { setPosts, posts } = storeHooks();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("newest");
  const [errorTxt, setErrorTxt] = useState("Loading...");

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
            <button>+Add</button>
            {/* add conditional for add post  */}
            <select value={sort} onChange={handleSortChange}>
              <option value="newest">Newest</option>
              <option value="status">Status</option>
              <option value="a-z">A-Z</option>
            </select>
          </div>
          <div>
            {loading ? (
              <p className="center">{errorTxt}</p>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
          {/* add conditional for chosenPost(display <ShowPost/> when it is not "")  */}
          {/* add conditonal for edit post so it displays when clicking edit in showPost component  */}
        </div>
      </div>
    </>
  );
};

export default FeedPage;
