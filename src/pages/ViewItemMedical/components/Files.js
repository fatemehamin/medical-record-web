import React, { useCallback, useState } from "react";
import Toolbar from "../../../components/Toolbar";
import Alert from "../../../components/Alert";
import ButtonText from "../../../components/ButtonText";
import Base64FileViewer from "./Base64FileViewer";
import { Box } from "@mui/material";
import { LuTrash2 } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMedicalDocs,
  downloadFileMedicalDocs,
} from "../../../features/medicalDoc/action";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    p: 2,
    bgcolor: "text.light",
  },
  toolbar: {
    borderBottom: "1px solid",
    borderBottomColor: "tritary.main",
    p: 1,
    pb: 2,
    mb: 2,
  },
};

const Files = () => {
  const { currentDoc } = useSelector((state) => state.medicalDoc);

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenDelete = useCallback(() => setOpenModalDelete(true), []);
  const handleCloseDelete = useCallback(() => setOpenModalDelete(true), []);

  const handleDownload = useCallback(
    () => dispatch(downloadFileMedicalDocs(currentDoc.id)),
    [currentDoc]
  );

  const handleDelete = useCallback(
    () => dispatch(deleteMedicalDocs([currentDoc.id])).then(() => navigate(-1)),
    [currentDoc]
  );

  return (
    <Box className="page-container" sx={styles.container} variant="div">
      <Toolbar title="Files" sx={styles.toolbar} styleTilte={{ fontSize: 20 }}>
        <ButtonText
          title="Download Files"
          Icon={TbDownload}
          onClick={handleDownload}
        />
        <ButtonText title="Delete" Icon={LuTrash2} onClick={handleOpenDelete} />
      </Toolbar>

      <Box variant="div" width={303} maxHeight={400} position="relative">
        {currentDoc && (
          <Base64FileViewer
            base64String={currentDoc.file_data}
            type={currentDoc.type}
            fileName={currentDoc.name}
          />
        )}
      </Box>

      <Alert
        title="Do you want to delete this document?"
        open={openModalDelete}
        handleClose={handleCloseDelete}
        onClick={handleDelete}
      />
    </Box>
  );
};

export default Files;
