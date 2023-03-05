import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         email, password
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid email or password");
        }
      })
      .then((data) => {
        console.log(data);
        navigate("/Profile/"+`${data}`);  // { token: 'jwt_token' }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };




  

  return (
    <div className="Container">
      <div className="title">Login</div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <label className="details">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@gmail.com"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="input-box">
            <label className="details">Password</label>
            <input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="***********"
              id="password"
              name="password"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-info">
          Login
        </button>
      </form>
      <div className="Login">
        <div>Don't have an account</div>
        <NavLink to="/Register">
        <button className="btn btn-primary">Register here</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
