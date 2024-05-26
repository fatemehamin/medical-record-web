import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import Landing from "../../pages/Landing";
import Signup from "../../pages/Signup";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/:typeUser" element={<Login />} />
        <Route path="/signup/:typeUser" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Routers;
