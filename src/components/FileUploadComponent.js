import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { LuUpload } from "react-icons/lu";
import { FiX } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { ReactComponent as PDF } from "../assets/Icons/pdf.svg";
import JPG from "../assets/Icons/jpg.png";
import theme from "../Theme";

const styles = {
  modalShowFile: {
    border: "solid 1px",
    borderColor: "primary.main",
    borderRadius: 2,
    flex: 1,
    p: 0.5,
    pr: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalAddFileText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "text.main",
    fontSize: 12,
    fontWeight: 400,
    m: 1,
  },
  text500: theme.palette.text.main,
  inputFile: {
    border: "dashed 1px",
    borderColor: "text.100",
    borderRadius: 2,
    height: 110,
    display: "flex",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const FileUploadComponent = ({ file, setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile({
        name: selectedFile.name,
        binaryFile: selectedFile,
        type: selectedFile.type.startsWith("image/") ? "image" : "pdf",
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const handleClearFile = () => setFile(null);

  return !!file ? (
    <Box sx={styles.modalShowFile}>
      <Box variant="div" display="flex" alignItems="center" width="90%">
        {file.type === "image" ? (
          <img src={JPG} width={24} />
        ) : (
          <PDF fill={styles.text500} />
        )}
        <Typography sx={styles.modalAddFileText}>{file.name}</Typography>
      </Box>

      <FiX size={16} onClick={handleClearFile} color={styles.text500} />
    </Box>
  ) : (
    <Box
      variant="div"
      component="div"
      sx={styles.inputFile}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <LuUpload size={24} color={theme.palette.text[100]} />
      {isDragActive ? (
        <Typography fontSize={10} fontWeight={400} color="text.200" p={1}>
          Drop the files here ...
        </Typography>
      ) : (
        <Typography fontSize={10} fontWeight={400} color="text.200" p={1}>
          Drag & Drop or{" "}
          <Typography variant="p" color="primary">
            Choose file
          </Typography>{" "}
          to upload
        </Typography>
      )}
    </Box>
  );
};

export default FileUploadComponent;
