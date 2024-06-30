import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "../components/Input";
import BasicModal from "../components/Modal";
import DividerOR from "./DividerOR";
import theme from "../Theme";
import JPG from "../assets/Icons/jpg.png";
import InputDate from "./InputDate";
import {
  Avatar,
  BottomNavigationAction,
  Box,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addMedicalDocs } from "../features/medicalDoc/action";
import { LuUpload } from "react-icons/lu";
import { FiX } from "react-icons/fi";
import { ReactComponent as PDF } from "../assets/Icons/pdf.svg";
import { fetchDoctorsAccepted } from "../features/doctors/action";
import { useDropzone } from "react-dropzone";
import FileUploadComponent from "./FileUploadComponent";
import Btn from "./Btn";

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

export const ModalAddDoc = ({ open, handleClose }) => {
  const [file, setFile] = useState(null);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const { AllTags } = useSelector((state) => state.medicalDoc);

  const dispatch = useDispatch();

  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  const addDocumentSchema = Yup.object().shape({
    url: Yup.string().trim().matches(urlRegex, "Please enter a valid URL"),
    tag: Yup.string().required(),
    name: Yup.string().trim().required(),
    date: Yup.date().required(),
  });

  const onSubmit = (data) => {
    const { tag, url, name, date } = data;
    const args = {
      file: !!file ? file.binaryFile : "",
      url,
      tag,
      name,
      date: date.toISOString().slice(0, 10),
    };

    dispatch(addMedicalDocs(args));
    handleClose();
  };

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
          onSubmit={handleSubmit(onSubmit)}
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

          <Btn disabled={!allFieldsFilled} type="submit" variant="contained">
            upload
          </Btn>

          <Btn disabled={!getValues("url") || file} variant="contained">
            Upload and extract data
          </Btn>
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

  return (
    <BasicModal open={open} handleClose={handleClose} title="Share files">
      <Input title="Enter the E-mail:" value={email} onChange={setEmail} />

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
        onClick={handleShare}
        sx={{ mt: 2 }}
      >
        Share
      </Btn>
    </BasicModal>
  );
};

export const ModalDeleteDoc = ({ open, handleClose, count, handleDelete }) => {
  return (
    <BasicModal title="Delete files" open={open} handleClose={handleClose}>
      <Typography sx={styles.bodyModalDeleteDoc}>
        {`Do you want to delete all the ${count ? count : ""} documents?`}
      </Typography>

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

//  <Controller
//     name="date"
//     control={control}
//       render={({ field }) => (
//         <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
//     //       <DatePicker
//     //         {...field}
//     //         mask="____/__/__"
//     //         // value={state.basic.BirthDate}
//     //         // onChange={onChangeBirthDate}
//     //         label={"date"}
//     //         // renderInput={(params) => <Input bgColor={bgColor} {...params} />}
//     //       />
//         </LocalizationProvider>
//       )}
//   />
export const ModalEditDoc = ({ open, handleClose }) => {
  const [file, setFile] = useState(null);
  const { AllTags } = useSelector((state) => state.medicalDoc);

  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  const addDocumentSchema = Yup.object().shape({
    url: Yup.string().trim().matches(urlRegex, "Please enter a valid URL"),
    tag: Yup.string().required("File type is required"),
    name: Yup.string().trim().required("Name is required"),
    date: Yup.date().required("Date is required"),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { tag, url, name, date } = data;
    const args = {
      file: !!file ? file.binaryFile : "",
      url,
      tag,
      name,
      date: date.toISOString().slice(0, 10),
    };

    dispatch(addMedicalDocs(args));
    handleClose();
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(addDocumentSchema),
    defaultValues: { name: "", tag: "" },
  });

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
          onSubmit={handleSubmit(onSubmit)}
          gap={1}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                title="Name:"
                placeholder="Give a name to your new document"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />

          <Controller
            name="tag"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                title="File Type:"
                select
                isPlaceholderSelect={field.value === ""}
                defaultValue=""
                error={!!errors.tag}
                helperText={errors.tag ? errors.tag.message : ""}
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
            render={({ field }) => (
              <InputDate
                {...field}
                error={!!errors.date}
                helperText={errors.date ? errors.date.message : ""}
                title="Date:"
              />
            )}
          />

          <Button
            // disabled={!isValid}
            type="submit"
            variant="contained"
            sx={{ mt: 1 }}
          >
            Save
          </Button>

          <Button disabled={!getValues("url") || file} variant="contained">
            Cancel
          </Button>
        </Box>
      </BasicModal>
    </>
  );
};
