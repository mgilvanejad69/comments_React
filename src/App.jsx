import React, { useRef, useState } from "react";
import AddComment from "./components/AddComment";
import Comments from "./container/Comments";
import Post from "./components/Post";
import "./App.css";
import Rate from "./components/Rate";
import ReplyContext from "./contexts";

function App() {
  const commentRef = useRef();
  const [isReplied, setIsReplied] = useState(false);
  const [name, setName] = useState(null);
  return (
    <ReplyContext.Provider
      value={{
        commentRef,
        isReplied,
        setIsReplied,
        name,
        setName,
      }}
    >
      <div className="app">
        <Post />
        <Rate />
        <AddComment />
        <Comments />
      </div>
    </ReplyContext.Provider>
  );
}

export default App;
