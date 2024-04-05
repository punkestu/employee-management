/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { AuthContext, UserContext } from "../store";
import { signout } from "../helper/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const navigate = useNavigate();
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
            navigate("/login");
            setIsAuth(false);
            signout();
          }
          return res.json();
        })
        .then((res) => {
          setUser(res ? res.data : {});
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
