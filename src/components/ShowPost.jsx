import { useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import { storeHooks } from "../store/storeHooks";
import { addComment, getComment } from "../services/comment";
import EditPost from "./EditPost";

const ShowPost = () => {
  const [commentInput, setCommentInput] = useState("");
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addingComment, setAddingComment] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);
  const { chosenPost, setChosenPost, setOpenPost, showEdit, setShowEdit } =
    storeHooks();

  useEffect(() => {
    const getPostsComments = async () => {
      try {
        await fetchComments();
      } catch (err) {
        setErrorTxt(err.message);
      }
    };
    getPostsComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    let response = await getComment(chosenPost.id);
    setComment(response.data);
    setLoading(false);
  };

  const addCommentToPost = async () => {
    if (commentInput !== "") {
      try {
        await addComment(chosenPost.userId, chosenPost.id, commentInput);
        await fetchComments();
        setAddingComment(false);
        setCommentAdded(true);
        setCommentInput("");
        set;
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="create-post-overlay ">
      <div className="show-info">
        <div className="flex-end">
          <button
            onClick={() => setOpenPost(false)}
            type="button"
            className="close-btn"
          >
            ✕
          </button>
        </div>
        <div className="center">
          <h1>{chosenPost.title}</h1>
          <p>{chosenPost.companyName}</p>
          <a>{chosenPost.link}</a>
        </div>
        <p>{chosenPost.adText}</p>

        <div className="comment-h-btn ">
          <p className="center">Comments:</p>
          <div className="self-center">
            <button onClick={() => setAddingComment(true)}>Add comment</button>
          </div>
        </div>
        <div className="comment-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            comment.map((c) => <p key={c.id}>{c.text}</p>)
          )}

          {!commentAdded ? (
            addingComment && (
              <div className="show-info">
                <InputLabel
                  type={"text"}
                  labelTxt={"Comment"}
                  value={commentInput}
                  setValue={setCommentInput}
                />
                <button className="margin-b1" onClick={addCommentToPost}>
                  Add
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setAddingComment(false)}
                >
                  ✕
                </button>
              </div>
            )
          ) : (
            <div className="show-info">
              <p className="margin-b1">Comment added</p>
              <button
                className="margin-b1"
                onClick={() => {
                  setAddingComment(true);
                  setCommentAdded(false);
                }}
              >
                Add another
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setCommentAdded(false)}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <p>Status: {chosenPost.status}</p>

        <button
          onClick={() => {
            setShowEdit(true);
            setOpenPost(false);
          }}
        >
          Edit post
        </button>
      </div>
    </div>
  );
};

export default ShowPost;
