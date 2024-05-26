import React from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/action";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const loginSchema = Yup.object().shape({
  username: Yup.string().trim().required("username is required"),
  password: Yup.string().trim().required("password is required"),
});

const Login = () => {
  const { typeUser } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => dispatch(login(data));

  const goToSignup = () => navigate(`/signup/${typeUser}`);

  const loginWithGoogle = () => {
    console.log("login google");
  };

  return (
    <div style={{ margin: 20 }}>
      <h2>Welcome back</h2>
      <h2>Enter your username and password to sign in</h2>
      <Button onClick={loginWithGoogle}>login with google</Button>
      <p>or</p>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        flexDirection="column"
        display="flex"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="username"
              margin="normal"
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          )}
        />

        <Button type="submit" variant="contained">
          login
        </Button>
      </Box>

      <Typography>
        don't have an account? <Button onClick={goToSignup}>SIGN UP</Button>
      </Typography>
    </div>
  );
};

export default Login;
