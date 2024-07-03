import React, { useCallback, useState } from "react";
import BasicModal from "../../../components/BasicModal";
import Table from "../../../components/Table";
import Btn from "../../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { editOCR, removeOCR } from "../../../features/medicalDoc/action";

const ModalEditTable = ({ open, handleClose }) => {
  const [newTables, setNewTables] = useState(null);

  const { currentDoc } = useSelector((state) => state.medicalDoc);

  const dispatch = useDispatch();

  const handleTableEdit = useCallback(
    (newTable, index) => {
      const newTables = currentDoc?.filetable.map((table, i) =>
        i == index ? newTable : table
      );
      setNewTables(newTables);
    },
    [currentDoc]
  );

  const handleSaveTables = useCallback(() => {
    dispatch(editOCR({ id: currentDoc.id, newTables }));
    handleClose();
  }, [currentDoc, newTables]);

  const handleRemoveTables = useCallback(() => {
    dispatch(removeOCR(currentDoc.id));
    handleClose();
  }, [currentDoc]);

  return (
    <BasicModal
      handleClose={handleClose}
      title="Extracted Data"
      sx={{ width: "auto" }}
      open={open}
    >
      <Typography fontSize={14} fontWeight={400} color="text.main" pb={1}>
        Edit the table data as necessary.
      </Typography>
      {currentDoc?.filetable?.map((table, index) => (
        <Table
          key={index}
          data={table}
          editMode="row"
          index={index}
          onTableEdit={handleTableEdit}
        />
      ))}
      <Box display="flex" flexDirection="row-reverse" gap={2} mt={3}>
        <Btn
          variant="contained"
          sx={{ width: 180 }}
          title="Save"
          disabled={newTables == null}
          onClick={handleSaveTables}
        />
        <Btn
          variant="contained"
          sx={{ width: 180 }}
          title="Remove extract data"
          onClick={handleRemoveTables}
        />
      </Box>
    </BasicModal>
  );
};

export default ModalEditTable;
