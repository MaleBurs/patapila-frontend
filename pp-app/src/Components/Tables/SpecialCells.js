import { classNames } from './Utils'
import { useSelectionOnTable} from '../../Context/SelectionsOnTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminServices from '../../services/transactions.service'
import AuthService from '../../services/auth.service';
import { useState, useEffect } from 'react';
import InformationTooltips from '../Utiles/InformationDisplayTooltip';

export function OpenSideBarFromUser({value, row}){
  const {setSelectedUser, setShowSidebar} = useSelectionOnTable();
  const [user, setUser] = useState(null)
  useEffect(() => {
    console.log(value);
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
    const status = value ? value.toLowerCase() : "unknown";
    const updateState = async (state) =>{
      await AdminServices.modifyTransactionState(row.original.id,state)
      window.location.reload()}

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
        <FontAwesomeIcon className='px-4' onClick={() => updateState("A")} icon={"fa fa-check"} color='#000' size={14} />
        <FontAwesomeIcon onClick={() => updateState("R")} icon={"fa fa-ban"} color='#000' size={14} />
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

export function TransactionType({ value }) {
    return (
      <div
        className="text-xs text-gray-500 font-Pop-L"
      >
         {(value==="onlyTime") 
        ? 'donación de una única vez'
        : ((value==="recurrent") 
        ? 'subscripción'
        : ""
        )}
        
      </div>
    );
}