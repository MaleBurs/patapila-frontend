import { useAsyncDebounce } from 'react-table'
import "../../../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import Inputs from '../../Utiles/Inputs'
import React, { useState, useEffect } from 'react';
import Labels from '../../Utiles/Labels'

const capitalizeFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function GlobalFilter({
    globalFilter,
    setGlobalFilter,
  }) {
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <label className="px-6 py-1 bg-white flex flex-row gap-x-2 w-fit items-baseline border rounded-xl border-[#f3f1f1] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <FontAwesomeIcon icon={faSearch} color="gray" className='pt-1' size='2' />
        <Inputs.BoxInput 
        value={value || ""}
        onChange={value => {
          setValue(value);
          onChange(value);
        }}
        placeholder="Buscar . . . ."/>
      </label>
    )
  }
  
export function NumberSearchFilter({
  column: { filterValue, setFilter, render }
}) {
  return (
    <div className='flex flex-col '>
    <Labels.FilterLabel text= {"Filtrar según el " + (render("Header").toLowerCase())}></Labels.FilterLabel>
    <div className="flex flex-row items-baseline">
    <Inputs.BottomLineNumberInput
        id="standard-search" 
        placeholder={capitalizeFirst((render("Header")).toLowerCase())}
        value={filterValue || ""}
        onChange={(value) => {
          setFilter(value || undefined); 
        }}
      />
    </div>
    </div>
  );
}
  
export function SelectModoFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const noValueSelected = {value:"Modo", label:"Modo"};
  const [shownSelection, setShownSelection] = useState(noValueSelected);
  const options = React.useMemo(() => {
    const optionsSet = new Set()
    const options = []
    preFilteredRows.forEach(row => {
      optionsSet.add(row.values[id])
    })
    optionsSet.forEach(row => {
      determineLabelOfState(row, options)
    })
    return [...options.values()]
  }, [id, preFilteredRows]);

  useEffect(() => {
    if (!filterValue) setShownSelection({value: "Modo", label:"Modo"}) ;
  }, [filterValue])
  
  return (
    <>
    <div className='flex flex-col '>
      <Labels.FilterLabel text= {"Filtrar según el " + (render("Header").toLowerCase())}></Labels.FilterLabel>
    <Inputs.SelectInput  
                      options={options}
                      value={shownSelection} 
                      placeholder={capitalizeFirst((render("Header")).toLowerCase())}
                      onChange={e => {
                        setShownSelection({value: e.value, label: e.value});
                        setFilter(e.value || undefined);
                      }}/>
    </div>
    </>
  )
  function determineLabelOfState(row, options) {
    if (row === "onlyTime")
      options.push({ value: row, label: "Donaciones de una única vez" })
    if (row === "recurrent")
      options.push({ value: row, label: "Transacciones generadas por suscripciones" })}
}

export function SelectStateFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const noValueSelected = {value: "Estado", label:"Estado"};
  const [shownSelection, setShownSelection] = useState(noValueSelected);
  const options = React.useMemo(() => {
    const optionsSet = new Set()
    const options = []
    preFilteredRows.forEach(row => {
      optionsSet.add(row.values[id])
    })
    optionsSet.forEach(row => {
      determineLabelOfState(row, options)
    })
    return [...options.values()]
  }, [id, preFilteredRows]);

  useEffect(() => {
    if (!filterValue) setShownSelection({value: "Estado", label:"Estado"}) ;
  }, [filterValue])
  
  return (
    <>
    <div className='flex flex-col '>
    <Labels.FilterLabel text= {"Filtrar según el " + (render("Header").toLowerCase())}></Labels.FilterLabel>
    <Inputs.SelectInput  
                options={options}
                value={shownSelection} 
                placeholder={capitalizeFirst((render("Header")).toLowerCase())}
                onChange={e => {
                  setShownSelection({value: e.value, label: e.value});
                  setFilter(e.value || undefined);
                }}/>
    </div>
    </>
  )

  function determineLabelOfState(row, options) {
    if (row === "A")
      options.push({ value: row, label: "Aceptada" })
    if (row === "P")
      options.push({ value: row, label: "Pendiente" })
    if (row === "R")
      options.push({ value: row, label: "Rechazada" })
  }
}

