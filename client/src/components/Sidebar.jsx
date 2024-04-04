import { signout } from "../helper/auth";
import { useContext } from "react";
import { AuthContext } from "../store";

export default function Sidebar() {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  return (
    <aside
      className="sidebar"
      id="side-bar"
    >
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
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <a className="side-item" href="/login">
            Login
          </a>
        </>
      )}
    </aside>
  );
}
