import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { authenticate } from "./helper/auth";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = (e) => {
    e.preventDefault();
    authenticate(username, password).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("auth", res.body.token);
      } else {
        console.log(res.body);
      }
    });
  };

  return (
    <>
      <Sidebar />
      <form onSubmit={auth}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default App;
