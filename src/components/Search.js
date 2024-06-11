import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../Theme";
import { FiSearch } from "react-icons/fi";

const style = {
  container: {
    display: "flex",
    alignItems: "center",
    color: "text.100",
    cursor: "pointer",
    "&:hover": { color: theme.palette.primary[700] },
  },
};

const Search = () => {
  return (
    <Box variant="p" sx={style.container} gap={1}>
      <FiSearch size={24} />
      <Typography fontSize={16} fontWeight={500}>
        Search
      </Typography>
    </Box>
  );
};

export default Search;
