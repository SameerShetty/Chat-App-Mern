import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, user, room }) {
  const [msg, setmsg] = useState("");
  const [msgstack, setmsgstack] = useState([]);
  const sendmsg = async () => {
    if (msg !== "") {
      const message = {
        room: room,
        sender: user,
        actmsg: msg,
        time:
          new Date(Date.now()).getHours() +
          " : " +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", message);
      setmsgstack((list) => [...list, message]);
      playSound();
      setmsg("");
    }
  };
  const playSound = () => {
    const audio = new Audio("../notification_sound.mp3");
    audio.play();
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      playSound();
      if (data.sender !== user) {
        setmsgstack((prev) => {
          return [...prev, data];
        });
      }
    });
  }, [socket]);

  return (
    <div className="chat-section">
      <ScrollToBottom className="chat-window">
        {msgstack.map((messagedata) => {
          return (
            <div
              className="chat-box"
              key={messagedata.actmsg * Math.random() * 10000}
              id={user === messagedata.sender ? "me" : "other"}
            >
              <h2>{messagedata.sender}</h2>
              <p>{messagedata.actmsg}</p>
              <h4>{messagedata.time}</h4>
            </div>
          );
        })}
      </ScrollToBottom>
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "0",
          left: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "nowrap",
        }}
      >
        <input
          type="text"
          name="message"
          value={msg}
          onChange={(e) => {
            setmsg(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && sendmsg();
          }}
          placeholder="Type your message..."
          autoComplete="false"
          spellCheck="true"
        />{" "}
        <button
          className="btn"
          onClick={sendmsg}
          style={{
            width: "3.5%",
            borderRadius: "50%",
            padding: "0",
            aspectRatio: "1",
          }}
        >
          {" "}
          S
        </button>
      </div>
    </div>
  );
}

export default Chat;
