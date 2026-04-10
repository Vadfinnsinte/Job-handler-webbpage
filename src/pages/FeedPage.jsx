import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import AdminUserList from "../components/AdminUsers";
import { getPosts } from "../services/posts";
import { storeHooks } from "../store/storeHooks";
import CreatePost from "../components/CreatePost";
import ShowPost from "../components/ShowPost";
import { getRole, removeToken } from "../functions/helpers/token";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import EditUser from "../components/EditUser";

const FeedPage = () => {
  const [openAddPost, setOpenAddPost] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const {
    setPosts,
    posts,
    chosenPost,
    addingAdmin,
    setAddingAdmin,
    isAdmin,
    setIsAdmin,
    addedAdminUser,
    setAddedAdminUser,
  } = storeHooks();
  const [editUser, setEditUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedChanges, setSavedChanges] = useState(false);
  const [sort, setSort] = useState("newest");
  const [errorTxt, setErrorTxt] = useState("Loading...");
  const [showAdminList, setShowAdminList] = useState(false);
  const [user, setUser] = useState("");

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      setErrorTxt("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  // Load posts when page loads
  //   useEffect(() => {
  //     fetchPosts();
  //   }, []);

  // Toast timer
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  const navigate = useNavigate();
  const role = getRole();
  const signOutUser = () => {
    setIsAdmin(false);
    removeToken();
    navigate("/");
  };

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
    setUser(role.name);
    if (role?.roles?.[0] === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
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
        <div className="header">
          {isAdmin && (
            <div className=" just-self-s">
              <button onClick={() => setAddingAdmin(true)}>
                New admin User
              </button>
              <button onClick={() => setShowAdminList(true)}>
                User List
              </button>
            </div>
            
          )}

          <h1>Job Handler</h1>
          <div className="just-self-e row-between">
            <p className="user-edit" onClick={() => setEditUser(true)}>
              {user}
              <span>✎</span>
            </p>
            <div className="self-center">
              <button onClick={signOutUser}>Sign Out</button>
            </div>
            {editUser && (
              <EditUser
                setEditUser={setEditUser}
                setSavedChanges={setSavedChanges}
                setUser={setUser}
              />
            )}
            {savedChanges && (
              <div className="show-info white">
                <p>Changes saved</p>
              </div>
            )}
          </div>
        </div>
        {showAdminList && (
        <div className="show-info">
          <AdminUserList closeList={() => setShowAdminList(false)} />
        </div>
)}
        <div className="content-center">
          {addingAdmin && (
            <div className="show-info">
              {" "}
              <Register />{" "}
            </div>
          )}
          {addedAdminUser && (
            <div className="show-info white">
              <p>User added</p>{" "}
              <button onClick={() => setAddedAdminUser(false)}>Close</button>
            </div>
          )}
          <div className="row-between margin-b1">
            <button onClick={() => setOpenAddPost(true)}>+Add</button>

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
              refreshFeed={fetchPosts}
            />
          )}

          <div>
            {loading ? (
              <p className="center">{errorTxt}</p>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>

          {chosenPost !== null && <ShowPost />}
        </div>
      </div>

      {showToast && <div className="toast">Post created!</div>}
    </>
  );
};

export default FeedPage;
