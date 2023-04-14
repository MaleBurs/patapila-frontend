import React, { useState } from "react";
import Input from "react-validation/build/input";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PhoneInput, { formatPhoneNumberIntl  } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

export function TextInput(props) {
  return (
    <Input
      type="text"
      className="bg-transparent flex block w-full border-transparent py-4 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-L text-sm tracking-wider focus:outline-none"
      name={props.title}
      value={props.value}
      placeholder={props.title}
      onChange={props.onChange}
      validations={props.validations} />
  );
}
export function DatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        className="date-picker myDatePicker"
        disableFuture
        inputFormat="YYYY-MM-DD"
        value={props.value}
        onChange={(newDate) => {
          props.onChange(newDate.format("YYYY-MM-DD"));
        }}
        inputProps={{ readOnly: true }}
        renderInput={(params) => <TextField {...params}
          sx={{
            '.MuiInputBase-input': {
              fontFamily: "Poppins-Light",
              color: "#3f3f3f",
              fontSize: "0.875rem",
              lineHeight: "1rem",
              letterSpacing: "0.075em",
              border: "none",
            },
          }} />}
        views={["day"]}
        showDaysOutsideCurrentMonth />
    </LocalizationProvider>
  );
}
export function PhoneNumberInput(props) {
  const [defaultCountry, setDefaultCountry] = useState("AR");

  function handleOnChange(newValue) {
    console.log(newValue)
    props.onChange(newValue);
    if (setDefaultCountry) {
      setDefaultCountry(formatPhoneNumberIntl(newValue));
    }
  }

  return (
    <div className="py-2 px-4">
      <PhoneInput
        maxLength={11}
        className="MyPhoneInput"
        menuClass="phone-input-menu"
        defaultCountry={defaultCountry}
        flags={flags}
        placeholder="011 6725-9823"
        value={props.value}
        onChange={handleOnChange}
      />
      <div className="">
        {flags[defaultCountry]}
      </div>
    </div>
  );
}
