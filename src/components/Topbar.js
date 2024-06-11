import React from "react";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { FiBell } from "react-icons/fi";
import { ReactComponent as Smartwatch } from "../assets/Icons/Smartwatch.svg";
import { useSelector } from "react-redux";

const Topbar = ({ title }) => {
  const { username, profile } = useSelector((state) => state.auth);

  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Typography color="text.main" fontSize={32} fontWeight={700}>
        {title}
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <Smartwatch
          fill={theme.palette.primary.main}
          width={32}
          cursor="pointer"
        />

        <FiBell color={theme.palette.primary.main} size={24} cursor="pointer" />

        <Avatar
          alt={username}
          src={profile}
          sx={{ width: 64, height: 64, cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default Topbar;
