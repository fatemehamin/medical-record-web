import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "../../../components/Input";
import BasicModal from "../../../components/BasicModal";
import DividerOR from "../../../components/DividerOR";
import InputDate from "../../../components/InputDate";
import FileUploadAndDrag from "../../../components/FileUploadAndDrag";
import Btn from "../../../components/Btn";
import { Box, MenuItem } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

const urlRegex =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$|^$/;

const addDocumentSchema = Yup.object().shape({
  url: Yup.string().trim().matches(urlRegex, "Please enter a valid URL"),
  tag: Yup.string().required(),
  name: Yup.string().trim().required(),
  date: Yup.date().required(),
});

const ModalAddDoc = ({ open, handleClose, handleAdd }) => {
  const [file, setFile] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const { AllTags } = useSelector((state) => state.medicalDoc);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addDocumentSchema),
    defaultValues: { url: "", name: "", tag: "", date: null },
  });

  const watchAllFields = watch();

  useEffect(() => {
    setAllFieldsFilled(checkAllFieldsFilled(watchAllFields));
  }, [watchAllFields]);

  const checkAllFieldsFilled = useCallback(
    (data) => {
      data["url"] = file?.name || data.url;
      return Object.values(data).every((value) => value !== "" && !!value);
    },
    [file]
  );

  return (
    <>
      <BasicModal
        title="Add New Document"
        open={open}
        handleClose={handleClose}
      >
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          onSubmit={handleSubmit((data, event) => handleAdd(data, event, file))}
          gap={1}
        >
          <FileUploadAndDrag file={file} setFile={setFile} />

          <DividerOR />

          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                disabled={file}
                title="Add a Link URL:"
                error={!!errors.url}
                helperText={errors.url ? errors.url.message : ""}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                title="Name:"
                placeholder="Give a name to your new document"
              />
            )}
          />

          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                title="File Type:"
                select
                isPlaceholderSelect={field.value === ""}
              >
                <MenuItem disabled value="" sx={{ display: "none" }}>
                  Choose file type
                </MenuItem>
                {AllTags.map((type) => (
                  <MenuItem key={type.key} value={type.key}>
                    {type.value}
                  </MenuItem>
                ))}
              </Input>
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => <InputDate {...field} title="Date:" />}
          />

          <Btn
            disabled={!allFieldsFilled}
            type="submit"
            variant="contained"
            name="regularUpload"
            title="upload"
          />

          <Btn
            type="submit"
            disabled={!getValues("url") && file == null}
            variant="contained"
            name="extractUpload"
            title="Upload and extract data"
          />
        </Box>
      </BasicModal>
    </>
  );
};

export default ModalAddDoc;
