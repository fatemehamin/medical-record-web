import React from "react";
import { Grid } from "@mui/material";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const goToLoginUser = () => navigate("/login/user");
  const goToLoginDoctor = () => navigate("/login/doctor");

  return (
    <Grid container className="landing-container">
      <Grid item xs={8} className="landing-title">
        Welcome to biodoc
      </Grid>

      <Grid item xs={8}>
        choose language: english
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={4}>
          <Grid
            width={{ xs: 150 }}
            className="landing-box-item"
            onClick={goToLoginUser}
          >
            user's entrance
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid
            width={{ xs: 150 }}
            className="landing-box-item"
            onClick={goToLoginDoctor}
          >
            doctor's entrance
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Landing;
