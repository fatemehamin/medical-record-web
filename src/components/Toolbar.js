import React from "react";
import { Box, Typography } from "@mui/material";

const Toolbar = ({ title, className, sx, styleTilte, ...props }) => {
  return (
    <Box
      variant="div"
      className={className}
      display="flex"
      justifyContent="space-between"
      bgcolor="text.light"
      sx={sx}
    >
      <Typography
        variant="p"
        fontSize={16}
        fontWeight={500}
        color="text.main"
        style={styleTilte}
      >
        {title}
      </Typography>

      <Box variant="div" display="flex" gap={3}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Toolbar;
