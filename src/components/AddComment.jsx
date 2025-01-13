import React, { useContext } from "react";
import ReplyContext from "../contexts";
import SelectBox from "../components/SelectBox";

function AddComment() {
  const { commentRef, isReplied, setIsReplied, name } =
    useContext(ReplyContext);

  const handleCancelReply = () => {
    setIsReplied(false);
  };
  return (
    <div className="ac-wrapper" ref={commentRef}>
      {isReplied ? (
        <h2 className="addCommentTitle">
          Write your comment in response to {name}:
        </h2>
      ) : (
        <h2 className="addCommentTitle">Write your comment:</h2>
      )}
      <form action="" className="form">
        <input placeholder="name" type="text" />
        <input placeholder="email" type="text" />
        {isReplied ? "" : <SelectBox />}
        <textarea
          placeholder="message..."
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button>Send</button>
        {isReplied ? <button onClick={handleCancelReply}>Cancel</button> : ""}
      </form>
    </div>
  );
}

export default AddComment;
