import React, { useState } from "react";
import "./index.css";
import io from "socket.io-client";
import Chat from "./components/Chat";
import { ImCross } from "react-icons/im";

const socket = io.connect("http://localhost:5000");

function App() {
  const [ismodal, setmodal] = useState(false);
  const [ismodalText, setmodalText] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setshowchat] = useState(false);
  const join = () => {
    const userobject = {
      username: user,
      room: room,
    };
    if (user !== "" && room !== "") {
      socket.emit("join_room", userobject);
      setshowchat(true);
    } else {
      setmodalText("Invalid Details !");
      setmodal(true);
    }
  };
  window.onclick = function (event) {
    if (event.target === document.getElementById("modal-overlay")) {
      setmodal(false);
    }
  };
  return (
    <div className="hero-wrapper">
      <div>
        <div className="modal" style={{ top: ismodal ? "40px" : "-500px" }}>
          <div>
            <ImCross
              onClick={() => {
                setmodal(false);
              }}
              className="cross"
              style={{
                position: " absolute",
                top: "7px",
                right: "7px",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="modal-msg">
            <p>{ismodalText}</p>
          </div>
        </div>
        <div
          className="modal-overlay"
          id="modal-overlay"
          style={{
            display: ismodal ? "block" : "none",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            zIndex: "998",
            display: "none",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        ></div>
      </div>
      {!showchat ? (
        <div className="form-container">
          <div>
            <img className="animate-img" src="../imgs/landing.png" alt="" />
          </div>

          <form>
            <label htmlFor="name">
              Name :
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
            </label>
            <label htmlFor="roomId">
              Room Id :
              <input
                type="text"
                id="roomId"
                placeholder="Create or Join a room"
                name="roomId"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </label>

            <button
              onClick={join}
              className="btn"
              style={{ margin: "1rem .5rem" }}
            >
              Create / Join
            </button>
          </form>
        </div>
      ) : (
        <Chat socket={socket} user={user} room={room} />
      )}
    </div>
  );
}

export default App;
