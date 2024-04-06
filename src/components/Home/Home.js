import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Home.css";

export default function Home() {
  const history = useNavigate();
  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken);
    if (jwtToken === undefined) {
      history("/login");
    }
  });
  const logout = () => {
    Cookies.remove("jwt_token");
    history("/login");
  };
  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
