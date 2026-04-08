import { useState } from "react";
import InputLabel from "./InputLabel";

const ShowPost = () => {
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { post } = storeHooks();
  return (
    <div>
      {/* add x to  close show, also reset chosenPost to "" when closing */}
      <h1>{post.title}</h1>
      <p>{post.companyName}</p>
      <a>{post.link}</a>
      <p>{post.adText}</p>

      <div>
        {/* add connection to API for comments */}
        <p>comment</p>
        <p>comment</p>
        <button onClick={() => setAddingComment(true)}>Add comment</button>
        {addingComment && (
          <div>
            <InputLabel
              type={"text"}
              labelTxt={"Comment"}
              value={comment}
              setValue={setComment}
            />
          </div>
        )}
      </div>
      <p>{post.status}</p>
      <button>Edit post</button>
    </div>
  );
};

export default ShowPost;
