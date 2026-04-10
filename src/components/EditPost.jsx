import { useState } from "react";
import InputLabel from "./InputLabel";
import { updatePost } from "../services/editPost";
import { storeHooks } from "../store/storeHooks";

const EditPost = ({ closePost, chosenPost, setChosenPost }) => {
  const [title, setTitle] = useState(chosenPost?.title || "");
  const [companyName, setCompanyName] = useState(chosenPost?.companyName || "");
  const [link, setLink] = useState(chosenPost?.link || "");
  const [status, setStatus] = useState(chosenPost?.status || "");
  const [adText, setAdText] = useState(chosenPost?.adText || "");
  const { posts, setPosts } = storeHooks();
  const [applicationDate, setApplicationDate] = useState(
    chosenPost?.applicationDate?.split("T")[0] || ""
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
        post.id === chosenPost.id ? updatedPost : post
      );

      setPosts(updatedPosts);

      closePost();
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="show-info edit-post">
      <h2>Edit post</h2>

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
        <button type="button" onClick={closePost}>
          Close
        </button>
      </form>
    </div>
  );
};

export default EditPost;
