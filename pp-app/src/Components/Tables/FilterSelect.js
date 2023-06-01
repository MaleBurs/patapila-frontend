import React from "react";
const FilterSelect = ({headerGroups, clearFilters}) => {
  return (
    <>
    <div className="rounded-md border darkGrayBorder bg-white flex flex-col space-y-6 py-8 px-10 ">
      <div className="font-Pop-R text-sm uppercase tracking-widest w-fit border-2 border-[#6c3333] rounded-3xl py-2 px-4 text-gray-500">Filtros</div>
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
      <button className="font-Pop-M tracking-widest text-xs text-[#6c3333] uppercase w-fit mt-3 py-2 px-4 mr-8 hover:bg-[#e7e6e649] hover:rounded-3xl" onClick={clearFilters}>Borrar filtros</button>
    </div>
    </>
  );
};
export default FilterSelect;