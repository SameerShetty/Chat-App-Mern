import React, { useState } from "react";
import "./index.css";
import io from "socket.io-client";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:5000");

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setshowchat] = useState(false);
  const join = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setshowchat(true);
    }
  };
  return (
    <div className="hero-wrapper">
      {!showchat ? (
        <div className="form-wrapper">
          <form>
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
              <span>Name</span>
            </label>
            <label htmlFor="roomId">
              <input
                type="text"
                id="roomId"
                name="roomId"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <span>Room Id</span>
            </label>
            <button
              onClick={join}
              className="btn"
              style={{ borderradius: "15px" }}
            >
              Join
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
