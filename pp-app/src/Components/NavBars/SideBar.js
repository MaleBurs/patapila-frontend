export function SideBar(showSideBar, setShowSideBar, navigate, setToggleDropdown, toggleDropdown, logOut) {
    return <aside className={"fixed top-0 left-0 z-40 w-64 h-screen transition-transform " + (showSideBar ? "visible" : "invisible")}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#f8f8f8] shadow-lg">
            <ul className="space-y-4 font-medium">
                <button onClick={() => setShowSideBar(false)} className="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-700 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="#7BA391" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button>
            </ul>
            <ul className="space-y-4 font-medium mt-7">
                <li onClick={() => navigate("/reportes")}>
                    <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg  hover:bg-gray-200">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-700 transition duration-75  group-hover:text-black " fill="#0F6938" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span className="ml-3 font-Pop-M tracking-[0.7px] text-base">Dashboard</span>
                    </a>
                </li>
                <li>
                    <button onClick={() => setToggleDropdown(!toggleDropdown)} className="flex items-center w-full p-3 text-gray-700 transition duration-75 rounded-lg group hover:bg-gray-200 ">
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-700 transition duration-75 group-hover:text-black  " fill="#0F6938" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap font-Pop-M tracking-[0.7px] text-base" sidebar-toggle-item>Reportes</span>
                        <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    {toggleDropdown && (
                        <ul className="py-2 space-y-2">
                            <li onClick={() => navigate("/reporteTransacciones")}>
                                <a href="#" className="flex items-center w-full p-3 text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200  font-Pop-M tracking-[0.7px] text-sm">Reporte Transacciones</a>
                            </li>
                            <li onClick={() => navigate("/reporteSubscripciones")}>
                                <a href="#" className="flex items-center w-full p-3 text-gray-700 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200  font-Pop-M tracking-[0.7px] text-sm">Reporte Suscripciones</a>
                            </li>
                        </ul>
                    )}
                </li>

            </ul>
            <ul className="pt-4 mt-7 space-y-4 font-medium border-t border-[#7BA391]">
                <li onClick={() => navigate("/settings")}>
                    <a href="#" className="flex items-center p-3 text-gray-700 transition duration-75 rounded-lg hover:bg-gray-200  group">
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-700 transition duration-75  group-hover:text-black " fill="#0F6938" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path></svg>
                        <span className="ml-3 font-Pop-M tracking-[0.7px] text-base">Ajustes</span>
                    </a>
                </li>
                <li onClick={logOut}>
                    <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg  hover:bg-gray-200">
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-700 transition duration-75  group-hover:text-black " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap font-Pop-M tracking-[0.7px] text-base">Cerrar Sesión</span>
                    </a>
                </li>

            </ul>
        </div>
    </aside>;
}
