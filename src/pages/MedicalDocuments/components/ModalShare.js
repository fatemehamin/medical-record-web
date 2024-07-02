import React, { useEffect, useState } from "react";
import Input from "../../../components/Input";
import BasicModal from "../../../components/BasicModal";
import DividerOR from "../../../components/DividerOR";
import Btn from "../../../components/Btn";
import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsAccepted } from "../../../features/doctors/action";

const styles = {
  doctors: {
    height: 140,
    overflowY: "scroll",
    borderRadius: 2,
    border: "solid 1px",
    borderColor: "text.100",
  },
  avatarDoc: { width: 32, height: 32 },
  nameDoc: { fontWeight: 400, fontSize: 12, p: 1 },
  DoctorItem: {
    cursor: "pointer",
    p: "3px",
    display: "flex",
    alignItems: "center",
  },
};

const ModalShare = ({ open, handleClose, handleShare }) => {
  const [email, setEmail] = useState("");

  const { doctorsAccepted } = useSelector((state) => state.doctors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorsAccepted());
  }, []);

  const onChangeEmail = (e) => setEmail(e.target.value);

  return (
    <BasicModal open={open} handleClose={handleClose} title="Share files">
      <Input title="Enter the E-mail:" value={email} onChange={onChangeEmail} />

      {doctorsAccepted?.length > 0 && (
        <>
          <DividerOR />

          <Typography fontSize={12} fontWeight={400} color="text.dark" pb={1}>
            choose your doctors:
          </Typography>

          <Box sx={styles.doctors} p={1}>
            {doctorsAccepted.map((v, index) => (
              <Box
                key={index}
                sx={styles.DoctorItem}
                onClick={() => setEmail(v.email)}
              >
                <Avatar style={styles.avatarDoc} src={v.avatar} alt={v.name} />
                <Typography
                  color={v.email === email ? "primary.main" : "text.100"}
                  sx={styles.nameDoc}
                >
                  {v.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
      <Btn
        variant="contained"
        type="submit"
        fullWidth
        onClick={() => handleShare(email)}
        sx={{ mt: 2 }}
      >
        Share
      </Btn>
    </BasicModal>
  );
};

export default ModalShare;
