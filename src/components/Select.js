import { Box, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as SelectIcon } from "../assets/Icons/Select.svg";
import theme from "../Theme";

const style = {
  container: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      "& .select": {
        color: theme.palette.primary[700],
        stroke: theme.palette.primary[700],
      },
    },
  },
};

const Select = ({ setIsSelect }) => {
  const handleSelect = () => setIsSelect((s) => !s);

  return (
    <Box variant="p" sx={style.container} onClick={handleSelect} gap={1}>
      <SelectIcon
        stroke={theme.palette.text[100]}
        width={24}
        className="select"
      />
      <Typography
        color="text.100"
        fontSize={16}
        fontWeight={500}
        className="select"
      >
        Select
      </Typography>
    </Box>
  );
};

export default Select;
