import { useEffect, useState } from "react";
function SelectBox() {
  const [TOPICDATA, setTOPICDATA] = useState([]);
  const [hasStyle, setHasStyle] = useState(true);
  const [topicTitle, setTopicTitle] = useState("");
  const closeStyle = {
    padding: 0,
    height: 0,
    overflow: "hidden",
  };

  const handleTopic = (e) => {
    if (e.target.value !== "") {
      setHasStyle(false);
    } else {
      setHasStyle(true);
    }
    setTopicTitle(e.target.value);
    fetch(`http://127.0.0.1:8000/?search=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setTOPICDATA(data.data.matchedTechs))
      .catch((error) => console.log(error));
  };

  const handleSelectTopic = (item) => {
    setTopicTitle(item);
    setHasStyle(true);
  };

  return (
    <div className="c-box">
      <input
        className="tpc"
        placeholder="topic"
        type="text"
        onChange={handleTopic}
        value={topicTitle}
      />
      <div
        className="c-selectbox"
        style={hasStyle ? closeStyle : { overflow: "visible" }}
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
