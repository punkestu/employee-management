/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Employee() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch(
      `${import.meta.env.PROD ? "/" : "http://localhost:3000/"}api/employees`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 403) {
          navigate("/");
          return null;
        }
        return res.json();
      })
      .then((res) => {
        if (res) setEmployees(res.data);
      });
  }, []);
  return (
    <div
      style={{
        margin: "16px",
      }}
    >
      <div>
        <h1>Employee</h1>
        <Link to={"/employee/add"} className="side-item">Tambah</Link>
      </div>
      <ul
        style={{
          listStyleType: "disc",
          marginLeft: "2rem",
        }}
      >
        {employees.map((employee) => (
          <li key={employee.id}>
            <p>{employee.username}</p>
            <p>{employee.email}</p>
            <p>{employee.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
