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

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
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
import { FiEdit, FiShare2 } from "react-icons/fi";
import { ReactComponent as AddNote } from "../assets/Icons/add_note.svg";
import theme from "../Theme";
import { GoZoomIn } from "react-icons/go";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ArrowRight } from "../assets/Icons/arrow_right.svg";
import moment from "moment-jalaali";
import Table from "../components/Table";
import {
  deleteMedicalDocs,
  downloadMedicalDocs,
  fetchItemMedicalDoc,
} from "../features/medicalDoc/action";
import { ModalDeleteDoc, ModalEditDoc } from "../components/FormModals";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

const columns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 80,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  {
    field: "joinDate",
    headerName: "Join date",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "role",
    headerName: "Department",
    width: 220,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Market", "Finance", "Development"],
  },
  // {
  //   field: "actions",
  //   type: "actions",
  //   headerName: "Actions",
  //   width: 100,
  //   cellClassName: "actions",
  //   getActions: ({ id }) => {
  //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  //     if (isInEditMode) {
  //       return [
  //         <GridActionsCellItem
  //           icon={<SaveIcon />}
  //           label="Save"
  //           sx={{
  //             color: "primary.main",
  //           }}
  //           onClick={handleSaveClick(id)}
  //         />,
  //         <GridActionsCellItem
  //           icon={<CancelIcon />}
  //           label="Cancel"
  //           className="textPrimary"
  //           onClick={handleCancelClick(id)}
  //           color="inherit"
  //         />,
  //       ];
  //     }

  //     return [
  //       <GridActionsCellItem
  //         icon={<EditIcon />}
  //         label="Edit"
  //         className="textPrimary"
  //         onClick={handleEditClick(id)}
  //         color="inherit"
  //       />,
  //       <GridActionsCellItem
  //         icon={<DeleteIcon />}
  //         label="Delete"
  //         onClick={handleDeleteClick(id)}
  //         color="inherit"
  //       />,
  //     ];
  //   },
  // },
];

const ViewDoc = () => {
  const id = JSON.parse(useParams().id);

  const { tables, currentDoc } = useSelector((state) => state.medicalDoc);

  const [rows, setRows] = useState(initialRows);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEditDoc, setOpenModalEditDoc] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemMedicalDoc(id));
  }, []);

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log(newRowModesModel);
    // setRowModesModel(newRowModesModel);
  };

  const handleCloseEditDoc = () => setOpenModalEditDoc(false);
  const handleOpenEditDoc = () => setOpenModalEditDoc(true);

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleDelete = () => dispatch(deleteMedicalDocs([id]));
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const handleOpenModalDelete = () => setOpenModalDelete(true);

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
              {currentDoc?.name.split("/")[0]}
            </Typography>
            <Typography fontSize={16} fontWeight={400}>
              ({moment(currentDoc?.date).format("DD MMM YYYY")})
            </Typography>
          </Box>
        }
      >
        <ButtonText title="Edit" Icon={FiEdit} onClick={handleOpenEditDoc} />
        <ButtonText title="Share" Icon={FiShare2} />
      </Toolbar>

      <Box
        variant="div"
        display="flex"
        flexDirection="column"
        flex={1}
        p={3}
        className="page-container"
        bgcolor="text.light"
      >
        <Toolbar
          title="Files"
          sx={{
            borderBottom: "1px solid",
            borderBottomColor: "tritary.main",
            p: 1,
            pb: 2,
            mb: 2,
          }}
          styleTilte={{ fontSize: 20 }}
        >
          <ButtonText
            title="Download Files"
            Icon={TbDownload}
            onClick={() => {
              dispatch(downloadMedicalDocs(id));
            }}
          />
          <ButtonText title="Delete" Icon={LuTrash2} />
        </Toolbar>

        <Box variant="div" width={303} maxHeight={400} position="relative">
          <img src={currentDoc?.file_data} width={303} />
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

      {tables.length > 0 && (
        <Box
          variant="div"
          display="flex"
          flexDirection="column"
          flex={1}
          p={3}
          className="page-container"
          bgcolor="text.light"
        >
          <Toolbar
            sx={{
              borderBottom: "1px solid",
              borderBottomColor: "tritary.main",
              p: 1,
              pb: 2,
              mb: 2,
            }}
            styleTilte={{ fontSize: 20 }}
            title="Extracted Data"
          >
            <ButtonText title="Edit table" Icon={FiEdit} />
            <ButtonText title="Download as CSV" Icon={TbDownload} />
            <ButtonText title="Delete" Icon={LuTrash2} />
          </Toolbar>

          {tables.map((table, index) => (
            <Table key={index} data={table} />
          ))}
        </Box>
      )}
      <Box
        variant="div"
        display="flex"
        flexDirection="column"
        flex={1}
        p={3}
        className="page-container"
        bgcolor="text.light"
      >
        <Toolbar
          sx={{
            borderBottom: "1px solid",
            borderBottomColor: "tritary.main",
            p: 1,
            pb: 2,
            mb: 2,
          }}
          styleTilte={{ fontSize: 20 }}
          title="Highlights"
        >
          <ButtonText
            Icon={() => (
              <AddNote
                stroke={theme.palette.text[100]}
                width={28}
                className="iconBtn"
              />
            )}
          />
        </Toolbar>
        {!currentDoc?.highlights.length > 0 ? (
          <>
            <Box
              variant="div"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box variant="div" display="flex" alignItems="center" gap={1}>
                <Avatar src="" alt="" />
                <Typography fontSize={14} fontWeight={500} color="text.main">
                  name
                </Typography>
              </Box>

              <Box variant="div" display="flex" alignItems="center" gap={1}>
                <Typography fontSize={12} fontWeight={400} color="text.main">
                  date
                </Typography>
                <LuTrash2 color={theme.palette.text[100]} size={20} />
              </Box>
            </Box>
            <Typography fontSize={14} fontWeight={400} color="text.dark">
              list highlights
            </Typography>
          </>
        ) : (
          <Typography
            color="text.200"
            fontWeight={400}
            fontSize={16}
            textAlign="center"
            p={2}
          >
            No highlights to show... yet!
          </Typography>
        )}
      </Box>
      <ModalDeleteDoc
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        handleDelete={handleDelete}
      />
      <ModalEditDoc open={openModalEditDoc} handleClose={handleCloseEditDoc} />

      {/* <ModalShare
        open={openModalShare}
        handleClose={handleCloseShare}
        handleShare={handleShare}
      /> */}
    </Box>
  );
};

export default ViewDoc;
