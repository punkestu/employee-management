import { signout } from "../helper/auth";
import { useContext } from "react";
import { AuthContext } from "../store";

export default function Sidebar() {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  return (
    <aside className="sidebar">
      <h1>Employee Manager</h1>
      {isAuth ? (
        <>
          <button
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
        <a href="/login">Login</a>
      )}
    </aside>
  );
}
