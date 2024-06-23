import React from "react";
import * as Yup from "yup";
import * as crypto from "../../utils/crypto";
import Google from "../../assets/Icons/Google.png";
import Input from "../../components/Input";
import theme from "../../Theme";
import Btn from "../../components/Btn";
import DividerOR from "../../components/DividerOR";
import ButtonText from "../../components/ButtonText";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/action";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as BackgroundAuth } from "../../assets/background_auth.svg";
import { ReactComponent as LogoIcon } from "../../assets/Icons/logo_icon.svg";
import { ReactComponent as LogoText } from "../../assets/Icons/logo_text.svg";

const loginSchema = Yup.object().shape({
  username: Yup.string().trim().required("username is required"),
  password: Yup.string().trim().required("password is required"),
});

const styles = {
  container: {
    bgcolor: "primary.main",
    borderRadius: 3,
    width: "80%",
    height: "80%",
    display: "flex",
    p: 3,
    boxSizing: "border-box",
  },
  imgBackground: {
    position: "absolute",
    opacity: 0.05,
    width: "80%",
    left: "7%",
    height: "100%",
    fill: theme.palette.primary[50],
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    p: 3,
  },
  form: {
    boxShadow: "0px 0px 10px 5px #878B9410",
    bgcolor: "text.10",
    border: "1px solid",
    borderColor: "text.100",
    p: "24px 16px",
    m: 1,
    borderRadius: 2,
    width: 368,
    flexDirection: "column",
    display: "flex",
  },
};

const Login = () => {
  const { typeUser } = useParams();

  const { username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username,
      password: crypto.getSecureData("auth")?.password,
    },
  });

  const onSubmit = (data) => {
    const formdata = { ...data };
    dispatch(login(formdata))
      .unwrap()
      .then(() => navigate("/dashboard/"))
      .catch((err) => console.log("err", err));
  };

  const goToSignup = () => navigate(`/signup/${typeUser}`);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex={1}
      position="relative"
    >
      <BackgroundAuth style={styles.imgBackground} />
      <Box variant="div" sx={styles.container}>
        <Box component="div" sx={styles.logo}>
          <LogoIcon stroke={theme.palette.text[10]} width={77} />
          <LogoText fill={theme.palette.text[10]} style={{ padding: 5 }} />

          <Typography
            fontFamily="Sansita Swashed"
            fontSize={48}
            fontWeight={400}
            textAlign="center"
            color="text.10"
            mt={4}
          >
            Welcome to a healthier you powered by <br /> BioDoc
          </Typography>
        </Box>

        <Box
          variant="div"
          flex={1}
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
              onClick={() => loginWithGoogle()}
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
              sx={{ display: "flex", justifyContent: "center", mt: 4 }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