export function SelectStateFilterSubscriptions({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const noValueSelected = {value: "Estado", label:"Estado"};
  const [shownSelection, setShownSelection] = useState(noValueSelected);
  const options = React.useMemo(() => {
    const optionsSet = new Set()
    const options = []
    preFilteredRows.forEach(row => {
      optionsSet.add(row.values[id])
    })
    optionsSet.forEach(row => {
      determineLabelOfState(row, options)
    })
    return [...options.values()]
  }, [id, preFilteredRows]);

  useEffect(() => {
    if (!filterValue) setShownSelection({value: "Estado", label:"Estado"}) ;
  }, [filterValue])
  
  return (
    <>
    <div className='flex flex-col '>
    <Labels.FilterLabel text= {"Filtrar según el " + (render("Header").toLowerCase())}></Labels.FilterLabel>
    <Inputs.SelectInput  
                options={options}
                value={shownSelection} 
                placeholder={capitalizeFirst((render("Header")).toLowerCase())}
                onChange={e => {
                  setShownSelection({value: e.value, label: e.value});
                  setFilter(e.value || undefined);
                }}/>
    </div>
    </>
  )

  function determineLabelOfState(row, options) {
    if (row === "A")
      options.push({ value: row, label: "Activa" })
    if (row === "P")
      options.push({ value: row, label: "Pausada" })
    if (row === "C")
      options.push({ value: row, label: "Cancelada" })
  }
}

export function dateBetweenFilterFn(rows, id, filterValues) {
    const sd = filterValues[0] ? new Date(filterValues[0]) : undefined
    const ed = filterValues[1] ? new Date(filterValues[1]) : undefined

    if (ed || sd) {
      return rows.filter(r => {
        const cellDate = new Date(r.values[id])
        let result
        if (ed && sd) {
          result = cellDate >= sd && cellDate <= ed
        } else if (sd){
          result = cellDate >= sd
        } else if (ed){
          result = cellDate <= ed
        }
        return result
      })
    } else {
      return rows
    }
}

export function DateRangeColumnFilter({
    column: {
      filterValue = [],
      preFilteredRows,
      setFilter,
      id,
      render
    }})
  {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)
      let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)
  
      preFilteredRows.forEach(row => {
        const rowDate = new Date(row.values[id])
  
        min = rowDate <= min ? rowDate : min
        max = rowDate >= max ? rowDate : max
      })
  
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div className='flex flex-col '>
      <Labels.FilterLabel text= {"Filtrar según la " + (render("Header").toLowerCase())}></Labels.FilterLabel>
      <div className = "flex flex-row grid-cols-5 space-x-4">
        <Inputs.BottomLineDateInput
          min={min.toISOString().slice(0, 10)}
          onChange={val => {
            setFilter((old = []) => [val ? val : undefined, old[1]])
          }}
          value={filterValue[0] || ''}
        />
         <div className='text-center' style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: "gray", marginTop: 18}}> a </div>
        <Inputs.BottomLineDateInput
          max={max.toISOString().slice(0, 10)}
          onChange={val => {
            setFilter((old = []) => [old[0], val ? val.concat('T23:59:59.999Z') : undefined])
          }}
          value={filterValue[1]?.slice(0, 10) || ''}
        />
      </div>
      </div>
    )
}

export function amountBetweenFilterFn(rows, id, filterValues) {
const sd = filterValues[0] ? filterValues[0] : undefined
const ed = filterValues[1] ? filterValues[1] : undefined

if (ed || sd) {
    return rows.filter(r => {
    const cellAmount = r.values[id]
    let result
    if (ed && sd) {
        result = cellAmount >= sd && cellAmount <= ed
    } else if (sd){
        result = cellAmount >= sd
    } else if (ed){
        result = cellAmount <= ed
    }
    return result
    })
} else {
    return rows
}
} 

export function AmountRangeColumnFilter({
    column: {
      filterValue = [],
      setFilter,
      render,
    }})
  {
    return (
      <div className='flex flex-col '>
      <Labels.FilterLabel text= {"Filtrar según el " + (render("Header").toLowerCase())}></Labels.FilterLabel>
      <div className="grid grid-cols-5">
        <Inputs.BottomLineNumberInput
          placeholder="Monto"
          value={filterValue[0] || ''}
          onChange={val => {
            setFilter((old = []) => [val ? val : undefined, old[1]])
          }} 
        />
        <div className="text-center" style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: "gray", marginTop: 18}}> y </div>
        <Inputs.BottomLineNumberInput
          placeholder="Monto"
          value={filterValue[1] || ''}
          onChange={val => {
            setFilter((old = []) => [old[0], val ? val : undefined])
          }}
        />
      </div>
      </div>
    )
}

export function SelectPeriodicidadFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const noValueSelected = {value:"Frecuencia de pago", label:"Frecuencia de pago"};
  const [shownSelection, setShownSelection] = useState(noValueSelected);
  const options = React.useMemo(() => {
    const optionsSet = new Set()
    const options = []
    preFilteredRows.forEach(row => {
      optionsSet.add(row.values[id])
    })
    optionsSet.forEach(row => {
      determineLabelOfState(row, options)
    })
    return [...options.values()]
  }, [id, preFilteredRows]);

  useEffect(() => {
    if (!filterValue) setShownSelection({value: "Frecuencia de pago", label:"Frecuencia de pago"}) ;
  }, [filterValue])
  
  return (
    <>
    <div className='flex flex-col '>
      <Labels.FilterLabel text= {"Filtrar según la " + (render("Header").toLowerCase())}></Labels.FilterLabel>
    <Inputs.SelectInput  
                      options={options}
                      value={shownSelection} 
                      placeholder={capitalizeFirst((render("Header")).toLowerCase())}
                      onChange={e => {
                        setShownSelection({value: e.value, label: e.value});
                        setFilter(e.value || undefined);
                      }}/>
    </div>
    </>
  )
   function determineLabelOfState(row, options) {
    if (row === 1)
      options.push({ value: row, label: "1 vez al mes" })
    if (row === 2)
      options.push({ value: row, label: "1 vez cada 3 meses" })
    if (row === 3)
      options.push({ value: row, label: "1 vez cada 6 meses" })
    if (row === 4)
      options.push({ value: row, label: "1 vez cada 1 año" })
  }
}
