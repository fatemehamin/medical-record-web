import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../Theme";

const style = (typeProps, disable, color) => ({
  display: "flex",
  alignItems: "center",
  color: color ? color : disable ? "text.100" : "primary.main",
  "&:hover": !disable && {
    cursor: "pointer",
    color: theme.palette.primary[700],
    "& .iconBtn": {
      [typeProps]: theme.palette.primary[700],
    },
  },
});

const ButtonText = ({ onClick, Icon, title, typeProps, disable, color }) => {
  const initOnClick = () => (disable ? {} : onClick());

  return (
    <Box
      variant="p"
      sx={style(typeProps, disable, color)}
      gap={1}
      onClick={initOnClick}
    >
      <Icon size={24} />
      <Typography fontSize={16} fontWeight={500}>
        {title}
      </Typography>
    </Box>
  );
};

export default ButtonText;
