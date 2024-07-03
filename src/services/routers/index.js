import React, { useCallback } from "react";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";
import Dashboard from "../../pages/Dashboard";
import Profile from "../../pages/Profile";
import SideBar from "../../components/sidebar";
import MedicalDocuments from "../../pages/MedicalDocuments";
import MyDoctors from "../../pages/MyDoctors";
import ViewItemMedical from "../../pages/ViewItemMedical";
import NotFound from "../../pages/NotFound";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const Routers = () => {
  const { isAuthentication } = useSelector((state) => state.auth);

  const authElement = useCallback(
    (Component) => {
      return isAuthentication ? <Navigate to="/dashboard" /> : <Component />;
    },
    [isAuthentication]
  );

  const mainElement = useCallback(
    (Component) => {
      return isAuthentication ? <Component /> : <Navigate to="/login" />;
    },
    [isAuthentication]
  );

  return (
    <>
      <Router>
        {isAuthentication && <SideBar />}
        <Routes>
          <Route path="/login/" element={authElement(Login)} />
          <Route path="/signup/" element={authElement(Signup)} />
          <Route path="/dashboard" element={mainElement(Dashboard)} />
          <Route
            path="/medicalDocument"
            element={mainElement(MedicalDocuments)}
          />
          <Route
            path="/medicalDocument/:id"
            element={mainElement(ViewItemMedical)}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myDoctors" element={<MyDoctors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routers;
