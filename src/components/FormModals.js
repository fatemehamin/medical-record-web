import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "../components/Input";
import BasicModal from "../components/Modal";
import DividerOR from "./DividerOR";
import InputDate from "./InputDate";
import FileUploadComponent from "./FileUploadComponent";
import Btn from "./Btn";
import dayjs from "dayjs";
import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { editMedicalDocs } from "../features/medicalDoc/action";
import { fetchDoctorsAccepted } from "../features/doctors/action";

const styles = {
  btn: { width: 150 },
  bodyModalDeleteDoc: {
    color: "text.main",
    textAlign: "center",
    fontSize: 12,
    fontWeight: 400,
  },
  doctors: {
    height: 140,
    overflowY: "scroll",
    borderRadius: 2,
    border: "solid 1px",
    borderColor: "text.100",
  },
  avatarDoc: { width: 32, height: 32 },
  nameDoc: { fontWeight: 400, fontSize: 12, p: 1 },
  DoctorItem: {
    cursor: "pointer",
    p: "3px",
    display: "flex",
    alignItems: "center",
  },
};

export const ModalAddDoc = ({ open, handleClose, handleAdd }) => {
  const [file, setFile] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const { AllTags } = useSelector((state) => state.medicalDoc);

  const urlRegex =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$|^$/;

  const addDocumentSchema = Yup.object().shape({
    url: Yup.string().trim().matches(urlRegex, "Please enter a valid URL"),
    tag: Yup.string().required(),
    name: Yup.string().trim().required(),
    date: Yup.date().required(),
  });

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

  const checkAllFieldsFilled = (data) => {
    data["url"] = file?.name || data.url;
    return Object.values(data).every((value) => value !== "" && !!value);
  };

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
          <FileUploadComponent file={file} setFile={setFile} />

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

export const ModalSearch = ({ open, handleClose, handleSearch }) => {
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const { handleSubmit, control, watch } = useForm({
    defaultValues: { name: "", startDate: null, endDate: null },
  });

  const watchAllFields = watch();

  useEffect(() => {
    setAllFieldsFilled(checkAllFieldsFilled(watchAllFields));
  }, [watchAllFields]);

  const checkAllFieldsFilled = (data) => {
    return data.name.trim() !== "" || (!!data.startDate && !!data.endDate);
  };

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

export const ModalShare = ({ open, handleClose, handleShare }) => {
  const [email, setEmail] = useState("");

  const { doctorsAccepted } = useSelector((state) => state.doctors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorsAccepted());
  }, []);

  const onChangeEmail = (e) => setEmail(e.target.value);

  return (
    <BasicModal open={open} handleClose={handleClose} title="Share files">
      <Input title="Enter the E-mail:" value={email} onChange={onChangeEmail} />

      {doctorsAccepted?.length > 0 && (
        <>
          <DividerOR />

          <Typography fontSize={12} fontWeight={400} color="text.dark" pb={1}>
            choose your doctors:
          </Typography>

          <Box sx={styles.doctors} p={1}>
            {doctorsAccepted.map((v, index) => (
              <Box
                key={index}
                sx={styles.DoctorItem}
                onClick={() => setEmail(v.email)}
              >
                <Avatar style={styles.avatarDoc} src={v.avatar} alt={v.name} />
                <Typography
                  color={v.email === email ? "primary.main" : "text.100"}
                  sx={styles.nameDoc}
                >
                  {v.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
      <Btn
        variant="contained"
        type="submit"
        fullWidth
        onClick={() => handleShare(email)}
        sx={{ mt: 2 }}
      >
        Share
      </Btn>
    </BasicModal>
  );
};

export const ModalDelete = ({ open, handleClose, title, handleDelete }) => {
  return (
    <BasicModal title="Delete files" open={open} handleClose={handleClose}>
      <Typography sx={styles.bodyModalDeleteDoc}>{title}</Typography>

      <Box display="flex" justifyContent="space-around" gap={2} mt={6}>
        <Btn
          variant="contained"
          sx={styles.btn}
          onClick={handleDelete}
          title="Delete"
        />

        <Btn
          variant="outlined"
          sx={styles.btn}
          onClick={handleClose}
          title="Cancel"
        />
      </Box>
    </BasicModal>
  );
};

export const ModalEditDoc = ({ open, handleClose }) => {
  const { currentDoc, AllTags } = useSelector((state) => state.medicalDoc);

  const dispatch = useDispatch();

  const editDocumentSchema = Yup.object().shape({
    tag: Yup.string().required(),
    name: Yup.string().trim().required(),
    date: Yup.date().required(),
  });

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
