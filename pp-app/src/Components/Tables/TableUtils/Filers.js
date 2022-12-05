import React from 'react'
import { useAsyncDebounce } from 'react-table'
import "../../../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

export function GlobalFilter({
    globalFilter,
    setGlobalFilter,
  }) {
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <label className="px-6 flex flex-row gap-x-2 w-fit items-baseline border rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <FontAwesomeIcon icon={faSearch} color="gray" className='pt-2' />
        <input
          type="text"
          className="rounded-md font-Pop-R text-base border-transparent focus:border-transparent focus:ring-0"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="Buscar transacción . . . ."
        />
      </label>
    )
  }
  
  export function TextSearchFilter({
    column: { filterValue, setFilter, render }
  }) {
    return (
      <div className="flex flex-row gap-x-2 items-baseline">
      <div className='text-gray-700 font-Pop-R'>{render("Header")}:</div>
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Buscar por ${(render("Header")).toLowerCase()}...`}
        className="p-2 rounded-md border-gray-300 font-Pop-R shadow-sm focus:ring-0 focus:border-gray-300"
      />
      </div>
    );
  }
  
  export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, render },
  }) {
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <label className="flex gap-x-2 items-baseline">
        <span className="text-gray-700 font-Pop-R">{render("Header")}: </span>
        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring-0"
          name={id}
          id={id}
          value={filterValue}
          onChange={e => {
            setFilter(e.target.value || undefined)
          }}
        >
          <option className={"font-Pop-R"} value="">Seleccionar</option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    )
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
      id
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
      <div>
        <input
          min={min.toISOString().slice(0, 10)}
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? val : undefined, old[1]])
          }}
          type="date"
          value={filterValue[0] || ''}
        />
        {' to '}
        <input
          max={max.toISOString().slice(0, 10)}
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? val.concat('T23:59:59.999Z') : undefined])
          }}
          type="date"
          value={filterValue[1]?.slice(0, 10) || ''}
        />
      </div>
    )
  }