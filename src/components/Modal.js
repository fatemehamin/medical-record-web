import React from "react";
import { Box, Typography, Modal } from "@mui/material";
import { FiX } from "react-icons/fi";

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 360,
    maxHeight: "100vh",
    bgcolor: "background.paper",
    boxShadow: "0px 0px 10px 5px #878B9410",
    borderRadius: 1,
    p: 3,
    color: "primary.main",
    boxSizing: "border-box",
    overflowY: "scroll",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 4,
  },
};

const BasicModal = ({ title, open, handleClose, sx, ...props }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={[styles.modal, sx]}>
          <Box variant="div" sx={styles.header}>
            <Typography variant="p" fontSize={12} fontWeight={700}>
              {title}
            </Typography>
            <FiX size={24} onClick={handleClose} />
          </Box>
          {props.children}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
