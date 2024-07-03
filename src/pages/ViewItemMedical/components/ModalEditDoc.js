import React from "react";
import * as Yup from "yup";
import Input from "../../../components/Input";
import BasicModal from "../../../components/BasicModal";
import InputDate from "../../../components/InputDate";
import Btn from "../../../components/Btn";
import dayjs from "dayjs";
import { Box, MenuItem } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { editMedicalDocs } from "../../../features/medicalDoc/action";

const editDocumentSchema = Yup.object().shape({
  tag: Yup.string().required(),
  name: Yup.string().trim().required(),
  date: Yup.date().required(),
});

const ModalEditDoc = ({ open, handleClose }) => {
  const { currentDoc, AllTags } = useSelector((state) => state.medicalDoc);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({
    resolver: yupResolver(editDocumentSchema),
    defaultValues: {
      name: currentDoc.name,
      tag: currentDoc.tag,
      date: dayjs(currentDoc.date),
    },
  });

  const onSubmit = (data) => {
    const { tag, name, date } = data;
    const args = {
      id: currentDoc.id,
      tag,
      name,
      date: date.toISOString().slice(0, 10),
    };

    dispatch(editMedicalDocs(args));
    handleClose();
  };

  return (
    <>
      <BasicModal title="Edit" open={open} handleClose={handleClose}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          onSubmit={handleSubmit(onSubmit)}
          gap={1}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} title="Name:" />}
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

          <Box display="flex" gap={1} justifyContent="space-between">
            <Btn
              disabled={!isValid || !isDirty}
              variant="contained"
              sx={{ mt: 1, width: 150 }}
              title="Save"
              type="submit"
            />

            <Btn
              variant="outlined"
              sx={{ mt: 1, width: 150 }}
              onClick={handleClose}
              title="Cancel"
            />
          </Box>
        </Box>
      </BasicModal>
    </>
  );
};

export default ModalEditDoc;
