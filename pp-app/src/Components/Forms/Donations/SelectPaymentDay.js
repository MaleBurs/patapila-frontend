import React, {useEffect} from "react"
import {useSubscriptionPeriod} from  '../../../Context/SubscriptionContext'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const SelectPaymentDay = (props) => {
  const { paymentDay, setPaymentDay} = useSubscriptionPeriod()

  useEffect(() => {
    setPaymentDay(props.initialValue);
  },[props.initialValue, setPaymentDay])

    return (
      <div className="space-y-3">
      <div className="font-Pop-R text-xs tracking-widest text-gray-500">
        {props.explanationText}     
      </div>
      <div className="md:flex md:flex-row">
            <div className="md:basis-1/2 rounded-md border border-[#e7e6e6]"> 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      className="date-picker myDatePicker"
                      disabled = {props.disabled}
                      disablePast
                      inputFormat="YYYY-MM-DD"
                      value={paymentDay}
                      onChange={(newPaymentDay) => {
                        setPaymentDay(newPaymentDay.format("YYYY-MM-DD"));
                      }}
                      inputProps={{readOnly: true}}
                      renderInput={(params) => 
                      <TextField {...params}
                        sx={{
                           '.MuiInputBase-input': {
                            padding: 1.3,
                            marginLeft: 1,
                            fontFamily: "Poppins-SemiB",
                            color: "#6c3333", 
                            fontSize: "0.75rem",
                            letterSpacing: ".1em",
                        },
                        }}
                      />}
                      views = {["day"]}
                      showDaysOutsideCurrentMonth
                     
                      />
                  </LocalizationProvider>
                </div>
            </div>
      </div>
    )
  }
  
  export default SelectPaymentDay