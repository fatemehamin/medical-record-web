import React, { useCallback, useEffect, useMemo, useState } from "react";
import Topbar from "../components/Topbar";
import Toolbar from "../components/Toolbar";
import theme from "../Theme";
import ButtonText from "../components/ButtonText";
import CollapesItem from "../components/CollapesItem";
import NoDocPic from "../assets/no_doc_pic.png";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Backward } from "../assets/Icons/backward.svg";
import { ReactComponent as SelectIcon } from "../assets/Icons/Select.svg";
import { searchDocs } from "../features/medicalDoc/medicalDocSlice";
import { FiPlusCircle, FiSearch, FiShare2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import { Box, Grid, Typography } from "@mui/material";
import {
  deleteMedicalDocs,
  fetchMedicalDocs,
  shareMedicalDocs,
} from "../features/medicalDoc/action";
import {
  ModalAddDoc,
  ModalDeleteDoc,
  ModalSearch,
  ModalShare,
} from "../components/FormModals";

const NoDocsComponent = ({ handleOpenAddDoc }) => (
  <Grid
    container
    className="page-container"
    flex={1}
    bgcolor="text.light"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Grid width={{ md: 256, xs: 100 }}>
      <img src={NoDocPic} width={"100%"} />
    </Grid>

    <Typography fontSize={20} fontWeight={400} p={2} color="text.main">
      No documents have been added yet
    </Typography>
    <ButtonText
      Icon={FiPlusCircle}
      onClick={handleOpenAddDoc}
      title="Add New Document"
      color="primary.main"
    />
  </Grid>
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

  const groupDocs = useMemo(
    () =>
      tags?.map((tag) => ({
        tag: AllTags.find((t) => t.key === tag)?.value,
        docs: docs?.filter((doc) => doc.tag === tag),
      })),
    [tags, docs]
  );

  const handleOpenAddDoc = useCallback(() => setOpenModalAddDoc(true), []);
  const handleCloseAddDoc = useCallback(() => setOpenModalAddDoc(false), []);

  const handleOpenSearch = useCallback(() => setOpenModalSearch(true), []);
  const handleCloseSearch = useCallback(() => setOpenModalSearch(false), []);

  const handleOpenDelete = useCallback(() => setOpenModalDeleteDoc(true), []);
  const handleCloseDelete = useCallback(() => setOpenModalDeleteDoc(false), []);

  const handleOpenShare = useCallback(() => setOpenModalShare(true), []);
  const handleCloseShare = useCallback(() => setOpenModalShare(false), []);

  const handleSearch = (data) => {
    dispatch(searchDocs(data));
    setOpenModalSearch(false);
  };

  const handleSelect = () => setIsSelect((s) => !s);

  const handleCancelSelect = () => {
    setIsSelect(false);
    setSelectList([]);
  };

  const handleDelete = () => {
    const arg = selectList.map((doc) => doc.id);
    dispatch(deleteMedicalDocs(arg));
    setOpenModalDeleteDoc(false);
    handleCancelSelect();
  };

  const handleShare = (email) => {
    dispatch(shareMedicalDocs({ data: selectList.map((v) => v.id), email }));
    setOpenModalShare(false);
    handleCancelSelect();
  };

  return (
    <Grid container flexDirection="column" wrap="nowrap" flex={1} p={3}>
      <Topbar title="Medical Documents" />

      <Grid container flexDirection="column " flex={1}>
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
      </Grid>

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
    </Grid>
  );
};

export default MedicalDocuments;
