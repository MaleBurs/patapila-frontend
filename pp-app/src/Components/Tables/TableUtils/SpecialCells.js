import { classNames } from './Utils'
import { useSelectionOnTable} from '../../../Context/SelectionsOnTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminServices from '../../../services/transactions.service'
import AuthService from '../../../services/auth.service';
import { useState, useEffect } from 'react';
import InformationTooltips from '../../Utiles/InformationDisplayTooltip';
import ModalWithConfirmation from '../../Utiles/ModalWithConfirmation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Select from 'react-select';
import { usePaymentManagerContext } from '../../../Context/PaymentManagerContext';

export function OpenSideBarFromUser({value, row}){
  const {setSelectedUser, setShowSidebar} = useSelectionOnTable();
  const [user, setUser] = useState(null)
  useEffect(() => {
    AuthService.findUserById(parseInt(value)).then(res=>setUser(res.data))
  }, [value])
  
  return(
    <button 
      className="text-xs flex flex-row text-gray-500 font-Pop-L hover:decoration-gray-500 hover:underline hover:underline-offset-4" 
      onClick={()=>{setShowSidebar(true); setSelectedUser(value)}}>
      <div>{user ? user.email : value}</div>
      {(row.id ==='0') ? 
        <div className='ml-1'><InformationTooltips.InstructionTooltip size="h-2 w-2" tooltipContent="Haz click aquí o en cualquier email para obtener más información acerca de el usuario."/></div>
        : <></>}
    </button>
  );
}
export function StatusPillTransactions({ value, row }) {
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const status = value ? value.toLowerCase() : "unknown";
    const updateState = async (state) =>{
      await AdminServices.modifyTransactionState(row.original.id,state)
      window.location.reload()
    }

    return (
      <div
        className={
          classNames(
            "px-3 py-1 uppercase w-fit font-Pop-M text-xs rounded-full",
            status.startsWith("a") ? "bg-[#0f693849] text-gray-800" : null,
            status.startsWith("p") ? "bg-gray-100 text-gray-800" : null,
            status.startsWith("r") ? "bg-[#eb820144] text-gray-800" : null,
          )
        }
      >
        {(status==="a") 
        ? "Aceptada" 
        : ((status==="p") 
        ? "Pendiente"
        : ((status==="r") 
        ? "Rechazada"
        : "")
        )}
        {(status ==="p") && (
        <>
        <FontAwesomeIcon className='px-4' onClick={() => setShowAcceptModal(true)} icon={"fa fa-check"} color='#000' size={14} />
        <FontAwesomeIcon onClick={() => setShowRejectModal(true)} icon={"fa fa-ban"} color='#000' size={14} />
        {
          showAcceptModal && ( <ModalWithConfirmation onChange={()=>setShowAcceptModal(false)} title="¿Estás seguro de que quieres aceptar esta transacción?" content="Una vez aceptada, no podrás revertir el cambio." saveChanges={()=>{updateState("A"); setShowAcceptModal(false)}} cancelButton={"Cancelar"} saveButton={"Aceptar"}/>)
        }
        {
          showRejectModal && ( <ModalWithConfirmation onChange={()=>setShowRejectModal(false)} title="¿Estás seguro de que quieres rechazar esta transacción?" content="Una vez rechazada, no podrás revertir el cambio." saveChanges={()=>{updateState("R"); setShowRejectModal(false)}} cancelButton={"Cancelar"} saveButton={"Rechazar"}/>)
        }
        </>
      )}
      </div>
    );
  };

export function StatusPillSubscriptions({ value }) {
    const status = value ? value.toLowerCase() : "unknown";
    return (
      <div
        className={
          classNames(
            "px-3 py-1 uppercase w-fit font-Pop-M text-xs rounded-full",
            status.startsWith("a") ? "bg-[#0f693849] text-gray-800" : null,
            status.startsWith("p") ? "bg-gray-100 text-gray-800" : null,
            status.startsWith("c") ? "bg-[#eb820144] text-gray-800" : null,
          )
        }
      >
        {(status==="a") 
        ? "Activa" 
        : ((status==="p") 
        ? "Pausada"
        : ((status==="c") 
        ? "Cancelada"
        : "")
        )}
      </div>
    );
  };

export function PaymentFrecuency({ value }) {
    return (
      <div
        className="text-xs text-gray-500 font-Pop-L"
      >
         {(value===1) 
        ? '1 vez al mes'
        : ((value===2) 
        ? '1 vez cada 3 meses'
        : ((value===3) 
        ? '1 vez cada 6 meses'
        :((value===4)
        ?  '1 vez cada 1 año'
        : ""
        ))
        )}
      </div>
    );
};

export function EditableAmmount({ value }) {
  const [ selectedAmount, setSelectedAmount ] = useState(value)

  const onChange = (event) => {
    console.log(event)
    var amount = parseInt(event.target.value)
    amount = ((isNaN(amount) ) ? 0 : amount);
    setSelectedAmount(amount)
  }
  useEffect(() => {
    setSelectedAmount(value)
  }, [value])
  
  return (
    <div className='flex flex-col'>
      {selectedAmount===0 ? <div className='text-xs z-10 ml-2 -mt-2 bg-white w-fit text-[#CC3300] font-Pop-L'>Debe ser mayor a cero</div> : null}
      <input
        type='text'
        autoFocus
        onChange={onChange}
        value = {selectedAmount}
        className={`text-xs text-gray-500 font-Pop-L rounded-xl border-gray-300 focus:outline-none focus:border-gray-300 focus:ring-0 py-2.5 ${selectedAmount===0 ? '-mt-2' : ''}`}>
      </input>
    </div>

  );
};

