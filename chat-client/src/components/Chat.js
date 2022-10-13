import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io();

function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <div className="hero-wrapper">
      <div className="chat-section">
        <div>
          {" "}
          <h2>Sameer Shetty</h2>
          <p>Hey ! Guys whatsup ??</p>
        </div>
        <div>
          {" "}
          <h2>Its Sam !</h2>
          <p>Its drippin pal!..</p>
        </div>
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
            placeholder="Type your message..."
            autoComplete="false"
            spellCheck="true"
          />{" "}
          <button
            className="btn"
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
    </div>
  );
}

export default Chat;
