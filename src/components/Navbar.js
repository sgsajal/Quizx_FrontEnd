import React from "react";
import { Link ,useLocation} from "react-router-dom";
import { useAuth } from "../Auth/UseAuth";
import "../styles/Navbar.css";

function Navbar() {
  
  const location=useLocation();
  const {pathname}=location;
  const splitLocation=pathname.split('/');
  const { username } = useAuth();

  return (

    <nav className="navbar">
      <div className="logo">
        <Link to="/profile">QuizX</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link className={splitLocation[1]==="" ? "active" : ""} to="/">Home</Link>
        </li>
        <li>
          <Link className={splitLocation[1]==="quiz" ? "active" : ""} to="/quiz">Quiz</Link>
        </li>
        <li>
          <Link className={splitLocation[1]==="createquiz" ? "active" : ""} to="/createquiz">Create</Link>
        </li>
        <li>
          <Link className={splitLocation[1]==="yourquiz" ? "active" : ""} to="/yourquiz">Results</Link>
        </li>
        <li>
        {username ? (
              <Link className={splitLocation[1]==="profile" ? "active" : ""} to="/profile">{username}</Link>
            ) : (
              <Link className={splitLocation[1]==="login" ? "active" : ""} to="/login">login</Link>
            )}</li>
      </ul>
    </nav>
  );
}

export default Navbar;
