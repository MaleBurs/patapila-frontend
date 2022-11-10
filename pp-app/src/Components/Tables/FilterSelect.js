import React from "react";
const FilterSelect = ({headerGroups, clearFilters}) => {
  return (
    <>
    <div className="rounded-xl border darkGrayBorder bg-white flex flex-col space-y-6 py-8 px-10 ">
      <div className="font-Pop-M text-xl text-gray-500">Filtros</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6">
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
              column.Filter ? (
                <div className="px-2 mr-6" key={column.id}>
                  {column.render("Filter")}
                </div>
              ) : null
            )
          )}
      </div>
      <button className="font-Pop-M text-sm greenText uppercase w-full text-end" onClick={clearFilters}>Borrar filtros</button>
    </div>
    </>
  );
};
export default FilterSelect;