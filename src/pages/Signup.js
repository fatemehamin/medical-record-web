import React, { useCallback, useEffect } from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { signup } from "../features/auth/action";

const loginSchema = Yup.object().shape({
  username: Yup.string().trim().required("Username is a required field"),
  email: Yup.string().trim().email().required(),
  password: Yup.string()
    .trim()
    .min(8, "Your password must contain at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])[A-Za-z\d#@$!%*?&_-]/,
      "Your password must contain at least one letter."
    )
    .required(),
  rePassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Signup = () => {
  const { typeUser } = useParams();

  const { error } = useSelector((state) => state.auth);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "", email: "", rePassword: "" },
  });

  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    handleErrorServer();
  }, [error]);

  const handleErrorServer = useCallback(() => {
    error?.forEach((key) => {
      switch (key) {
        case "USERNAME_ALREADY_EXISTS": {
          return setError("username", { message: "USERNAME_ALREADY_EXISTS" });
        }

        case "INVALID_EMAIL": {
          return setError("email", { message: "INVALID_EMAIL" });
        }

        case "EMAIL_ALREADY_EXISTS": {
          return setError("email", { message: "EMAIL_ALREADY_EXISTS" });
        }

        case "PASSWORD_TOO_SIMILAR_TO_USERNAME": {
          return setError("password", {
            message: "PASSWORD_TOO_SIMILAR_TO_USERNAME",
          });
        }

        case "PASSWORD_TOO_SHORT": {
          return setError("password", { message: "PASSWORD_TOO_SHORT" });
        }

        default:
          return null;
      }
    });
  }, [error]);

  const onSubmit = (data) => {
    const formData = { ...data };

    dispatch(signup(formData))
      .unwrap()
      .then((res) => navigator(`/login/${typeUser}/`));
    // .catch((err) => console.log("err", err));
  };

  const signupWithGoogle = () => {
    console.log("signup google");
  };

  return (
    <div style={{ margin: 20 }}>
      <Button onClick={signupWithGoogle}>signup with google</Button>

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
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
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

        <Controller
          name="rePassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="password confirmation"
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
          )}
        />

        <Button type="submit" variant="contained">
          signup
        </Button>
      </Box>
    </div>
  );
};

export default Signup;
