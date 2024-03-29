import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/fontawesome-free-solid'
import { Popover } from '@headlessui/react'
import datesValues from "../../Values/datesValues";
import { useDashboardContext } from "../../Context/DashboardContext";

const FilterDate = (props) => {
  const { year, setYear, month, setMonth, setLoading } = useDashboardContext();

  const setFilter =(value, tittle) => {
    if (tittle === "Mes"){
      setLoading(true)
      setMonth(value);
    }else{
      setLoading(true)
      setYear(value);
    }
  }
  const getValue =(tittle) => {
    if (tittle === "Mes"){
      return month;
    }else{
      return year;
    }
  }
  
  return (
    <>
      <Popover className={"grid relative"}>
      <Popover.Button className="justify-self-end mx-10 lightgreyBgTranslucentHover h-fit py-3 rounded-full w-fit px-3 focus:ring-0 focus:outline-none focus:border-none" >
          <div className="justify-center flex z-50 space-x-4 overflow-hidden mx-auto lg:flex-row">
          <FontAwesomeIcon icon={faFilter} color="gray" size="xs"/>
          </div>
      </Popover.Button>
      <Popover.Panel className="p-10 absolute text-xs z-50 font-Pop-R top-0 -right-32 mt-12 p-3 rounded-lg almostWhiteBg grayBorder space-y-6 w-fit" >
          {datesValues.map((dataItem) => (
              <label className="flex gap-x-2 items-baseline">
              <span className="text-gray-700 font-Pop-R">{dataItem.tittle}</span>
              <select
                className="text-xs font-Pop-L rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring-0"
                name={dataItem.tittle}
                value={getValue(dataItem.tittle)}
                onChange={e => {
                  setFilter(e.target.value, dataItem.tittle)
                }}
              >
                <option className={"font-Pop-R text-xs"} value="">Seleccionar</option>
                { (dataItem.tittle==="Mes") ?
                <>
                {datesValues[0].options.map((option) => (
                  <option key={option.value} value={option.value} className={"font-Pop-R text-xs"}>
                    {option.label}
                  </option>
                ))}
                </>
                :
                <>
                {datesValues[1].options.map((option) => (
                  <option key={option.value} value={option.value} className={"font-Pop-R text-xs"}>
                    {option.label}
                  </option>
                ))}
                </>
               }
              </select>
            </label>
          ))}
      </Popover.Panel>
      </Popover>
    </>
  );
};

export default FilterDate;