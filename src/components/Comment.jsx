import { useContext } from "react";
import Avatar from "../assets/avatar.png";
import ReplyContext from "../contexts";
function Comment({ name, message, children }) {
  const { commentRef, setIsReplied, setName } =
    useContext(ReplyContext);

  const handleReply = () => {
    commentRef.current.scrollIntoView({ behavior: "smooth" });
    setIsReplied(true);
    setName(name);
  };

  return (
    <div className="box">
      <div className="content">
        <div className="avatar">
          <img src={Avatar} alt="avatar" />
        </div>
        <div className="texts">
          <div className="header">
            <h3 className="name">{name}</h3>
            <button onClick={handleReply}>replay</button>
          </div>
          <p className="message">{message}</p>
        </div>
      </div>
      <div className="children">
        {children.map(({ id, name, message, children }) => (
          <Comment
            key={id}
            id={id}
            name={name}
            message={message}
            children={children}
          />
        ))}
      </div>
    </div>
  );
}

export default Comment;
