import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Landing.css";
import Home from "../../media/Home.png";

const Landing = () => {
  const jwtToken = Cookies.get("jwt_token");
  console.log(jwtToken);

  return (
    <div className="landing-container">
      <div style={{ backgroundImage: `url(${Home})` }} className="bg-image">
        <div className="nav-container">
          <Link to="/home" className="link-element">
            <button className="landing-button">HOME</button>
          </Link>
          <Link to="/signup" className="link-element">
            <button className="landing-button">SIGN UP</button>
          </Link>
          <Link to="/login" className="link-element">
            <button className="landing-button">LOGIN</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
