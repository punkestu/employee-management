import { isAuth } from "../helper/auth";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Employee Manager</h1>
      {isAuth() ? <></> : <a href="/login">Login</a>}
    </div>
  );
}
