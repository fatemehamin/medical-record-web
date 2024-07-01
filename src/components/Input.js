import React, { forwardRef, useState } from "react";
import theme from "../Theme";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const styles = {
  input: (multiline) => ({
    borderColor: theme.palette.text[100],
    borderRadius: 8,
    height: multiline ? 160 : 48,
    display: "flex",
    caretColor: theme.palette.primary.main,
  }),
  placeholder: {
    "&::placeholder": {
      color: "text.100",
      fontWeight: 400,
      fontSize: 12,
    },
    "&:autofill": { padding: "10px" },
  },
  textHelper: {
    ".MuiFormHelperText-root": {
      m: "0px 5px",
      fontSize: 10,
      fontWeight: 400,
      mb: 1,
      mt: "3px",
    },
  },
};

const Input = forwardRef(
  ({ title, isPlaceholderSelect, type, multiline, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
      <>
        <Typography fontSize={12} fontWeight={400} color="text.main">
          {title}
        </Typography>
        <TextField
          {...props}
          multiline={multiline}
          ref={ref}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          variant="outlined"
          fullWidth
          InputProps={{
            style: styles.input(multiline),
            endAdornment: type === "password" && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  color="text.100"
                >
                  {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ sx: styles.placeholder }}
          sx={styles.textHelper}
          SelectProps={{
            sx: { height: 15, color: isPlaceholderSelect && "text.100" },
          }}
        >
          {props.children}
        </TextField>
      </>
    );
  }
);

export default Input;
