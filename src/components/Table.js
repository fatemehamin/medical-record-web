import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const style = {
  height: "60vh",
  width: "100%",
  "& .actions": { color: "text.secondary" },
  "& .textPrimary": { color: "text.primary" },
  "& .MuiDataGrid-footerContainer": { display: "none" },
};

const getColumns = (rows) => {
  const sampleRow = rows[0];
  return Object.keys(sampleRow)
    .filter((key) => key !== "id")
    .map((key) => ({
      field: key,
      headerName: key.startsWith("_") && /^\d+$/.test(key.slice(1)) ? "" : key,
      align: "left",
      headerAlign: "left",
      editable: true,
      headerClassName: "MuiDataGrid-filler",
    }));
};

const transformDataToObject = (array) => {
  const [headers, ...dataRows] = array;

  const rows = dataRows.map((row, index) => {
    const obj = { id: index };

    headers.forEach((header, i) => {
      obj[header || `_${i}`] = row[i];
    });

    return obj;
  });

  return { headers, rows };
};

const transformDataToArray = (data) => {
  const headers = Object.keys(data[0]).filter((key) => key !== "id");

  const dataRows = data.map((row) => {
    return headers.map((header) => row[header]);
  });

  return [headers, ...dataRows];
};

const Table = ({ data, onTableEdit, index, ...props }) => {
  const { headers, rows: dataRows } = transformDataToObject(data);

  const [rows, setRows] = useState(dataRows);

  const columns = getColumns(rows);

  const processRowUpdate = useCallback(
    (newRow) => {
      const updatedRow = { ...newRow };

      const newTable = rows.map((row) =>
        row.id === newRow.id ? updatedRow : row
      );

      setRows(newTable);
      onTableEdit(transformDataToArray(newTable), index);

      return updatedRow;
    },
    [onTableEdit]
  );

  return (
    <Box sx={style}>
      <DataGrid
        {...props}
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default Table;
