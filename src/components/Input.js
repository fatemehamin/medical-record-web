import { TextField, Typography } from "@mui/material";
import React from "react";
import theme from "../Theme";

const styles = {
  input: {
    borderColor: theme.palette.text[100],
    borderRadius: 8,
    height: 42,
    display: "flex",
    caretColor: theme.palette.primary.main,
  },
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

const Input = ({ title, isPlaceholderSelect, ...props }) => {
  return (
    <>
      <Typography fontSize={12} fontWeight={400} color="text.main">
        {title}
      </Typography>
      <TextField
        {...props}
        variant="outlined"
        fullWidth
        InputProps={{ style: styles.input }}
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
};

export default Input;
