import { AiOutlineStar as StartIconEmpty } from "react-icons/ai";
import { AiFillStar as StartIconFull } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Rate() {
  const [star, setStar] = useState([
    { id: 1, hover: false, clicked: false },
    { id: 2, hover: false, clicked: false },
    { id: 3, hover: false, clicked: false },
    { id: 4, hover: false, clicked: false },
    { id: 5, hover: false, clicked: false },
  ]);
  const [DATA, setDATA] = useState({});

  const hoverHandler = (id) => {
    let hoverData = star.map((item) => {
      return item.id <= id
        ? { ...item, hover: true }
        : { ...item, hover: false };
    });
    setStar(hoverData);
  };

  const blurHandler = () => {
    const blurData = star.map((item) => {
      return { ...item, hover: false };
    });
    setStar(blurData);
  };

  const submitRateHandler = (id) => {
    let clickedData = star.map((elem) =>
      elem.id <= id
        ? { ...elem, hover: false, clicked: true }
        : { ...elem, hover: false, clicked: false }
    );
    setStar(clickedData);
    fetch(`http://127.0.0.1:8000/posts/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rate: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message, {
            position: "top-left",
          });
        } else {
          if (DATA.rate === 0) {
            toast.error(data.message, {
              position: "top-left",
            }); 
          }
          setDATA(data);
          let clearData = star.map((elem) => ({
            ...elem,
            hover: false,
            clicked: false,
          }));
          setStar(clearData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stepBackward = (rate) => {
    let clickedUpdated = star.map((elem) =>
      elem.id <= rate
        ? { ...elem, hover: false, clicked: true }
        : { ...elem, hover: false, clicked: false }
    );
    setStar(clickedUpdated);
  };

  useEffect(() => {
    if (DATA.status === "error") {
      stepBackward(DATA.rate);
      if (DATA.rate !== 0) {
        toast.error(
          `Rating registering failed, Your Previous Rate is ${DATA.rate},try again.`,
          {
            position: "top-left",
          }
        );
      }
    }
  }, [DATA]);

  return (
    <>
      <div className="rate-box">
        <h1>Rate : </h1>
        <div className="rate-container">
          {star.map((item) => (
            <div
              className="rate"
              key={item.id}
              onMouseEnter={() => hoverHandler(item.id)}
              onMouseLeave={blurHandler}
              onClick={() => submitRateHandler(item.id)}
            >
              {item.clicked || item.hover ? (
                <StartIconFull />
              ) : (
                <StartIconEmpty />
              )}
            </div>
          ))}
        </div>
      </div>
      <hr />
      <ToastContainer />
    </>
  );
}

export default Rate;
