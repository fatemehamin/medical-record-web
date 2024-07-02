import React, { useCallback, useEffect, useState } from "react";
import Input from "../../../components/Input";
import BasicModal from "../../../components/BasicModal";
import DividerOR from "../../../components/DividerOR";
import InputDate from "../../../components/InputDate";
import Btn from "../../../components/Btn";
import { Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { searchDocs } from "../../../features/medicalDoc/medicalDocSlice";
import { useDispatch } from "react-redux";

const ModalSearch = ({ open, handleClose }) => {
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const dispatch = useDispatch();

  const { handleSubmit, control, watch } = useForm({
    defaultValues: { name: "", startDate: null, endDate: null },
  });

  const watchAllFields = watch();

  useEffect(() => {
    setAllFieldsFilled(checkAllFieldsFilled(watchAllFields));
  }, [watchAllFields]);

  const checkAllFieldsFilled = useCallback((data) => {
    return data.name.trim() !== "" || (!!data.startDate && !!data.endDate);
  }, []);

  const handleSearch = useCallback((data) => {
    dispatch(searchDocs(data));
    handleClose();
  }, []);

  return (
    <BasicModal open={open} handleClose={handleClose} title="Search files">
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={handleSubmit(handleSearch)}
        gap={1}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input {...field} title="Search your document by name:" />
          )}
        />

        <DividerOR />

        <Typography fontSize={12} fontWeight={400} color="text.dark" pb={1}>
          Search your document by date of modified:
        </Typography>

        <Controller
          name="startDate"
          control={control}
          render={({ field }) => <InputDate {...field} title="Start Date:" />}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => <InputDate {...field} title="End Date:" />}
        />

        <Btn disabled={!allFieldsFilled} variant="contained" type="submit">
          Search
        </Btn>
      </Box>
    </BasicModal>
  );
};

export default ModalSearch;
