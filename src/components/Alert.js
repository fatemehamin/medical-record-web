import React from "react";
import BasicModal from "./BasicModal";
import Btn from "./Btn";
import { Box, Typography } from "@mui/material";

const styles = {
  btn: { width: 150 },
  bodyModalDeleteDoc: {
    color: "text.main",
    textAlign: "center",
    fontSize: 12,
    fontWeight: 400,
  },
};

const Alert = ({ open, handleClose, title, onClick }) => {
  return (
    <BasicModal title="Delete files" open={open} handleClose={handleClose}>
      <Typography sx={styles.bodyModalDeleteDoc}>{title}</Typography>

      <Box display="flex" justifyContent="space-around" gap={2} mt={6}>
        <Btn
          variant="contained"
          sx={styles.btn}
          onClick={onClick}
          title="Delete"
        />

        <Btn
          variant="outlined"
          sx={styles.btn}
          onClick={handleClose}
          title="Cancel"
        />
      </Box>
    </BasicModal>
  );
};

export default Alert;
