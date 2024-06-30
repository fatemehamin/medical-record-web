import React, { useCallback, useState } from "react";
import theme from "../Theme";
import ButtonText from "./ButtonText";
import { ModalDeleteDoc, ModalShare } from "./FormModals";
import { TbDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiShare2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import { ReactComponent as Selection } from "../assets/Icons/selection_view.svg";
import { Menu, MenuItem } from "@mui/material";
import {
  deleteMedicalDocs,
  shareMedicalDocs,
} from "../features/medicalDoc/action";

const styles = {
  menu: {
    ".MuiPaper-root": {
      boxShadow: "0px 0px 10px 5px #878b9410",
      backgroundColor: "tritary.50",
      borderRadius: "12px",
      p: 1,
    },
  },
};

const MenuComponent = ({ anchorEl, handleClose, id }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenModalShare = useCallback(() => setOpenModalShare(true), []);
  const handleCloseModalShare = useCallback(() => setOpenModalShare(false), []);

  const handleOpenModalDelete = useCallback(() => setOpenModalDelete(true), []);
  const handleCloseModalDelete = useCallback(
    () => setOpenModalDelete(false),
    []
  );

  const handleView = useCallback(
    () => navigate(`/medicalDocument/${id}/`),
    [id]
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteMedicalDocs([id]));
    setOpenModalDelete(false);
    handleClose();
  }, [id]);

  const handleShare = useCallback(
    (email) => {
      dispatch(shareMedicalDocs({ data: id, email }));
      setOpenModalShare(false);
      handleClose();
    },
    [id]
  );

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
        <MenuItem onClick={handleView} sx={{ p: 1 }}>
          <ButtonText
            title="View"
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

        <MenuItem onClick={handleOpenModalShare} sx={{ p: 1 }}>
          <ButtonText title="Share" Icon={FiShare2} />
        </MenuItem>

        <MenuItem onClick={handleOpenModalDelete} sx={{ p: 1 }}>
          <ButtonText title="Delete" Icon={LuTrash2} />
        </MenuItem>
      </Menu>

      <ModalShare
        open={openModalShare}
        handleClose={handleCloseModalShare}
        handleShare={handleShare}
      />

      <ModalDeleteDoc
        open={openModalDelete}
        handleClose={handleCloseModalDelete}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default MenuComponent;
