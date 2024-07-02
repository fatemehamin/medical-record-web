import React from "react";
import Toolbar from "../../../components/Toolbar";
import theme from "../../../Theme";
import ButtonText from "../../../components/ButtonText";
import { useSelector } from "react-redux";
import { ReactComponent as Backward } from "../../../assets/Icons/backward.svg";
import { ReactComponent as SelectIcon } from "../../../assets/Icons/Select.svg";
import { FiPlusCircle, FiSearch, FiShare2 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

const ToolbarMedical = ({
  handleOpenAddDoc,
  handleOpenSearch,
  handleOpenDelete,
  handleOpenShare,
  handleSelect,
  handleCancelSelect,
  isSelect,
  selectList,
}) => {
  const { docs } = useSelector((state) => state.medicalDoc);

  return (
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
  );
};

export default ToolbarMedical;
