import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../Theme";

const styles = {
  line: { flexGrow: 1, height: 1, backgroundColor: theme.palette.text[100] },
  text: { fontWeight: 400, fontSize: 16, p: 1, color: "text.100" },
};

const Divider_or = () => {
  return (
    <Box variant="div" display="flex" alignItems="center" m="8px 0px">
      <span style={styles.line} />
      <Typography sx={styles.text}>or</Typography>
      <span style={styles.line} />
    </Box>
  );
};

export default Divider_or;
