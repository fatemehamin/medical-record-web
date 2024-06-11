import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Topbar from "../components/Topbar";
import "./MedicalDocuments.css";
import Toolbar from "../components/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicalDocs } from "../features/medicalDoc/action";
import theme from "../Theme";
import {
  ExpandLessRounded as Down,
  ExpandMoreRounded as Up,
  MoreVertRounded,
} from "@mui/icons-material";
import Select from "../components/Select";
import Search from "../components/Search";
import AddDocument from "../components/AddDocument";
import moment from "moment-jalaali";

const styles = {
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
};

const CollapesItem = ({ tag, docs, setSelectList, selectList, isSelect }) => {
  const [collapsed, setCollasped] = useState(false);
  const [unSelectItemGroup, setUnSelectItemGroup] = useState(docs);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Box key={index} variant="div" sx={styles.dataTable}>
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

            <MoreVertRounded sx={{ flex: 1 }} onClick={handleClick} />
          </Box>
        ))}
      </Collapse>
    </>
  );
};

const MedicalDocuments = () => {
  const [isSelect, setIsSelect] = useState(false);
  const [selectList, setSelectList] = useState([]);

  const { docs, tags } = useSelector((state) => state.medicalDoc);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchMedicalDocs);
  // }, []);

  const groupDocs = useMemo(
    () =>
      tags.map((tag) => ({ tag, docs: docs.filter((doc) => doc.tag === tag) })),
    [tags, docs]
  );

  return (
    <Box variant="div" display="flex" flexDirection="column" flex={1} p={3}>
      <Topbar title="Medical Documents" />

      <Toolbar title={`${docs.length} Documents Total`}>
        <Select setIsSelect={setIsSelect} />
        <Search />
        <AddDocument />
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
    </Box>
  );
};

export default MedicalDocuments;
