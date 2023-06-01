export function SideBar(showSideBar, setShowSideBar, navigate, setToggleDropdown, toggleDropdown, logOut) {
    return <div  className={`bg-white rounded-br-md z-20 absolute h-fit w-64 top-20 left-0 transform transition-transform duration-700 ${
        showSideBar ? 'translate-y-0 drop-shadow-xl' : '-translate-y-full'}`} >
        <div className="h-fit z-20 px-3 py-4 overflow-y-auto bg-white border border-t-[#e7e6e6] rounded-br-md">
            <ul className="space-y-2 font-medium mt-2">
                <li onClick={() => navigate("/dashboards")}>
                    <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg  hover:bg-gray-200">
                        <svg aria-hidden="true" className="w-4 h-4 text-gray-700 transition duration-75  group-hover:text-black " fill="#6c3333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span className="ml-3 font-Pop-L uppercase tracking-widest text-xs">Dashboard</span>
                    </a>
                </li>
                <li>
                    <button onClick={() => setToggleDropdown(!toggleDropdown)} className="flex items-center w-full p-3 text-gray-700 transition duration-75 rounded-lg group hover:bg-gray-200 ">
                        <svg aria-hidden="true" className="flex-shrink-0 w-4 h-4 text-gray-700 transition duration-75 group-hover:text-black  " fill="#6c3333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap font-Pop-L uppercase tracking-widest text-xs">Reportes</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    {toggleDropdown && (
                        <ul className="">
                            <li onClick={() => navigate("/reporteTransacciones")}>
                                <a href="#" className="flex w-full p-3 text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200  font-Pop-L tracking-widest text-xs">Reporte Transacciones</a>
                            </li>
                            <li onClick={() => navigate("/reporteSubscripciones")}>
                                <a href="#" className="flex w-full p-3 text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200  font-Pop-L tracking-widest text-xs">Reporte Suscripciones</a>
                            </li>
                        </ul>
                    )}
                </li>

            </ul>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-dashed border-[#e7e6e6]">
                <li onClick={() => navigate("/settings")}>
                    <a href="#" className="flex items-center p-3 text-gray-700 transition duration-75 rounded-lg hover:bg-gray-200  group">
                        <svg aria-hidden="true" className="flex-shrink-0 w-4 h-4 text-gray-700 transition duration-75  group-hover:text-black " fill="#6c3333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path></svg>
                        <span className="ml-3 font-Pop-L uppercase tracking-widest text-xs">Ajustes</span>
                    </a>
                </li>
                <li onClick={logOut}>
                    <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg  hover:bg-gray-200">
                        <svg aria-hidden="true" className="flex-shrink-0 w-4 h-4 text-gray-700 transition duration-75  group-hover:text-black " fill="#6c3333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap font-Pop-L uppercase tracking-widest text-xs">Cerrar Sesión</span>
                    </a>
                </li>

            </ul>
        </div>
    </div>;
}
