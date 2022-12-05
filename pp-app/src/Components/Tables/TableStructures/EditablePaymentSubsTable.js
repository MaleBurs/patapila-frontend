import React from 'react'
import { useEffect } from 'react'
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table'
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { Button, PageButton } from '../TableUtils/Buttons'
import { SortIcon, SortUpIcon, SortDownIcon } from '../TableUtils/Icons'
import InformationTooltips from "../../Utiles/InformationDisplayTooltip"
import { usePaymentManagerContext } from '../../../Context/PaymentManagerContext'
import PaymentManagerService from '../../../services/paymentManager.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import SubsNewPaymentTableInformation from '../TablesInformation/SubsNewPaymentTableInformation'
import Loading from '../../Utiles/Loading'
import "../../../App.css"

function EditablePaymentSubsTable({ columns, functionToLoadData }) {
  const {setSelectSugested, setEditionRow, setEditPayment, newPaymentAmount, setNewPaymentAmount, newPaymentUser, setNewPaymentUser,newPaymentUserOptions, newPaymentDate, setNewPaymentDate} = usePaymentManagerContext();
  const [addNewRow, setAddNewRow] = React.useState(false)
  const skipPageResetRef = React.useRef()
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
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    
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
    useSortBy,
    usePagination, 
  )
  useEffect(() => {
    skipPageResetRef.current = false
    functionToLoadData(20,0).then(res=>{
      res? setData(res.data) : setData();
    });
  }, [functionToLoadData]);

  useEffect(() => {
    setAddNewRow(false)
  }, []);

  useEffect(() => {
    setNewPaymentAmount(1)
  }, [setNewPaymentAmount, addNewRow]);

  useEffect(() => {
    setNewPaymentUser(newPaymentUserOptions[0]);
  }, [addNewRow, setNewPaymentUser]);

  useEffect(() => {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    setNewPaymentDate(`${year}-${month}-${day}`);
  }, [addNewRow, setNewPaymentDate]);

  const handleMoreData = (e) =>{
    skipPageResetRef.current = true
    functionToLoadData(10,20).then(res=>{
      res? setData(data.concat(res.data)) : setData(emptyRows)
    });
    nextPage();
  };

  const addNewPayment = () =>{
    if (newPaymentAmount !== 0) {
      PaymentManagerService.createPaymentSubs(newPaymentUser.value, newPaymentAmount, newPaymentDate).then(res=>{setAddNewRow(false)});
    }
  }

  const triggerRowEdition = (row) =>{
    setEditPayment(true);
    setEditionRow(row.original);
    console.log(row)
  }

  const emmitPayments = () =>{
    var amounts = data.map((item) => item.amount);
    if(amounts.every(val=> val>0)) {
      data.forEach((item) => {
        PaymentManagerService.emmitPaymentSubs(item.id).then(res=>{setAddNewRow(false)});
        window.location.reload();
      })
    }
  }

  const deletePaymentSubs = (row) =>{
    PaymentManagerService.deletePaymentSubs(row.original.id).then(window.location.reload());
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col space-y-14'>
        <div className='bg-white rounded-xl shadow-sm px-10 py-6 darkGrayBorder'>
          
          <div className="flex flex-row justify-start space-x-4"> 
            <button onClick={()=> setAddNewRow(true)} className="bg-gray-400 text-sm font-Pop-R tracking-[0.2px] text-base text-white py-2 px-4 rounded-md">Nuevo Cobro</button>
            <button onClick={()=>setSelectSugested(true)} className="flex flex-row bg-gray-300 text-sm font-Pop-R tracking-[0.2px] text-base text-white py-2 px-4 rounded-md">
              Agregar Cobros Sugeridos
              <InformationTooltips.InstructionTooltip tooltipContent="Dar click en 'Agregar Cobros Sugeridos' para agregar, visualizar y así modificar los cobros sugeridos por el sistema." size="h-3 w-3 -mt-3"/>
            </button>
          </div>

          {/* table */}
          <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                {addNewRow ?
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 mb-5">
                    <thead className="lighterGreyBg">
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {SubsNewPaymentTableInformation.columns.map(cell => {
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
                        {SubsNewPaymentTableInformation.columns.map(cell => {
                          return (
                            <td
                              className="px-6 py-2 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.Cell === "defaultRenderer"
                                ? <div className="text-xs text-gray-500 font-Pop-L">{cell.value}</div>
                                : cell.Cell
                              } 
                            </td>
                          )
                        })}
                        <td className='flex flex-row space-x-3 py-3'>
                          <button onClick={addNewPayment} className="bg-gray-400 text-sm font-Pop-R tracking-[0.2px] text-base text-white py-2 px-4 rounded-md">Agregar</button>
                          <button onClick={()=>setAddNewRow(false)} className="bg-gray-300 text-sm font-Pop-R tracking-[0.2px] text-base text-white py-2 px-4 rounded-md">Cancelar</button>
                        </td>
                      </tr>
                    </tbody>
                </table>
                : null}

                  <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                    <thead className="lighterGreyBg">
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th
                              scope="col"
                              className="group px-6 py-3 text-left text-sm font-Pop-R text-gray-500 uppercase"
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                            >
                              <div className="flex items-center justify-between">
                                {column.render('Header')}
                                <span>
                                  {column.isSorted
                                    ? column.isSortedDesc
                                      ? <SortDownIcon className="w-3 h-3 text-gray-400" />
                                      : <SortUpIcon className="w-3 h-3 text-gray-400" />
                                    : (
                                      <SortIcon className="w-3 h-3 text-gray-400" />
                                    )}
                                </span>
                              </div>
                            </th>
                          ))
                          
                          }
                          <th
                              scope="col"
                              className="group px-6 py-3 text-left text-sm font-Pop-R text-gray-500 uppercase"
                            ></th>
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      className="bg-white divide-y divide-gray-200"
                    >  
                    {data.length > 0 && data[0].id !== "" &&
                      page.map((row, i) => {  // new
                        prepareRow(row)
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  className="px-6 py-2 whitespace-nowrap"
                                  role="cell"
                                >
                                  {cell.column.Cell.name === "defaultRenderer"
                                    ? <div className="text-xs text-gray-500 font-Pop-L">{cell.render('Cell')}</div>
                                    : cell.render('Cell')
                                  }
                                </td>
                              )
                            })}
                            <td className='flex flex-row'>
                              <button onClick={()=>triggerRowEdition(row)} className="py-4 px-4 text-[#7BA391]"> <FontAwesomeIcon icon={faEdit} color="#7BA391" className='' /></button>
                              <button onClick={()=>deletePaymentSubs(row)} className="text-base font-Pop-M py-4 px-4 text-[#7BA391] hover:text-[#CC3300] focus:text-[#CC3300] duration-3 duration-3">x</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                  {data.length > 0 && data[0].id === "" ?
                     <div className='w-full text-center py-8 font-Pop-R text-sm text-gray-400'>
                      <Loading/>
                     </div>
                    : null
                  }
                  {data.length > 0 ?
                    null
                    :
                    <div className='w-full text-center py-8 font-Pop-R text-sm text-gray-400'>No hay Cobros a Emitir. Agregue cobros sugeridos o realize un nuevo cobro.</div>
                  }
                </div>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Anterior</Button>
              <Button onClick={() => nextPage()} disabled={!canNextPage}>Siguiente</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="flex gap-x-2 items-baseline space-x-4">
                <span className="text-xs font-Pop-R text-gray-700">
                  Page <span className="font-Pop-R text-xs">{state.pageIndex + 1}</span> of <span className="font-Pop-R text-xs">{pageOptions.length}</span>
                </span>
                <label>
                  <span className="sr-only">Items Per Page</span>
                  <select
                    className="mt-1 block w-full font-Pop-L text-xs rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring-0"
                    value={state.pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value))
                    }}
                  >
                    {[5, 10, 20].map(pageSize => (
                      <option key={pageSize} value={pageSize} className="">
                        Mostrar {pageSize}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <PageButton
                    className="rounded-l-md"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <span className="sr-only">First</span>
                    <ChevronDoubleLeftIcon className="h-3 w-3 text-gray-400" aria-hidden="true" />
                  </PageButton>
                  <PageButton
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <span className="sr-only">Anterior</span>
                    <ChevronLeftIcon className="h-3 w-3 text-gray-400" aria-hidden="true" />
                  </PageButton>
                  <PageButton
                    onClick={() => handleMoreData()}
                    disabled={!canNextPage
                    }>
                    <span className="sr-only">Siguiente</span>
                    <ChevronRightIcon className="h-3 w-3 text-gray-400" aria-hidden="true" />
                  </PageButton>
                  <PageButton
                    className="rounded-r-md"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <span className="sr-only">Last</span>
                    <ChevronDoubleRightIcon className="h-3 w-3 text-gray-400" aria-hidden="true" />
                  </PageButton>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end"> 
            <button onClick={emmitPayments} className="bg-[#7BA391] text-sm font-Pop-M tracking-[0.4px] text-base text-white py-3 px-4 rounded-md">Emitir Cobros</button>       
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditablePaymentSubsTable;