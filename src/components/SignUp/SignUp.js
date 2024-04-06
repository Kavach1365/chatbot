import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { FaUserLarge, FaLock } from "react-icons/fa6";
import axios from "axios";
import "./SignUp.css";
import Home from "../../media/Home.png";

const Signup = () => {
  // const navigate = useNavigate();
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUername] = useState("");

  //   const NavigateToHome = () => {
  //     useEffect(() => {
  //       navigate("/home");
  //     }, [navigate]);
  //   };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUername(event.target.value);
  };

  const signupAccount = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      await axios
        .post("http://localhost:8000/signup", {
          email,
          username,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exist");
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
        <form className="form-container" onSubmit={signupAccount} action="POST">
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
            <FaUserLarge className="icon" />
            <input
              type="text"
              placeholder="USERNAME..."
              className="input-field"
              value={username}
              onChange={onChangeUsername}
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
            Signup
          </button>
          <div>
            <p className="to-signup-page">
              Already have an account?{" "}
              <Link to="/login" className="to-signup-page">
                Login Page
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
