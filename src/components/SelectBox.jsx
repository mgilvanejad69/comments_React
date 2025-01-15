import { useEffect, useRef, useState } from "react";
function SelectBox() {
  const [TOPICDATA, setTOPICDATA] = useState([]);
  const [hasStyle, setHasStyle] = useState(true);
  const [topicTitle, setTopicTitle] = useState("");
  const [isTopicSelected, setIsTopicSelected] = useState(false);
  const inputRef = useRef();
  const closeStyle = {
    padding: 0,
    height: 0,
    overflow: "hidden",
  };

  const handleTopic = (e) => {
    if (e.target.value !== "") {
      setHasStyle(false);
      fetch(`http://127.0.0.1:8000/?search=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          return setTOPICDATA(data.data.matchedTechs);
        })
        .catch((error) => console.log(error));
    } else {
      setHasStyle(true);
    }
    setTopicTitle(e.target.value);
  };

  const handleInputClick = () => {
    setTopicTitle("");
    setIsTopicSelected(false);
  };

  const handleSelectTopic = (item) => {
    setTopicTitle(item);
    setIsTopicSelected(true);
    setHasStyle(true);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setHasStyle(true);
      setTopicTitle("");
    } else {
      setHasStyle(false);
    }
  };
  useEffect(() => {
    if (!isTopicSelected) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isTopicSelected]);
  return (
    <div className="c-box">
      <input
        className="tpc"
        placeholder="topic"
        type="text"
        onClick={handleInputClick}
        onChange={handleTopic}
        value={topicTitle}
      />
      <div
        className="c-selectbox"
        style={hasStyle ? closeStyle : { overflow: "visible" }}
        ref={inputRef}
      >
        {TOPICDATA.map((elem) => (
          <div
            className="item"
            key={elem.id}
            onClick={() => handleSelectTopic(elem.name)}
          >
            <label htmlFor={elem.id}>{elem.name}</label>
            <input type="radio" name="" id={elem.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectBox;
