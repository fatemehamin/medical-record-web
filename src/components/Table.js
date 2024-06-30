// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import {
//   GridRowModes,
//   GridToolbarContainer,
//   GridActionsCellItem,
//   GridRowEditStopReasons,
// } from "@mui/x-data-grid";

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// const ViewDoc = () => {
//   const [rowModesModel, setRowModesModel] = React.useState({});

//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//   };

//   const handleDeleteClick = (id) => () => {
//     setRows(rows.filter((row) => row.id !== id));
//   };

//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row.id !== id));
//     }
//   };

//
// };

import React, { useCallback, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import Toolbar from "../components/Toolbar";
import ButtonText from "../components/ButtonText";
import { LuTrash2 } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { ReactComponent as AddNote } from "../assets/Icons/add_note.svg";
import theme from "../Theme";
import { GoZoomIn } from "react-icons/go";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as ArrowRight } from "../assets/Icons/arrow_right.svg";
import moment from "moment-jalaali";

// const columns = [
//   { field: "name", headerName: "Name", width: 180, editable: true },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 80,
//     align: "left",
//     headerAlign: "left",
//     editable: true,
//   },
//   {
//     field: "joinDate",
//     headerName: "Join date",
//     type: "date",
//     width: 180,
//     editable: true,
//   },
//   {
//     field: "role",
//     headerName: "Department",
//     width: 220,
//     editable: true,
//     type: "singleSelect",
//     valueOptions: ["Market", "Finance", "Development"],
//   },

//   // {
//   //   field: "actions",
//   //   type: "actions",
//   //   headerName: "Actions",
//   //   width: 100,
//   //   cellClassName: "actions",
//   //   getActions: ({ id }) => {
//   //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//   //     if (isInEditMode) {
//   //       return [
//   //         <GridActionsCellItem
//   //           icon={<SaveIcon />}
//   //           label="Save"
//   //           sx={{
//   //             color: "primary.main",
//   //           }}
//   //           onClick={handleSaveClick(id)}
//   //         />,
//   //         <GridActionsCellItem
//   //           icon={<CancelIcon />}
//   //           label="Cancel"
//   //           className="textPrimary"
//   //           onClick={handleCancelClick(id)}
//   //           color="inherit"
//   //         />,
//   //       ];
//   //     }

//   //     return [
//   //       <GridActionsCellItem
//   //         icon={<EditIcon />}
//   //         label="Edit"
//   //         className="textPrimary"
//   //         onClick={handleEditClick(id)}
//   //         color="inherit"
//   //       />,
//   //       <GridActionsCellItem
//   //         icon={<DeleteIcon />}
//   //         label="Delete"
//   //         onClick={handleDeleteClick(id)}
//   //         color="inherit"
//   //       />,
//   //     ];
//   //   },
//   // },
// ];

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

const transformData = (array) => {
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

const Table = ({ data }) => {
  const { headers, rows: dataRows } = transformData(data);

  const [rows, setRows] = useState(dataRows);

  const columns = getColumns(rows);

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log(newRowModesModel);
    // setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const saveData = () => {
    console.log(rows);
  };

  saveData();
  // ---------------------------all check
  return (
    <Box
      sx={{
        maxHeight: 500,
        width: "100%",
        // padding: "5px",
        "& .actions": { color: "text.secondary" },
        "& .textPrimary": { color: "text.primary" },
        // "& .MuiDataGrid-filler": {
        //   backgroundColor: "secondary.200",
        // },
        // "& .MuiDataGrid-row.Mui-selected": { backgroundColor: "secondary.50" },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        // slots={{
        //   columnHeaders: () => headers[0],
        // }}

        // rowModesModel={rowModesModel}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        // slotProps={{
        // toolbar: {
        // setRows,
        // setRowModesModel
        // },
        // }}
      />
    </Box>
  );
};

export default Table;
