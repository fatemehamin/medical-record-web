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
import MenuComponent from "../components/menu";
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

const CollapesItem = ({ tag, docs, setSelectList, selectList, isSelect }) => {
  const [collapsed, setCollasped] = useState(false);
  const [unSelectItemGroup, setUnSelectItemGroup] = useState(docs);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDocId, setCurrentDocId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isSelect) {
      setUnSelectItemGroup(docs);
    }
  }, [isSelect]);

  const handleClick = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurrentDocId(id);
  };

  const handleClose = () => setAnchorEl(null);

  const handleMultiSelected = (event) => {
    const { checked } = event.target;

    const newListDoc = checked
      ? [...selectList, ...unSelectItemGroup]
      : selectList.filter((doc) => doc.tag !== tag);

    setUnSelectItemGroup(checked ? [] : docs);

    setSelectList(newListDoc);
  };

  const handleSelected = (event) => {
    const { checked } = event.target;
    const id = JSON.parse(event.target.id);

    const newListDoc = checked
      ? [...selectList, docs.find((doc) => doc.id === id)]
      : selectList.filter((doc) => doc.id !== id);

    const newUnSelect = checked
      ? unSelectItemGroup.filter((doc) => doc.id !== id)
      : [...unSelectItemGroup, docs.find((doc) => doc.id === id)];

    setUnSelectItemGroup(newUnSelect);

    setSelectList(newListDoc);
  };

  const toggleCollapse = () => setCollasped((c) => !c);

  const toggleCheckbox = isSelect
    ? { opacity: 1 }
    : { opacity: 0, position: "absolute" };

  return (
    <>
      <Box
        variant="div"
        className="collapse-container"
        sx={styles.collapseContainer}
        borderColor="primary.main"
        onClick={toggleCollapse}
      >
        <Box variant="div" display="flex" alignItems="center">
          <Checkbox
            disabled={!isSelect}
            sx={toggleCheckbox}
            color="primary"
            onClick={(event) => event.stopPropagation()}
            checked={!unSelectItemGroup.length}
            onChange={handleMultiSelected}
          />

          <Typography fontWeight={500} fontSize={20} color="text.main">
            {tag}
          </Typography>
        </Box>

        {collapsed ? <Down color="text.main" /> : <Up color="text.main" />}
      </Box>

      <Collapse in={collapsed} sx={styles.collapse}>
        <Box variant="div" sx={styles.headerTable}>
          <Typography color="text.main" fontWeight={500} fontSize={16} flex={3}>
            File Name
          </Typography>

          <Typography color="text.main" fontWeight={500} fontSize={16} flex={3}>
            Modified Date
          </Typography>

          <Typography
            color="text.main"
            fontWeight={500}
            fontSize={16}
            flex={1}
            textAlign="center"
          >
            Action
          </Typography>
        </Box>

        {docs.map((doc, index) => (
          <Box
            key={index}
            variant="div"
            sx={styles.dataTable}
            onClick={() => navigate(`/medicalDocument/${doc.id}`)}
          >
            <Typography
              color="text.main"
              fontWeight={400}
              fontSize={16}
              flex={3}
            >
              <Checkbox
                disabled={!isSelect}
                color="primary"
                onClick={(event) => event.stopPropagation()}
                sx={toggleCheckbox}
                id={JSON.stringify(doc.id)}
                checked={!unSelectItemGroup.find((d) => d.id == doc.id)}
                onChange={handleSelected}
              />
              {doc.test_name}
            </Typography>

            <Typography
              color="text.main"
              fontWeight={400}
              fontSize={16}
              flex={3}
            >
              {moment(doc.result_date).format("DD MMM YYYY")}
            </Typography>

            <MoreVertRounded
              sx={styles.moreIcon}
              onClick={(e) => handleClick(e, doc.id)}
            />
          </Box>
        ))}
        {!!anchorEl && (
          <MenuComponent
            anchorEl={anchorEl}
            handleClose={handleClose}
            id={currentDocId}
          />
        )}
      </Collapse>
    </>
  );
};

const NoDocsComponent = ({ handleOpenAddDoc }) => (
  <Box
    variant="div"
    className="page-container"
    flex={1}
    bgcolor="text.light"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <img src={NoDocPic} width={265} />
    <Typography fontSize={20} fontWeight={400} p={2} color="text.main">
      No documents have been added yet
    </Typography>
    <ButtonText
      Icon={FiPlusCircle}
      onClick={handleOpenAddDoc}
      title="Add New Document"
      color="primary.main"
    />
  </Box>
);

