import React, { useCallback, useEffect } from "react";
import * as Yup from "yup";
import * as crypto from "../../utils/crypto";
import Google from "../../assets/Icons/Google.png";
import Input from "../../components/Input";
import theme from "../../Theme";
import Btn from "../../components/Btn";
import DividerOR from "../../components/DividerOR";
import ButtonText from "../../components/ButtonText";
import BackgroundAuth from "../../assets/BackgroundAuth.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/action";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as LogoIcon } from "../../assets/Icons/logo_icon.svg";

const loginSchema = Yup.object().shape({
  username: Yup.string().trim().required("username is required"),
  password: Yup.string().trim().required("password is required"),
});

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

const Login = () => {
  const { username, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username,
      password: crypto.getSecureData("auth")?.password,
    },
  });

  useEffect(
    useCallback(() => {
      !!error?.length &&
        error.forEach((key) => {
          if (key === "INVALID_USERNAME_PASSWORD") {
            setError("password", {
              message: "Username or password Invalid",
            });
          }
        });
    }, [error]),
    [error]
  );

  const onSubmit = (data) => {
    const formdata = { ...data };
    dispatch(login(formdata))
      .unwrap()
      .then(() => navigate("/dashboard/"))
      .catch((err) => console.log("err", err));
  };

  const goToSignup = () => navigate(`/signup/`);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },

    onError: () => {
      console.log("Login Failed");
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

            <Btn
              title="Login"
              variant="contained"
              disabled={!isValid}
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            />

            <Typography color="primary.main" fontSize={12} fontWeight={500}>
              Forgot password?
            </Typography>

            <DividerOR />

            <Btn
              title="Login with Google"
              variant="contained"
              fullWidth
              onClick={handleGoogleLogin}
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
              Don’t have an account?{" "}
              <ButtonText title="Sign up" onClick={goToSignup} />
            </Typography>

            <ButtonText
              title="Login as Doctor"
              sx={styles.loginDocBtn}
              onClick={() => console.log("Am I doctor?")}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
