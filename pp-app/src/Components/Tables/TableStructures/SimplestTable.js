import React from 'react'
import { useEffect } from 'react'
import { useTable } from 'react-table'
import "../../../App.css"
import InformationTooltips from '../../Utiles/InformationDisplayTooltip'
import { usePaymentManagerContext } from '../../../Context/PaymentManagerContext'
import PaymentManagerService from '../../../services/paymentManager.service'

function SimplestTable({ columns }) {
  const skipPageResetRef = React.useRef()
  const {editionRow, setEditPayment} = usePaymentManagerContext()
  const emptyRows = [{
  id: "",
  userId: "",
  monto: "",
  modo: "",
  fechaPago: '',
  estado: ""}];
  const [data, setData] = React.useState(emptyRows)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
  } = useTable({
    columns,
    data,
    autoResetPage: !skipPageResetRef.current,
    autoResetExpanded: !skipPageResetRef.current,
    autoResetGroupBy: !skipPageResetRef.current,
    autoResetSelectedRows: !skipPageResetRef.current,
    autoResetSortBy: !skipPageResetRef.current,
    autoResetFilters: !skipPageResetRef.current,
    autoResetRowState: !skipPageResetRef.current,
  },
  )
  useEffect(() => {
    setData(emptyRows)
  }, []);

  const modifyPayment = () =>{
    PaymentManagerService.modifyPaymentSubs(editionRow.amount, editionRow.paymentDate, editionRow.id);
    setEditPayment(false);
  }

  return (
    <div className="mt-4 flex flex-col">
    <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 mb-5">
            <thead className="lighterGreyBg">
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {columns.map(cell => {
                    return (
                    <th scope="col" className="group px-6 py-3 text-left text-sm font-Pop-R text-gray-500 uppercase">
                        {cell.Description===""
                        ? <>{cell.Header}</>
                        : 
                        <div className='flex flex-row'>
                            <div>{cell.Header}</div>
                            <InformationTooltips.InstructionTooltip tooltipContent={cell.Description} size="h-3 w-3 -mt-3 justify-self-end"/>
                        </div>
                        } 
                    </th>
                    )
                    })}
                    <th scope="col" className="group px-6 py-3 text-left text-sm font-Pop-R text-gray-500 uppercase"></th>
                </tr>
                ))}
            </thead>
            <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
            >
                <tr>                        
                {columns.map(cell => {
                    const cellAccesor = cell.accessor
                    return (
                    <td
                        className="px-6 py-2 whitespace-nowrap"
                        role="cell"
                    >
                        {cell.Cell === "defaultRenderer"
                        ? <div className="text-xs text-gray-500 font-Pop-L">
                            {editionRow[cellAccesor]}
                           </div>
                        : cell.Cell
                        } 
                    </td>
                    )
                })}
                </tr> 
            </tbody>
        </table>
        </div>
        </div>
        <div className="flex flex-row justify-end space-x-4 my-2 px-10"> 
            <button onClick={()=>setEditPayment(false)} className="bg-gray-300 text-sm font-Pop-M tracking-[0.4px] text-base text-white py-2 px-4 rounded-md">Cancelar</button>
            <button onClick={()=>modifyPayment()} className="bg-gray-400 text-sm font-Pop-M tracking-[0.4px] text-base text-white py-2 px-4 rounded-md">Guardar Cambios</button>              
        </div>
    </div>
    </div>
  )
}

export default SimplestTable;