export function EditableAmmountForNewPayment({ value }) {
  const {newPaymentAmount, setNewPaymentAmount} = usePaymentManagerContext()

  const onChange = (event) => {
    var amount = parseInt(event.target.value)
    amount = ((isNaN(amount) ) ? 0 : amount);
    setNewPaymentAmount(amount)
  }
  
  return (
    <div className='flex flex-col'>
      {newPaymentAmount===0 ? <div className='text-xs z-10 ml-2 -mt-2 bg-white w-fit text-[#CC3300] font-Pop-L'>Debe ser mayor a cero</div> : null}
      <input
        type='text'
        autoFocus
        onChange={onChange}
        value = {newPaymentAmount}
        className={`text-xs text-gray-500 font-Pop-L rounded-xl border-gray-300 focus:outline-none focus:border-gray-300 focus:ring-0 py-2.5 ${newPaymentAmount===0 ? '-mt-2' : ''}`}>
      </input>
    </div>

  );
};

export function SelectUser({ value }) {
  const {newPaymentUser, setNewPaymentUser, setNewPaymentUserOptions, newPaymentUserOptions} = usePaymentManagerContext()
  const onChange = (e) => {
    setNewPaymentUser(e);
  };
  useEffect(() => {
    AuthService.findAllUsers().then(
      (response)=> {
        setNewPaymentUserOptions(Array.from(response.data, completeUser => ({value:completeUser.id , label:completeUser.email})))
    });
  }, [])
  
  const colourStyles = {
    control: (base, state) => ({
      ...base,
      background: "white",
      backgroundColor: "white",
      '&:hover': { borderColor: '#D1D5DB' }, 
            border: '1px solid #D1D5DB',
            borderRadius: '0.8rem', 
            boxShadow: 'none', 
  }),
    option: (styles, { data, isDisabled, isFocused, isSelected}) => {
      return {
        ...styles,
        color: isSelected ? "gray" : 'gray',
      backgroundColor: isDisabled
        ? "white"
        : isSelected
        ? "#f5f8f2"
        : isFocused
        ? "#f5f8f2"
        : "white",
      padding: 8,
      cursor: isDisabled ? 'not-allowed' : 'default',
      
      };
    },
    placeholder: (styles) => ({ ...styles}),
    singleValue:(styles, { data }) => ({
      ...styles,
      color: "gray",
      padding: 2,
    }),
  };
  
  return (
    <Select className="border-gray-300 bg-transparent placeholder-gray-600 focus:z-10 font-Pop-R text-xs focus:outline-none greenBorderWhenFocus" styles={colourStyles} 
    options={newPaymentUserOptions}
    value={newPaymentUser} 
    placeholder="Usuario"
    onChange={onChange}
    isSearchable={false}/>
  );
};

export function SelectableDate({ value, row }) {
  const [paymentDay, setPaymentDay] = useState(value)
  return (
    <div className="md:basis-1/2"> 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          disabled = {false}
          inputFormat="YYYY-MM-DD"
          value={paymentDay}
          onChange={(newPaymentDay) => {
            setPaymentDay(newPaymentDay.format("YYYY-MM-DD"));
          }}
          inputProps={{readOnly: true}}
          className="border-red"
          renderInput={(params) => 
          <TextField {...params}
            className="myDatePicker"
            sx={{
                '.MuiInputBase-input': {
                padding: 1.5,
                marginLeft: 1,
                fontFamily: "Poppins-Light",
                color: "gray-500", 
                fontSize: "0.73rem",
                border: "none"
              

            },
            }}
          />}
          views = {["day"]}
          showDaysOutsideCurrentMonth
          
          />
      </LocalizationProvider>
    </div>
  );
};

export function SelectableDateForNewPayment({ value, row }) {
  const {newPaymentDate, setNewPaymentDate} = usePaymentManagerContext()
  
  return (
    <div className="md:basis-1/2"> 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          disabled = {false}
          inputFormat="YYYY-MM-DD"
          value={newPaymentDate}
          onChange={(newPaymentDay) => {
            setNewPaymentDate(newPaymentDay.format("YYYY-MM-DD"));
          }}
          inputProps={{readOnly: true}}
          className="border-red"
          renderInput={(params) => 
          <TextField {...params}
            className="myDatePicker"
            sx={{
                '.MuiInputBase-input': {
                padding: 1.5,
                marginLeft: 1,
                fontFamily: "Poppins-Light",
                color: "gray-500", 
                fontSize: "0.73rem",
                border: "none"
              

            },
            }}
          />}
          views = {["day"]}
          showDaysOutsideCurrentMonth
          
          />
      </LocalizationProvider>
    </div>
  );
};

export function TransactionType({ value }) {
    return (
      <div
        className="text-xs text-gray-500 font-Pop-L"
      >
         {(value==="onlyTime") 
        ? 'donación de una única vez'
        : ((value==="recurrent") 
        ? 'suscripción'
        : ""
        )}
        
      </div>
    );
}