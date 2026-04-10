import { useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import { updatePost } from "../services/editPost";
import { storeHooks } from "../store/storeHooks";
import { deletePost } from "../services/posts";

const EditPost = ({ closePost, chosenPost, setChosenPost, fetchPosts }) => {
  const [title, setTitle] = useState(chosenPost?.title || "");
  const [companyName, setCompanyName] = useState(chosenPost?.companyName || "");
  const [link, setLink] = useState(chosenPost?.link || "");
  const [status, setStatus] = useState(chosenPost?.status || "");
  const [adText, setAdText] = useState(chosenPost?.adText || "");
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const [error, setError] = useState("");
  const { posts, setPosts, setOpenPost, setShowEdit } = storeHooks();
  const [applicationDate, setApplicationDate] = useState(
    chosenPost?.applicationDate?.split("T")[0] || "",
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      ...chosenPost,
      title,
      companyName,
      link,
      status,
      adText,
      applicationDate,
    };

    try {
      await updatePost(chosenPost.id, updatedPost);

      setChosenPost(updatedPost);

      const updatedPosts = posts.map((post) =>
        post.id === chosenPost.id ? updatedPost : post,
      );

      setPosts(updatedPosts);

      closePost();
    } catch (error) {
      console.error(error);
    }
  };
  const removePost = async () => {
    if (deleteInput === "DELETE") {
      try {
        await deletePost(chosenPost.id);
        await fetchPosts();
        setOpenDelete(false);

        setShowEdit(false);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("must write DELETE");
    }
  };

  return (
    <div className="create-post-overlay ">
      <div className="show-info  edit-post">
        <div className="row-between">
          <h2>Edit post</h2>
          <div className="self-center">
            <button onClick={() => setOpenDelete(true)}>DELETE</button>
          </div>
        </div>
        {openDelete && (
          <div className="show-info red-small">
            <InputLabel
              type={"text"}
              labelTxt={`Write "DELETE" to remove post`}
              value={deleteInput}
              setValue={setDeleteInput}
            />
            <p className="error-d">{error}</p>
            <button onClick={removePost}>DELETE</button>

            <button
              className="margin-top-1"
              onClick={() => setOpenDelete(false)}
            >
              CANCEL
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputLabel
            type="text"
            labelTxt="Job Title"
            value={title}
            setValue={setTitle}
          />

          <InputLabel
            type="text"
            labelTxt="Company Name"
            value={companyName}
            setValue={setCompanyName}
          />

          <InputLabel
            type="text"
            labelTxt="Job Link"
            value={link}
            setValue={setLink}
          />

          <InputLabel
            type="text"
            labelTxt="Status"
            value={status}
            setValue={setStatus}
          />

          <label>Ad Text</label>
          <textarea
            value={adText}
            onChange={(e) => setAdText(e.target.value)}
          />

          <InputLabel
            type="date"
            labelTxt="Application Date"
            value={applicationDate}
            setValue={setApplicationDate}
          />

          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              closePost();
              setOpenPost(true);
            }}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
