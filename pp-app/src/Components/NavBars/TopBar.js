import LogoPataPila_Colores from "../Images/LogoPataPila_Colores.jpg";

export function TopBar(setShowSideBar, showSideBar, setToggleDropdown) {
    return <><div className="z-50 bg-white h-20 container relative top-0 left-0 w-screen">
        <div className="h-full flex flex-row justify-between mx-10 items-center">
            <button onClick={() => { setShowSideBar(!showSideBar); setToggleDropdown(false); }} className="inline-flex items-center p-3 mt-2 ml-3 text-md text-gray-700 rounded-full hover:bg-[#e7e6e6] focus:outline-none">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>        
            <img
                className="h-auto w-[160px]"
                alt="LogoPataPila_Colores"
                src={LogoPataPila_Colores} />   
        </div>
    </div>
    </>;
}
