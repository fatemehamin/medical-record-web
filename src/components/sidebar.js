import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { AiFillBug } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Document } from "../assets/Icons/document.svg";
import { ReactComponent as Grid } from "../assets/Icons/grid.svg";
import { ReactComponent as LogoIcon } from "../assets/Icons/logo_icon.svg";
import { ReactComponent as LogoText } from "../assets/Icons/logo_text.svg";
import { ReactComponent as Stethoscope } from "../assets/Icons/Stethoscope.svg";
import { ReactComponent as DocumentMedicine } from "../assets/Icons/document_medicine.svg";
import { colors } from "../Theme";
import "./sidebar.css";

const Item = ({ title, icon, selected, setSelected, to }) => {
  const navigator = useNavigate();

  const onClickItem = () => {
    setSelected(title);
    navigator(to);
  };

  const active = selected === title;

  return (
    <MenuItem
      icon={icon}
      onClick={onClickItem}
      active={active}
      className={`sub-menu ${active ? "sub-menu-active" : ""}`}
      style={{ backgroundColor: active && colors.text[10] }}
    >
      <Typography
        color={active ? "primary" : "text.light"}
        className="sub-menu-text"
      >
        {title}
      </Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const [isCollapssed, setIsCollapssed] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <Sidebar
      collapsed={isCollapssed}
      style={{
        height: "200%",
        position: "sticky",
        top: 0,
      }}
    >
      <Box bgcolor={colors.primary[300]} height="100%">
        <Box component="div" className="side-bar-logo">
          <LogoIcon stroke={colors.text[10]} width={77} />
          <LogoText fill={colors.text[10]} style={{ padding: 5 }} />
        </Box>

        <Menu className="menu">
          {/* <Item
            title="Overview"
            selected={selected}
            setSelected={setSelected}
            to="/overview"
            icon={
              <Grid
                width={24}
                fill={
                  selected === "Overview"
                    ? colors.primary[300]
                    : colors.text[10]
                }
              />
            }
          /> */}
          {/* <SubMenu
            label="Medical Records"
            onClick={() => setSelected("Medical Records")}
            // className="sub-menu"
            style={{
              backgroundColor:
                selected === "Medical Records" && colors.text[10],
              margin: 10,
              color:
                selected === "Medical Records"
                  ? colors.primary[300]
                  : colors.text[10],
            }}
            icon={
              <Document
                stroke={
                  selected === "Medical Records"
                    ? colors.primary[300]
                    : colors.text[10]
                }
              />
            }
          >
            <Item
              title="Medical Documents"
              to="/medicalDocument"
              selected={selected}
              setSelected={setSelected}
            />
            <MenuItem icon={<AiFillBug />}> Line charts </MenuItem>
          </SubMenu> */}
          <Item
            title="Medical Documents"
            to="/medicalDocument"
            selected={selected}
            setSelected={setSelected}
            icon={
              <DocumentMedicine
                width={24}
                stroke={
                  selected === "Medical Documents"
                    ? colors.primary[300]
                    : colors.text[10]
                }
              />
            }
          />
          {/* <Item
            title="My Doctors"
            selected={selected}
            setSelected={setSelected}
            to="/myDoctors"
            icon={
              <Stethoscope
                width={24}
                stroke={
                  selected === "My Doctors"
                    ? colors.primary[300]
                    : colors.text[10]
                }
              /> */}
          {/* } /> */}
          {/* <Item
            title="my profile"
            to="/profile"
            selected={selected}
            setSelected={setSelected}
          /> */}
        </Menu>
        <Button onClick={() => setIsCollapssed((c) => !c)}>open</Button>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
