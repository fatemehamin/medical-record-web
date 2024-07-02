import React, { useCallback, useEffect, useMemo, useState } from "react";
import Topbar from "../../components/Topbar";
import ToolbarMedical from "./components/ToolbarMedical";
import CollapesItem from "../../components/CollapesItem";
import NoDocsComponent from "./components/NoDocsComponent";
import ModalAddDoc from "./components/ModalAddDoc";
import ModalSearch from "./components/ModalSearch";
import ModalEditTable from "./components/ModalEditTable";
import ModalShare from "./components/ModalShare";
import Alert from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import {
  addMedicalDocs,
  addOCR,
  deleteMedicalDocs,
  fetchMedicalDocs,
  shareMedicalDocs,
} from "../../features/medicalDoc/action";

const MedicalDocuments = () => {
  const [isSelect, setIsSelect] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [openModalAddDoc, setOpenModalAddDoc] = useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [openModalDeleteDoc, setOpenModalDeleteDoc] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);
  const [openModalTable, setOpenModalTable] = useState(false);

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

  const handleOpenTable = useCallback(() => setOpenModalTable(true), []);
  const handleCloseTable = useCallback(() => setOpenModalTable(false), []);

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

  const handleAdd = useCallback((data, event, file) => {
    const { tag, url, name, date } = data;
    const args = {
      file: !!file ? file.binaryFile : "",
      url,
      tag,
      name,
      date: date.toISOString().slice(0, 10),
    };

    // Prevent default form submission
    event.preventDefault();
    // Check which button was clicked
    const buttonName = event.nativeEvent.submitter.name;
    if (buttonName === "regularUpload") {
      dispatch(addMedicalDocs(args));
    } else if (buttonName === "extractUpload") {
      dispatch(addOCR(args)).then(handleOpenTable);
    }

    setOpenModalAddDoc(false);
  }, []);

  return (
    <Grid container flexDirection="column" wrap="nowrap" flex={1} p={3}>
      <Topbar title="Medical Documents" />

      <Grid container flexDirection="column " flex={1}>
        {docs.length ? (
          <>
            <ToolbarMedical
              handleOpenAddDoc={handleOpenAddDoc}
              handleOpenSearch={handleOpenSearch}
              handleOpenDelete={handleOpenDelete}
              handleOpenShare={handleOpenShare}
              handleSelect={handleSelect}
              handleCancelSelect={handleCancelSelect}
              isSelect={isSelect}
              selectList={selectList}
            />

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

      <ModalAddDoc
        open={openModalAddDoc}
        handleClose={handleCloseAddDoc}
        handleAdd={handleAdd}
      />

      <ModalSearch open={openModalSearch} handleClose={handleCloseSearch} />

      <Alert
        title={`Do you want to delete all the ${selectList.length} documents?`}
        open={openModalDeleteDoc}
        handleClose={handleCloseDelete}
        onClick={handleDelete}
      />

      <ModalShare
        open={openModalShare}
        handleClose={handleCloseShare}
        handleShare={handleShare}
      />

      <ModalEditTable open={openModalTable} handleClose={handleCloseTable} />
    </Grid>
  );
};

export default MedicalDocuments;
