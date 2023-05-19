import React, { useState } from "react";
import Input from "react-validation/build/input";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PhoneInput, { formatPhoneNumberIntl  } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { parsePhoneNumber } from 'libphonenumber-js';
import { form } from "react-validation/build/form";

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
  const [number, setNumber] = useState(props.value);

  function isNumber(value) {
    return !isNaN(Number(value));
  }

  function handleOnChange(newValue) {
    const formattedNumber = formatPhoneNumber(newValue);
    setNumber(formattedNumber)
    props.onChange(formattedNumber);
  }

  return (
    <div className="py-2 px-4">
      <div className="MyPhoneInput flex flex-row items-center space-x-1">
        <img src="https://flagpedia.net/data/flags/normal/ar.png" alt="Argentina" className="w-7 h-5 rounded-sm" />
        <input
          type="text"
          maxLength={17}
          className="border-none hover:border-none focus:border-none focus:ring-0 focus:outline-none w-full text-sm font-Pop-L text-gray-900 tracking-widest"
          placeholder="+54 11 6725-9823"
          value={number}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      </div>
    </div>
  );

  function formatPhoneNumber(newValue) {
    let newChar = newValue.charAt(newValue.length - 1);
    let formattedNumber = newValue;
    if (isNumber(newChar)) {
      if (formattedNumber.startsWith("54")) {
        formattedNumber = formattedNumber.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, "+$1 $2 $3-$4");
      }else{
        formattedNumber = formattedNumber.replace(/(\d{2})(\d{4})(\d{4})/, "+54 $1 $2-$3");
      }
    }else formattedNumber = formattedNumber.slice(0, -1);
    return formattedNumber;
  }
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