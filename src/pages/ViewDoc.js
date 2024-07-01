import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Toolbar from "../components/Toolbar";
import ButtonText from "../components/ButtonText";
import theme from "../Theme";
import Topbar from "../components/Topbar";
import moment from "moment-jalaali";
import Table from "../components/Table";
import HighLights from "../components/HighLights";
import { LuTrash2 } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";
import { FiEdit, FiShare2 } from "react-icons/fi";
import { ReactComponent as AddNote } from "../assets/Icons/add_note.svg";
import { GoZoomIn } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ArrowRight } from "../assets/Icons/arrow_right.svg";
import {
  deleteMedicalDocs,
  downloadFileMedicalDocs,
  fetchItemMedicalDoc,
  shareMedicalDocs,
} from "../features/medicalDoc/action";
import {
  ModalDelete,
  ModalEditDoc,
  ModalShare,
} from "../components/FormModals";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
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

const ViewDoc = () => {
  const id = JSON.parse(useParams().id);

  const { currentDoc } = useSelector((state) => state.medicalDoc);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEditDoc, setOpenModalEditDoc] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);
  const [openModalAddHighlight, setOpenModalAddHighlight] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItemMedicalDoc(id));
  }, []);

  const handleDownloadFile = useCallback(
    () => dispatch(downloadFileMedicalDocs(id)),
    [id]
  );

  const handleCloseEditDoc = useCallback(() => setOpenModalEditDoc(false), []);
  const handleOpenEditDoc = useCallback(() => setOpenModalEditDoc(true), []);

  const handleCloseModalShare = useCallback(() => setOpenModalShare(false), []);
  const handleOpenModalShare = useCallback(() => setOpenModalShare(true), []);

  const handleOpenAddHighlight = useCallback(
    () => setOpenModalAddHighlight(true),
    []
  );

  const handleOpenModalDelete = useCallback(() => setOpenModalDelete(true), []);
  const handleCloseModalDelete = useCallback(
    () => setOpenModalDelete(false),
    []
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteMedicalDocs([id])).then(() => navigate(-1));
    setOpenModalDelete(false);
  }, [id]);

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

      <Box className="page-container" sx={styles.container} variant="div">
        <Toolbar
          title="Files"
          sx={styles.toolbar}
          styleTilte={{ fontSize: 20 }}
        >
          <ButtonText
            title="Download Files"
            Icon={TbDownload}
            onClick={handleDownloadFile}
          />
          <ButtonText
            title="Delete"
            Icon={LuTrash2}
            onClick={handleOpenModalDelete}
          />
        </Toolbar>

        <Box variant="div" width={303} maxHeight={400} position="relative">
          <img
            src={`data:image/${currentDoc?.type};base64,${currentDoc?.file_data}`}
            width={303}
          />
          <Box
            variant="div"
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#E6E6E770",
              position: "absolute",
              top: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#E6E6E790" },
            }}
          >
            <GoZoomIn color={theme.palette.primary.main} size={48} />
          </Box>
        </Box>
      </Box>

      {currentDoc?.filetable.length > 0 && (
        <Box variant="div" className="page-container" sx={styles.container}>
          <Toolbar
            sx={styles.toolbar}
            styleTilte={{ fontSize: 20 }}
            title="Extracted Data"
          >
            <ButtonText title="Edit table" Icon={FiEdit} />
            <ButtonText title="Download as CSV" Icon={TbDownload} />
            <ButtonText title="Delete" Icon={LuTrash2} />
          </Toolbar>

          {currentDoc.filetable.map((table, index) => (
            <Table key={index} data={table} editMode="disabled" />
          ))}
        </Box>
      )}
      <Box variant="div" sx={styles.container} className="page-container">
        <Toolbar
          sx={styles.toolbar}
          styleTilte={{ fontSize: 20 }}
          title="Highlights"
        >
          <ButtonText
            typeProps="stroke"
            onClick={handleOpenAddHighlight}
            Icon={() => (
              <AddNote
                stroke={theme.palette.text[100]}
                width={28}
                className="iconBtn"
              />
            )}
          />
        </Toolbar>

        <HighLights
          setOpenModalAddHighlight={setOpenModalAddHighlight}
          openModalAddHighlight={openModalAddHighlight}
        />
      </Box>

      <ModalDelete
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        handleDelete={handleDelete}
        title="Do you want to delete this document?"
      />

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
