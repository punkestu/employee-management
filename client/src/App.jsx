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
      <Sidebar />
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Rollup>
  );
}

export default App;
