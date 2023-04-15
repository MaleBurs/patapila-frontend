import React, { useState } from "react";
import Input from "react-validation/build/input";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PhoneInput, { formatPhoneNumberIntl  } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

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
  const [country, setCountry] = useState("AR");
  const defaultCountry = "AR";

  function handleOnChange(newValue) {
    console.log(newValue)
    props.onChange(newValue);
    if (setCountry) {
      setCountry(formatPhoneNumberIntl(newValue));
    }
  }

  return (
    <div className="py-2 px-4">
      <PhoneInput
        maxLength={13}
        className="MyPhoneInput"
        menuClass="phone-input-menu"
        defaultCountry={defaultCountry}
        country={country}
        flags={flags}
        placeholder="011 6725-9823"
        value={props.value}
        onChange={handleOnChange}
      />
      <div className="">
        {flags[country]}
      </div>
    </div>
  );
}

export function CountryCitySelector(props) {
  return (
    <div className="flex flex-row py-1">
      <CountryDropdown
      value={props.value.country}
      onChange={(val) => {props.onChange.onChangeCountry(val); props.onChange.onChangeCity("")}}
      classes="CountryDropDown"
      style={{ width: '50%', color: `${props.value.country==="" ? "#e7e6e6" : "#3f3f3f"}`}}
      defaultOptionLabel="País"
      />
    
      <RegionDropdown
      country={props.value.country} 
      value={props.value.city}
      onChange={(val) => props.onChange.onChangeCity(val)} 
      style={{ width: '50%', color: `${props.value.city==="" ? "#e7e6e6" : "#3f3f3f"}`}}
      classes="CityDropDown"
      defaultOptionLabel="Ciudad"/>
    </div>
  );
}