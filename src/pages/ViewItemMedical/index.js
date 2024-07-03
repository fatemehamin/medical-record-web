import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Toolbar from "../../components/Toolbar";
import ButtonText from "../../components/ButtonText";
import theme from "../../Theme";
import Topbar from "../../components/Topbar";
import moment from "moment-jalaali";
import HighLights from "./components/HighLights";
import ExtractedData from "./components/ExtractedData";
import Files from "./components/Files";
import ModalEditDoc from "./components/ModalEditDoc";
import { FiEdit, FiShare2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ArrowRight } from "../../assets/Icons/arrow_right.svg";
import ModalShare from "../MedicalDocuments/components/ModalShare";
import {
  fetchItemMedicalDoc,
  shareMedicalDocs,
} from "../../features/medicalDoc/action";

const ViewDoc = () => {
  const id = JSON.parse(useParams().id);

  const { currentDoc } = useSelector((state) => state.medicalDoc);

  const [openModalEditDoc, setOpenModalEditDoc] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemMedicalDoc(id));
  }, [id]);

  const handleCloseEditDoc = useCallback(() => setOpenModalEditDoc(false), []);
  const handleOpenEditDoc = useCallback(() => setOpenModalEditDoc(true), []);

  const handleCloseModalShare = useCallback(() => setOpenModalShare(false), []);
  const handleOpenModalShare = useCallback(() => setOpenModalShare(true), []);

  const handleShare = useCallback(
    (email) => {
      dispatch(shareMedicalDocs({ data: id, email }));
      setOpenModalShare(false);
    },
    [id]
  );

  return (
    <Box variant="div" display="flex" flexDirection="column" flex={1} p={3}>
      <Topbar title="Medical Documents" />

      <Toolbar
        sx={{ bgcolor: "transparent", p: 1 }}
        title={
          <Box variant="div" display="flex" gap={1} alignItems="center">
            <Typography fontSize={24} fontWeight={400}>
              Lab test results
            </Typography>
            <ArrowRight width={24} stroke={theme.palette.text.main} />
            <Typography fontSize={24} fontWeight={400}>
              {currentDoc?.name}
            </Typography>
            <Typography fontSize={16} fontWeight={400}>
              ({moment(currentDoc?.date).format("DD MMM YYYY")})
            </Typography>
          </Box>
        }
      >
        <ButtonText title="Edit" Icon={FiEdit} onClick={handleOpenEditDoc} />
        <ButtonText
          title="Share"
          Icon={FiShare2}
          onClick={handleOpenModalShare}
        />
      </Toolbar>

      <Files />

      {currentDoc?.filetable?.length > 0 && <ExtractedData />}

      {currentDoc && <HighLights />}

      {openModalEditDoc && (
        <ModalEditDoc
          open={openModalEditDoc}
          handleClose={handleCloseEditDoc}
        />
      )}

      <ModalShare
        open={openModalShare}
        handleClose={handleCloseModalShare}
        handleShare={handleShare}
      />
    </Box>
  );
};

export default ViewDoc;
