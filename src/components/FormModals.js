import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "../components/Input";
import BasicModal from "../components/Modal";
import DividerOR from "./DividerOR";
import theme from "../Theme";
import JPG from "../assets/Icons/jpg.png";
import InputDate from "./InputDate";
import { Avatar, Box, Button, MenuItem, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addMedicalDocs } from "../features/medicalDoc/action";
import { LuUpload } from "react-icons/lu";
import { FiX } from "react-icons/fi";
import { ReactComponent as PDF } from "../assets/Icons/pdf.svg";
import { fetchDoctorsAccepted } from "../features/doctors/action";

const styles = {
  btn: { borderRadius: 2, width: 150 },
  bodyModalDeleteDoc: {
    color: "text.main",
    textAlign: "center",
    fontSize: 12,
    fontWeight: 400,
  },
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
  },
};

export const ModalShare = ({ open, handleClose, handleShare }) => {
  const { doctorsAccepted } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorsAccepted());
  }, []);

  return (
    <BasicModal open={open} handleClose={handleClose} title="Share files">
      <Input title="Enter the E-mail:" />

      {doctorsAccepted?.length > 0 && (
        <>
          <DividerOR />

          <Typography fontSize={12} fontWeight={400} color="text.dark" pb={1}>
            choose your doctors:
          </Typography>

          <Box
            sx={{
              height: 140,
              overflowY: "scroll",
              borderRadius: 2,
              border: "solid 1px",
              borderColor: "text.100",
            }}
          >
            {doctorsAccepted.map((v, index) => (
              <Box key={index} display="flex" alignItems="center" p={1}>
                <Avatar alt={v.name} />
                <Typography p={1}>{v.name}</Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
      <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{ borderRadius: 2, mt: 4 }}
        onClick={handleShare}
      >
        Share
      </Button>
    </BasicModal>
  );
};

export const ModalSearch = ({ open, handleClose, handleSearch }) => {
  const { handleSubmit, control } = useForm({});

  return (
    <BasicModal open={open} handleClose={handleClose} title="Search files">
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={handleSubmit(handleSearch)}
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

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ borderRadius: 2, mt: 4 }}
        >
          Search
        </Button>
      </Box>
    </BasicModal>
  );
};

export const ModalDeleteDoc = ({ open, handleClose, count, handleDelete }) => {
  return (
    <BasicModal title="Delete files" open={open} handleClose={handleClose}>
      <Typography sx={styles.bodyModalDeleteDoc}>
        {`Do you want to delete all the ${count} documents?`}
      </Typography>

      <Box display="flex" justifyContent="space-around" gap={2} mt={6}>
        <Button variant="contained" sx={styles.btn} onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="outlined" sx={styles.btn} onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </BasicModal>
  );
};

export const ModalAddDoc = ({ open, handleClose }) => {
  const [file, setFile] = useState(null);
  const { AllTags } = useSelector((state) => state.medicalDoc);

  const addDocumentSchema = Yup.object().shape({
    url: Yup.string().trim(),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addDocumentSchema),
    defaultValues: { url: "", name: "", tag: "" },
  });

  const onChangeFile = (e) =>
    setFile({
      name: e.target.files[0].name,
      binaryFile: e.target.files[0],
      type: e.target.files[0].type.split("/")[0],
    });

  const handleClearFile = () => setFile(null);

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
        >
          {!!file ? (
            <Box sx={styles.modalShowFile}>
              <Box variant="div" display="flex" alignItems="center" width="90%">
                {file.type === "image" ? (
                  <img src={JPG} width={24} />
                ) : (
                  <PDF fill={styles.text500} />
                )}
                <Typography sx={styles.modalAddFileText}>
                  {file.name}
                </Typography>
              </Box>

              <FiX size={16} onClick={handleClearFile} color={styles.text500} />
            </Box>
          ) : (
            <Button variant="text" component="label" sx={styles.inputFile}>
              <LuUpload size={24} color={theme.palette.text[100]} />

              <Typography fontSize={10} fontWeight={400} color="text.200" p={1}>
                Drag & Drop or{" "}
                <Typography variant="p" color="primary">
                  Choose file
                </Typography>{" "}
                to upload
              </Typography>
              <input
                type="file"
                // accept="image/png, image/gif, image/jpeg"
                style={{ display: "none" }}
                onChange={onChangeFile}
              />
            </Button>
          )}

          <DividerOR />

          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <Input {...field} disabled={file} title="Add a Link URL:" />
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
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />

          <Controller
            name="tag"
            control={control}
            defaultValue=""
            render={({ field }) => {
              console.log(field.value);
              return (
                <Input
                  {...field}
                  title="File Type:"
                  select
                  isPlaceholderSelect={field.value === ""}
                  defaultValue=""
                  // error={!!errors.tag}
                  // helperText={errors.tag ? errors.tag.message : ""}
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
              );
            }}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => <InputDate {...field} title="Date:" />}
          />

          <Button type="submit" variant="contained" sx={{ mt: 4 }}>
            upload
          </Button>

          <Button variant="contained" sx={{ mt: 1 }}>
            Upload and extract data
          </Button>
        </Box>
      </BasicModal>
    </>
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
