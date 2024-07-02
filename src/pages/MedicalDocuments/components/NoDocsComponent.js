import React from "react";
import ButtonText from "../../../components/ButtonText";
import NoDocPic from "../../../assets/no_doc_pic.png";
import { FiPlusCircle } from "react-icons/fi";
import { Grid, Typography } from "@mui/material";

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

export default NoDocsComponent;
