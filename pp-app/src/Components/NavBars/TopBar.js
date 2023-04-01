import LogoPataPila_Colores from "../Images/LogoPataPila_Colores.jpg";

export function TopBar(setShowSideBar, setToggleDropdown) {
    return <div className="bg-transparent container sm:h-10 fix mx-auto top-0 left-0">
        <div className="mt-4 flex flex-row justify-between mx-9">
            <button onClick={() => { setShowSideBar(true); setToggleDropdown(false); }} class="inline-flex items-center p-3 mt-2 ml-3 text-md text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <div className="">
                <div className='mt-2'>
                    <img
                        className="h-auto w-[160px]"
                        alt="LogoPataPila_Colores"
                        src={LogoPataPila_Colores} />
                </div>
            </div>
        </div>
    </div>;
}
