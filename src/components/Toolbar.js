import React from "react";
import { Box, Typography } from "@mui/material";

const Toolbar = ({ title, ...props }) => {
  return (
    <Box
      variant="div"
      className="page-container"
      display="flex"
      justifyContent="space-between"
      bgcolor="text.light"
    >
      <Typography variant="p" fontSize={16} fontWeight={500} color="text.main">
        {title}
      </Typography>

      <Box variant="div" display="flex" gap={3}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Toolbar;
