import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../../features/auth/action";
import { Controller, useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as LogoIcon } from "../../assets/Icons/logo_icon.svg";
import Google from "../../assets/Icons/Google.png";
import Input from "../../components/Input";
import theme from "../../Theme";
import Btn from "../../components/Btn";
import DividerOR from "../../components/DividerOR";
import ButtonText from "../../components/ButtonText";
import BackgroundAuth from "../../assets/BackgroundAuth.svg";

const styles = {
  container: {
    bgcolor: "primary.main",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 3,
    width: "80%",
    minHeight: { md: "90%", xs: "auto" },
    p: 3,
    boxSizing: "border-box",
    backgroundImage: `url(${BackgroundAuth})`,
    position: "relative",
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 3,
    zIndex: 2,
  },
  form: {
    boxShadow: "0px 0px 10px 5px #878B9410",
    bgcolor: "text.10",
    border: "1px solid",
    borderColor: "text.100",
    p: "24px 16px",
    m: 1,
    borderRadius: 2,
    width: { lg: 368, md: 300, xs: "80%" },
    flexDirection: "column",
    display: "flex",
    zIndex: 2,
  },
  loginDocBtn: { display: "flex", justifyContent: "center", mt: 4 },
  textLogo: {
    fontFamily: "Sansita Swashed",
    fontWeight: 400,
    textAlign: "center",
    color: "text.10",
  },
};

const signupSchema = Yup.object().shape({
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
  const { error } = useSelector((state) => state.auth);

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: { username: "", password: "", email: "", rePassword: "" },
  });

  const watchAllFields = watch();

  useEffect(() => {
    setAllFieldsFilled(checkAllFieldsFilled(watchAllFields));
  }, [watchAllFields]);

  const checkAllFieldsFilled = (data) => {
    return Object.values(data).every((value) => value.trim() !== "");
  };

  useEffect(() => {
    handleErrorServer();
  }, [error]);

  const handleErrorServer = useCallback(() => {
    !!error?.length &&
      error.forEach((key) => {
        switch (key) {
          case "USERNAME_ALREADY_EXISTS": {
            return setError("username", { message: "Username already exists" });
          }

          case "INVALID_EMAIL": {
            return setError("email", { message: "Invalid email" });
          }

          case "EMAIL_ALREADY_EXISTS": {
            return setError("email", { message: "Email already exists" });
          }

          case "PASSWORD_TOO_SIMILAR_TO_USERNAME": {
            return setError("password", {
              message: "Password too similar to username",
            });
          }

          case "PASSWORD_TOO_SIMILAR_TO_EMAIL": {
            return setError("password", {
              message: "Password too similar to email",
            });
          }

          case "PASSWORD_TOO_SHORT": {
            return setError("password", { message: "Password too short" });
          }

          case "PASSWORD_TOO_COMMON": {
            return setError("password", { message: "Password too common" });
          }

          case "PASSWORD_NUMERIC": {
            return setError("password", { message: "PASSWORD_NUMERIC" });
          }

          case "PASSWORD_MISMATCH": {
            return setError("rePassword", { message: "Passwords must match" });
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
      .then((res) => navigate(`/login/`))
      .catch((err) => console.log(err));
  };

  const goToLogin = () => navigate("/login");

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log(credentialResponse);
      // Handle the response from Google
      try {
        const { credential } = credentialResponse;
        // Dispatch the signup action with the Google credential
        // await dispatch(signup({ credential }));
        // Navigate to the dashboard or another page after successful signup
        // navigate('/dashboard');
      } catch (error) {
        console.error("Signup failed", error);
      }
    },
    onError: () => {
      console.log("Signup Failed");
    },
  });

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid container sx={styles.container}>
        <Grid item md={6} xs={12} sx={styles.logo}>
          <LogoIcon stroke={theme.palette.text[10]} width={121} height={104} />
          <Typography sx={styles.textLogo} fontSize={40}>
            BioDoc
          </Typography>

          <Typography sx={styles.textLogo} fontSize={48} mt={4}>
            Welcome to a healthier you powered by <br /> BioDoc
          </Typography>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            gap={1}
            sx={styles.form}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  title="Username:"
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ""}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  title="Email:"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  title="Password:"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              )}
            />

            <Controller
              name="rePassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  title="Password Confirmation:"
                  error={!!errors.rePassword}
                  helperText={
                    errors.rePassword ? errors.rePassword.message : ""
                  }
                />
              )}
            />

            <Btn
              title="Sign Up"
              variant="contained"
              disabled={!allFieldsFilled}
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            />

            <DividerOR />

            <Btn
              title="Sign up with Google"
              variant="contained"
              fullWidth
              onClick={handleGoogleSignup}
            >
              <img
                src={Google}
                width={24}
                style={{ paddingRight: 3 }}
                alt="Google logo"
              />
            </Btn>

            <Typography
              fontSize={12}
              fontWeight={400}
              color="text.100"
              display="flex"
              alignItems="center"
              gap={1}
            >
              Already have an account?{" "}
              <ButtonText title="Login" onClick={goToLogin} />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
