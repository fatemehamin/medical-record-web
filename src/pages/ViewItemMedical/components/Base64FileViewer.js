import React, { useState, useEffect } from "react";
import { ReactComponent as PDF } from "../../../assets/Icons/pdf.svg";
import JPG from "../../../assets/Icons/jpg.png";
import theme from "../../../Theme";
import { Box, Typography } from "@mui/material";

// const ImageFormat = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.csv', '.xls', '.xlsx', '.xml', '.hl7', '.dicom', '.json', '.txt', '.sql']

const Base64FileViewer = ({ base64String, type, fileName }) => {
  const [fileType, setFileType] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (type == "png" || type == "jpg") {
      setFileType("image");
    } else if (type === "pdf") {
      setFileType("pdf");
    }
    // Create a Blob URL for opening in a new tab
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: fileType === "image" ? "image/jpeg" : "application/pdf",
    });
    setFileUrl(URL.createObjectURL(blob));
  }, [base64String]);

  const openInNewTab = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <div onClick={openInNewTab} style={{ cursor: "pointer" }}>
      {fileType === "image" && (
        <Box gap={1} display="flex" alignItems="center">
          {/* <img
            src={`data:image/${type};base64,${base64String}`}
            width={303}
          /> */}

          <img src={JPG} width={30} />
          <Typography fontSize={16} fontWeight={500}>
            {fileName}.{type}
          </Typography>
        </Box>
      )}
      {fileType === "pdf" && (
        <Box gap={1} display="flex" alignItems="center">
          <PDF width={30} height={30} fill={theme.palette.text.main} />
          <Typography fontSize={16} fontWeight={500}>
            {fileName}.{type}
          </Typography>

          {/* <embed
            src={`data:application/${type};base64,${base64String}`}
            type="application/pdf"
            width="300"
            height="200"
          /> */}
        </Box>
      )}
      {!fileType && (
        <Typography fontSize={16} fontWeight={500}>
          Unsupported file type
        </Typography>
      )}
    </div>
  );
};

export default Base64FileViewer;
