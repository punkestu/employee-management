import { signout } from "../helper/auth";
import { useContext } from "react";
import { AuthContext } from "../store";

import { useNavigate, Link } from "react-router-dom";

import Profile from "./Profile";

export default function Sidebar() {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <aside className="sidebar" id="side-bar">
      <h1
        style={{
          marginBottom: "8px",
        }}
      >
        Employee Manager
      </h1>
      {isAuth ? (
        <>
          <button
            className="side-item"
            type="button"
            onClick={() => {
              signout();
              setIsAuth(false);
              navigate("/login");
            }}
          >
            Logout
          </button>
          <Profile />
        </>
      ) : (
        <>
          <Link className="side-item" to="/login">
            Login
          </Link>
        </>
      )}
    </aside>
  );
}
