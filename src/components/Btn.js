import { Button } from "@mui/material";
import React from "react";

const Btn = ({ title, sx, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        "&.Mui-disabled": { backgroundColor: "text.50" },
        borderRadius: 2,
        padding: 1,
        ...sx,
      }}
    >
      {props.children}
      {title}
    </Button>
  );
};

export default Btn;
