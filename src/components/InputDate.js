import { Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactComponent as Calendar } from "../assets/Icons/calendar.svg";
import React, { forwardRef } from "react";
import theme from "../Theme";

const InputDate = forwardRef(({ title, ...props }, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography fontSize={12} fontWeight={400} color="text.main" pb="3px">
        {title}
      </Typography>
      <DatePicker
        {...props}
        ref={ref}
        slots={{
          openPickerIcon: (p) => (
            <Calendar {...p} stroke={theme.palette.text[100]} width={16} />
          ),
        }}
        slotProps={{
          openPickerButton: { sx: { color: "text.100" } },
          textField: {
            InputProps: { sx: { height: 42, borderRadius: 2 } },
          },
        }}
      />
    </LocalizationProvider>
  );
});

export default InputDate;
