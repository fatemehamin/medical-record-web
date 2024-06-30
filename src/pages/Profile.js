import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import AdapterJalali from "@date-io/date-fns-jalali";
// import AdapterDateFnsJalali from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const personalInformationSchema = Yup.object().shape({
  // date: Yup.string().datetime(),
  // weight: Yup.number().min(0).max(1000),
  // height: Yup.number().min(1).max(1000),
  // bloodGroup: Yup.string(),
});

const Profile = () => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalInformationSchema),
    // defaultValues: { username: "", password: "", email: "", rePassword: "" },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Box
      display="flex"
      flexDirection="column"
      component="form"
      mt={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="date"
        control={control}
        render={({ field }) => {
          // console.log(field);
          return (
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
              <DatePicker
                {...field}
                mask="____/__/__"
                // value={state.basic.BirthDate}
                // onChange={onChangeBirthDate}
                label={"date"}
                // renderInput={(params) => <Input bgColor={bgColor} {...params} />}
              />
            </LocalizationProvider>
          );
        }}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            label="gender"
            margin="normal"
            select
            // error={!!errors.username}
            // helperText={errors.username ? errors.username.message : ""}
          >
            <MenuItem
              key={"male"}
              value={"male"}
              //  disabled={option.Id == "none"}
            >
              male
            </MenuItem>
            <MenuItem
              key={"female"}
              value={"female"}
              //  disabled={option.Id == "none"}
            >
              Female
            </MenuItem>
            <MenuItem
              key={"other"}
              value={"other"}
              //  disabled={option.Id == "none"}
            >
              other
            </MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="weight"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            label="weight"
            margin="normal"
            // error={!!errors.username}
            // helperText={errors.username ? errors.username.message : ""}
          />
        )}
      />

      <Controller
        name="height"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            label="height"
            margin="normal"
            // error={!!errors.username}
            // helperText={errors.username ? errors.username.message : ""}
          />
        )}
      />

      <Controller
        name="blood type"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            label="blood type"
            margin="normal"
            select
            // error={!!errors.username}
            // helperText={errors.username ? errors.username.message : ""}
          >
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
              <MenuItem
                key={type}
                value={type}
                //  disabled={option.Id == "none"}
              >
                {type}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Button type="submit" variant="contained">
        OK
      </Button>
    </Box>
  );
};

export default Profile;
