/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { authenticate } from "../helper/auth";
import { useContext } from "react";
import { AuthContext, StateContext } from "../store";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [state, setState] = useContext(StateContext);
  const navigate = useNavigate();
  const auth = (e) => {
    e.preventDefault();
    setState("loading");
    authenticate(username, password).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("auth", res.body.token);
        setIsAuth(true);
      } else {
        console.log(res.body);
      }
      setState("");
    });
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={auth}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
          margin: "10px",
          border: "1px solid black",
          width: "fit-content",
        }}
      >
        <input
          type="text"
          name="username"
          id="username"
          className="input-form"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          disabled={state === "loading"}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="input-form"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          disabled={state === "loading"}
        />
        <button
          type="submit"
          className="input-form"
          disabled={state === "loading"}
        >
          Login
        </button>
      </form>
    </div>
  );
}
