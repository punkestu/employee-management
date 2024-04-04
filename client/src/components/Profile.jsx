/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../store";
import { signout } from "../helper/auth";

export default function Profile() {
  const [user, setUser] = useState({});
  const [isAuth] = useContext(AuthContext);
  useEffect(() => {
    if (isAuth) {
      fetch(
        `${import.meta.env.PROD ? "/" : "http://localhost:3000/"}api/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401) {
            return signout();
          }
          return res.json();
        })
        .then((res) => {
          setUser(res.data);
        });
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p style={{ fontSize: "1.3rem" }}>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  );
}
