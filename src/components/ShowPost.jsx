import { useState } from "react";
import InputLabel from "./InputLabel";
import { storeHooks } from "../store/storeHooks";

const ShowPost = () => {
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { chosenPost, setChosenPost } = storeHooks();
  return (
    <div className="show-info">
      {/* add x to  close show, also reset chosenPost to "" when closing */}
      <div className="flex-end">
        <button onClick={() => setChosenPost(null)}>X</button>
      </div>
      <div className="center">
        <h1>{chosenPost.title}</h1>
        <p>{chosenPost.companyName}</p>
        <a>{chosenPost.link}</a>
      </div>
      <p>{chosenPost.adText}</p>

      <div>
        {/* add connection to API for comments */}
        <p>comment</p>
        <p>comment</p>
        <button onClick={() => setAddingComment(true)}>Add comment</button>
        {addingComment && (
          <div className="show-info">
            <InputLabel
              type={"text"}
              labelTxt={"Comment"}
              value={comment}
              setValue={setComment}
            />
            <button>Add</button>
            <button className="red" onClick={() => setAddingComment(false)}>
              Close
            </button>
          </div>
        )}
      </div>
      <p>Status: {chosenPost.status}</p>
      <button>Edit post</button>
    </div>
  );
};

export default ShowPost;
