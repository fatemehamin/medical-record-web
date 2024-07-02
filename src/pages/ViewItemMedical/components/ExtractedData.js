import React, { useCallback, useState } from "react";
import Toolbar from "../../../components/Toolbar";
import ButtonText from "../../../components/ButtonText";
import Table from "../../../components/Table";
import { Box } from "@mui/material";
import { LuTrash2 } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { downloadOCR, removeOCR } from "../../../features/medicalDoc/action";
import Alert from "../../../components/Alert";

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

const ExtractedData = () => {
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { currentDoc } = useSelector((state) => state.medicalDoc);

  const dispatch = useDispatch();

  const handleOpenDelete = useCallback(() => setOpenModalDelete(true), []);
  const handleCloseDelete = useCallback(() => setOpenModalDelete(false), []);

  const handleDownloadCSV = () => dispatch(downloadOCR(currentDoc.id));

  const handleDelete = useCallback(() => {
    dispatch(removeOCR(currentDoc.id));
    setOpenModalDelete(false);
  }, [currentDoc]);

  return (
    <Box variant="div" className="page-container" sx={styles.container}>
      <Toolbar
        sx={styles.toolbar}
        styleTilte={{ fontSize: 20 }}
        title="Extracted Data"
      >
        {/* <ButtonText title="Edit table" Icon={FiEdit} onClick={s} /> */}
        <ButtonText
          title="Download as CSV"
          Icon={TbDownload}
          onClick={handleDownloadCSV}
        />
        <ButtonText title="Delete" Icon={LuTrash2} onClick={handleOpenDelete} />
      </Toolbar>

      {currentDoc.filetable.map((table, index) => (
        <Table key={index} data={table} editMode="disabled" />
      ))}

      <Alert
        open={!!openModalDelete}
        handleClose={handleCloseDelete}
        onClick={handleDelete}
        title="Do you want to delete this Table?"
      />
    </Box>
  );
};

export default ExtractedData;
