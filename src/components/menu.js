import React, { useEffect, useMemo, useState } from "react";
import moment from "moment-jalaali";
import Topbar from "../components/Topbar";
import Toolbar from "../components/Toolbar";
import theme from "../Theme";
import ButtonText from "../components/ButtonText";
import NoDocPic from "../assets/no_doc_pic.png";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Backward } from "../assets/Icons/backward.svg";
import { ReactComponent as SelectIcon } from "../assets/Icons/Select.svg";
import { searchDocs } from "../features/medicalDoc/medicalDocSlice";
import { FiPlusCircle, FiSearch, FiShare2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import { ReactComponent as Selection } from "../assets/Icons/selection_view.svg";
import {
  Box,
  Checkbox,
  Collapse,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  deleteMedicalDocs,
  downloadMedicalDocs,
  fetchMedicalDocs,
} from "../features/medicalDoc/action";
import {
  ExpandLessRounded as Down,
  ExpandMoreRounded as Up,
  MoreVertRounded,
} from "@mui/icons-material";
import {
  ModalAddDoc,
  ModalDeleteDoc,
  ModalSearch,
  ModalShare,
} from "../components/FormModals";
import { TbDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const styles = {
  collapseContainer: {
    display: "flex",
    borderRadius: 2,
    border: "1px solid",
    margin: "5px 0px",
    minHeight: 42,
    padding: "5px 16px",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  collapse: {
    bgcolor: theme.palette.tritary[100],
    border: `${theme.palette.tritary.main} 1px solid`,
    m: "0px 30px",
    borderRadius: 1,
  },
  headerTable: {
    display: "flex",
    borderBottom: `${theme.palette.tritary.main} 1px solid`,
    p: 1,
  },
  dataTable: {
    borderBottom: `${theme.palette.tritary.main} 1px solid`,
    p: "1px 8px",
    display: "flex",
    alignItems: "center",
    minHeight: 42,
  },
  menu: {
    ".MuiPaper-root": {
      boxShadow: "0px 0px 10px 5px #878b9410",
      backgroundColor: "tritary.50",
      borderRadius: "12px",
      p: 1,
    },
  },
  moreIcon: { flex: 1, cursor: "pointer" },
  btn: { borderRadius: 2, width: 150 },
};

const MenuComponent = ({
  anchorEl,
  handleClose,
  id,
  openModalDelete,
  setOpenModalDelete,
}) => {
  // const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(openModalDelete);
  const handleOpenModalDelete = () => {
    console.log(handleClose);
    setOpenModalDelete((a) => !a);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  const handleOpenModalShare = () => {
    setTimeout(() => {
      setOpenModalShare(true);
    }, 300);
  };

  const handleCloseModalDelete = () => setOpenModalDelete(false);
  const handleCloseModalShare = () => setOpenModalShare(false);

  const handleDelete = () => dispatch(deleteMedicalDocs([id]));
  const handleShare = () => {};

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={styles.menu}
      >
        <MenuItem onClick={handleClose} sx={{ p: 1 }}>
          <ButtonText
            title="View"
            onClick={() => navigate(`/medicalDocument/${id}/`)}
            Icon={() => (
              <Selection
                fill={theme.palette.primary.main}
                width={24}
                className="iconBtn"
              />
            )}
          />
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ p: 1 }}>
          <ButtonText title="Download" Icon={TbDownload} />
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ p: 1 }}>
          <ButtonText
            title="Share"
            Icon={FiShare2}
            onClick={handleOpenModalShare}
          />
        </MenuItem>

        <MenuItem onClick={handleOpenModalDelete} sx={{ p: 1 }}>
          <ButtonText
            title="Delete"
            Icon={LuTrash2}
            // onClick={handleOpenModalDelete}
          />
        </MenuItem>
      </Menu>

      {/* <ModalDeleteDoc
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        count={1}
        handleDelete={handleDelete}
      />

      <ModalShare
        open={openModalShare}
        handleClose={handleCloseModalShare}
        handleShare={handleShare}
      /> */}
    </>
  );
};

export default MenuComponent;
