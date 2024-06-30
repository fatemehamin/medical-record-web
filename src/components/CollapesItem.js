import React, { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment-jalaali";
import theme from "../Theme";
import MenuComponent from "./MenuAction";
import { useNavigate } from "react-router-dom";
import { Box, Checkbox, Collapse, Typography } from "@mui/material";
import {
  ExpandLessRounded as Down,
  ExpandMoreRounded as Up,
  MoreVertRounded,
} from "@mui/icons-material";

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
    borderColor: "primary.main",
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
  moreIcon: { flex: 1, cursor: "pointer" },
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
  }, [isSelect, docs]);

  const handleAction = useCallback((event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurrentDocId(id);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleMultiSelected = useCallback(
    (event) => {
      const { checked } = event.target;

      const newListDoc = checked
        ? [...selectList, ...unSelectItemGroup]
        : selectList.filter((doc) => doc.tag !== tag);

      setUnSelectItemGroup(checked ? [] : docs);

      setSelectList(newListDoc);
    },
    [selectList, unSelectItemGroup, tag, docs]
  );

  const handleSelected = useCallback(
    (event) => {
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
    },
    [selectList, docs, unSelectItemGroup]
  );

  const toggleCollapse = useCallback(() => setCollasped((c) => !c), []);

  const toggleCheckbox = useMemo(
    () => (isSelect ? { opacity: 1 } : { opacity: 0, position: "absolute" }),
    [isSelect]
  );

  const handleView = useCallback(
    (id) => navigate(`/medicalDocument/${id}`),
    []
  );

  return (
    <>
      <Box variant="div" sx={styles.collapseContainer} onClick={toggleCollapse}>
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
            onClick={() => handleView(doc.id)}
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
              {doc.name}
            </Typography>

            <Typography
              color="text.main"
              fontWeight={400}
              fontSize={16}
              flex={3}
            >
              {moment(doc.date).format("DD MMM YYYY")}
            </Typography>

            <MoreVertRounded
              sx={styles.moreIcon}
              onClick={(e) => handleAction(e, doc.id)}
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

export default CollapesItem;
