import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../Theme";

const style = (typeProps, disable, color) => ({
  display: "flex",
  alignItems: "center",
  color: color ? color : disable ? "text.100" : "primary.main",
  background: "none",
  border: "none",
  padding: 0,
  font: "inherit",
  cursor: disable ? "default" : "pointer",
  "&:hover": !disable && {
    color: theme.palette.primary[700],
    "& .iconBtn": { [typeProps]: theme.palette.primary[700] },
  },
});

const ButtonText = ({
  Icon,
  title,
  typeProps,
  disable,
  sx,
  color = "primary.main",
  onClick = () => {},
}) => {
  return (
    <Box
      gap={1}
      component="button"
      sx={{ ...style(typeProps, disable, color), ...sx }}
      onClick={onClick}
      disabled={disable}
    >
      {Icon && <Icon size={24} />}
      <Typography fontSize={16} fontWeight={500} component="span">
        {title}
      </Typography>
    </Box>
  );
};

export default ButtonText;
