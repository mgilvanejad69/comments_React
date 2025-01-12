import React, { useRef } from "react";
import AddComment from "./components/AddComment";
import Comments from "./container/Comments";
import Post from "./components/Post";
import "./App.css";
import Rate from "./components/Rate";
function App() {
  const commentRef = useRef();


  return (
    <div className="app">
      <Post />
      <Rate />
      <AddComment ref={commentRef} />
      <Comments commentRef={commentRef}/>
    </div>
  );
}

export default App;
