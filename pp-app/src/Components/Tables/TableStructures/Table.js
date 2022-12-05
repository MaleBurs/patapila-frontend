import React, { useState } from 'react'
import { useEffect } from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { Button, PageButton } from '../TableUtils/Buttons'
import { SortIcon, SortUpIcon, SortDownIcon } from '../TableUtils/Icons'
import FilterSelect from '../TableUtils/FilterSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faChevronUp } from '@fortawesome/fontawesome-free-solid'
import "../../../App.css"
import { GlobalFilter } from '../TableUtils/Filters'

function Table({ columns, functionToLoadData }) {
  const skipPageResetRef = React.useRef()
  const [offset, setOffset] = useState(0)
  const emptyRows = [{
  id: "",
  userId: "",
  monto: "",
  modo: "",
  fechaPago: '',
  estado: ""}];
  const [data, setData] = React.useState(emptyRows)
  const [showFilterPanel , setShowFilterPanel] = useState(false)
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
    setAllFilters,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    
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
    useFilters, 
    useGlobalFilter,
    useSortBy,
    usePagination, 
  )

  useEffect(() => {
    skipPageResetRef.current = false
    functionToLoadData(20,0).then(res=>{
      res? setData(res.data) : setData();
    });
    setOffset(20)
  }, [functionToLoadData]);

  const handleMoreData = (e) =>{
    skipPageResetRef.current = true
    functionToLoadData(10,offset).then(res=>{
      res? setData(data.concat(res.data)) : setData(emptyRows)
    });
    nextPage();
    setOffset(offset+10)
  }

  return (
    <div className='space-y-6'>
      <div className="flex justify-between sm:gap-x-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        {!showFilterPanel ?
          <button className="justify-self-end lightgreyBgTranslucentHover rounded-3xl md:rounded-xl lg:basis-2/7 w-fit py-2 px-5 focus:ring-0">
            <div className="justify-center flex z-50 space-x-4 overflow-hidden mx-auto lg:flex-row">
                <FontAwesomeIcon icon={faFilter} color="gray" onClick={()=> setShowFilterPanel(true)}/>
                </div>
            </button>
            :
            <button className="justify-self-end lightgreyBgTranslucentHover rounded-3xl md:rounded-xl lg:basis-2/7 w-fit py-2 px-5 focus:ring-0">
              <div className="justify-center flex z-50 space-x-4 overflow-hidden mx-auto lg:flex-row">
                <FontAwesomeIcon icon={faChevronUp} color="gray" onClick={()=> setShowFilterPanel(false)}/>
                </div>
            </button>
          }
        
      </div>
      <div className='flex flex-col space-y-14'>
        {showFilterPanel ?
        <FilterSelect headerGroups={headerGroups} clearFilters={() => setAllFilters([])}/>
        : null
        }
        <div className='bg-white rounded-xl shadow-sm px-10 py-6 darkGrayBorder'>
          {/* table */}
          <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      className="bg-white divide-y divide-gray-200"
                    >
                      {page.map((row, i) => {  // new
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
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
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
        </div>
      </div>
    </div>
  )
}

export default Table;