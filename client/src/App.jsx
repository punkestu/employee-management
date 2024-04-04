import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { wasAuth } from "./helper/auth";
import { Rollup } from "./helper/context";

import { AuthContext } from "./store";
import Login from "./pages/Login";

function App() {
  const providers = [[AuthContext, useState(wasAuth())]];

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
