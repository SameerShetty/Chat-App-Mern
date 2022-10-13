import React from "react";

function Login() {
  return (
    <div className="hero-wrapper">
      <div className="form-wrapper">
        <form>
          <label htmlFor="name">
            <input type="text" id="name" name="name" required />
            <span>Name</span>
          </label>
          <label htmlFor="roomId">
            <input type="text" id="roomId" name="roomId" />
            <span>Room Id</span>
          </label>
          <button className="btn" style={{ borderradius: "15px" }}>
            Create New Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
