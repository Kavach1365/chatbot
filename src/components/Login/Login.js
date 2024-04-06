import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserLarge, FaLock } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import "./Login.css";
import Home from "../../media/Home.png";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken);
    if (jwtToken !== undefined) {
      history("/home");
    }
  });

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const loginAccount = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      await axios
        .post("http://localhost:8000/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "notexist") {
            alert("User have not signed up!");
          } else if (res.data === "Invalid Password") {
            alert("Please provide correct password");
          } else {
            Cookies.set("jwt_token", res.data, {
              expires: 30,
              path: "/",
            });
            history("/home", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <img src={Home} alt="home" className="image" />
      <div className="input-container">
        <h1 className="ayumitra-text">AYUMITRA</h1>
        <form className="form-container" onSubmit={loginAccount} action="POST">
          <div className="username-password-container">
            <FaUserLarge className="icon" />
            <input
              type="text"
              placeholder="EMAIL..."
              className="input-field"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className="username-password-container">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="PASSWORD..."
              className="input-field"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <div className="forgot-password-container">
            <p className="forgot-password">Forgot Password?</p>
          </div>
          <div>
            <p className="to-signup-page">
              Don't have an account?{" "}
              <Link to="/signup" className="to-signup-page">
                SignUp Page
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
