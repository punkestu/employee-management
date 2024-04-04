import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { wasAuth } from "./helper/auth";
import { Rollup } from "./helper/context";

import { AuthContext, StateContext } from "./store";
import Login from "./pages/Login";

function App() {
  const [state, setState] = useState("");
  const providers = [
    [AuthContext, useState(wasAuth())],
    [StateContext, [state, setState]],
  ];

  return (
    <Rollup providers={providers}>
      <main
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          padding: "10px",
          gap: "10px",
        }}
      >
        {state === "loading" && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              color: "white",
            }}
          >
            Loading...
          </div>
        )}
        <Sidebar />
        <aside
          style={{
            height: "100%",
            flexGrow: 1,
            backgroundColor: "lightgray",
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </aside>
      </main>
    </Rollup>
  );
}

export default App;
