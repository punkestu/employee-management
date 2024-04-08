import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store";
import { signout } from "../helper/auth";

const bind = (setter) => (e) => setter(e.target.value);

export default function EmployeeAdd() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("none");

  const setIsAuth = useContext(AuthContext)[1];
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    fetch(
      `${import.meta.env.PROD ? "/" : "http://localhost:3000/"}api/employees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
        body: JSON.stringify({ name, username, email, password, role }),
      }
    )
      .catch((err) => ({ body: `${err.message}` }))
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          setIsAuth(false);
          signout();
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        navigate("/employee");
      });
  };
  return (
    <form onSubmit={submit}>
      <input
        value={name}
        onChange={bind(setName)}
        type="text"
        name="name"
        id="name"
        placeholder="name"
      />
      <input
        value={username}
        onChange={bind(setUsername)}
        type="text"
        name="username"
        id="username"
        placeholder="username"
      />
      <input
        value={email}
        onChange={bind(setEmail)}
        type="email"
        name="email"
        id="email"
        placeholder="email"
      />
      <input
        value={password}
        onChange={bind(setPassword)}
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <select
        name="role"
        id="role"
        value={role}
        onChange={bind(setRole)}
      >
        <option value="none" disabled>
          Role
        </option>
        <option value="employee">Employee</option>
      </select>
      <input type="submit" value="Add" />
    </form>
  );
}
