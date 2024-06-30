import { Button } from "@mui/material";
import React, { forwardRef } from "react";

const Btn = forwardRef(({ title, sx, ...props }, ref) => {
  return (
    <Button
      {...props}
      ref={ref}
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
});

export default Btn;