const MedicalDocuments = () => {
  const [isSelect, setIsSelect] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [openModalAddDoc, setOpenModalAddDoc] = useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [openModalDeleteDoc, setOpenModalDeleteDoc] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);

  const { docs, tags, AllTags } = useSelector((state) => state.medicalDoc);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMedicalDocs());
  }, []);

  const handleOpenAddDoc = () => setOpenModalAddDoc(true);
  const handleCloseAddDoc = () => setOpenModalAddDoc(false);

  const handleOpenSearch = () => setOpenModalSearch(true);
  const handleCloseSearch = () => setOpenModalSearch(false);

  const handleOpenDelete = () => setOpenModalDeleteDoc(true);
  const handleCloseDelete = () => setOpenModalDeleteDoc(false);

  const handleOpenShare = () => setOpenModalShare(true);
  const handleCloseShare = () => setOpenModalShare(false);

  const groupDocs = useMemo(
    () =>
      tags?.map((tag) => ({
        tag: AllTags.find((t) => t.key === tag)?.value,
        docs: docs?.filter((doc) => doc.tag === tag),
      })),
    [tags, docs]
  );

  const handleSearch = (data) => {
    dispatch(searchDocs(data));
    handleCloseSearch();
  };

  const handleSelect = () => setIsSelect((s) => !s);

  const handleCancelSelect = () => {
    setIsSelect(false);
    setSelectList([]);
  };

  const handleDelete = () => {
    const arg = selectList.map((doc) => doc.id);
    dispatch(deleteMedicalDocs(arg));
    handleCloseDelete();
    handleCancelSelect();
  };

  const handleShare = () => {
    handleCloseShare();
    handleCancelSelect();
  };

  return (
    <Box variant="div" display="flex" flexDirection="column" flex={1} p={3}>
      <Topbar title="Medical Documents" />

      {docs.length ? (
        <>
          <Toolbar
            className="page-container"
            title={`${docs.length} Documents Total`}
          >
            {isSelect ? (
              <>
                <ButtonText
                  title="Share"
                  Icon={FiShare2}
                  onClick={handleOpenShare}
                  disable={!selectList.length}
                />

                <ButtonText
                  title="Delete"
                  Icon={LuTrash2}
                  onClick={handleOpenDelete}
                  disable={!selectList.length}
                />

                <ButtonText
                  title="Cancel"
                  typeProps="stroke"
                  onClick={handleCancelSelect}
                  Icon={() => (
                    <Backward
                      stroke={theme.palette.primary.main}
                      width={24}
                      className="iconBtn"
                    />
                  )}
                />
              </>
            ) : (
              <>
                <ButtonText
                  title="Select"
                  typeProps="stroke"
                  color="text.100"
                  onClick={handleSelect}
                  Icon={() => (
                    <SelectIcon
                      stroke={theme.palette.text[100]}
                      width={24}
                      className="iconBtn"
                    />
                  )}
                />

                <ButtonText
                  Icon={FiSearch}
                  onClick={handleOpenSearch}
                  title="Search"
                  color="text.100"
                />

                <ButtonText
                  Icon={FiPlusCircle}
                  onClick={handleOpenAddDoc}
                  title="Add New Document"
                  color="primary.main"
                />
              </>
            )}
          </Toolbar>

          <Box
            variant="div"
            className="page-container"
            flex={1}
            bgcolor="text.light"
          >
            {groupDocs.map((group, index) => (
              <CollapesItem
                isSelect={isSelect}
                key={index}
                tag={group.tag}
                docs={group.docs}
                setSelectList={setSelectList}
                selectList={selectList}
              />
            ))}
          </Box>
        </>
      ) : (
        <NoDocsComponent handleOpenAddDoc={handleOpenAddDoc} />
      )}

      <ModalAddDoc open={openModalAddDoc} handleClose={handleCloseAddDoc} />

      <ModalSearch
        open={openModalSearch}
        handleClose={handleCloseSearch}
        handleSearch={handleSearch}
      />

      <ModalDeleteDoc
        open={openModalDeleteDoc}
        handleClose={handleCloseDelete}
        count={selectList.length}
        handleDelete={handleDelete}
      />

      <ModalShare
        open={openModalShare}
        handleClose={handleCloseShare}
        handleShare={handleShare}
      />
    </Box>
  );
};

export default MedicalDocuments;
