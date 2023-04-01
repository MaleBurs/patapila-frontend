import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import "../../Fonts/Poppins-Bold.ttf"
import { useNavigate } from "react-router-dom"
import "./navBar.css"
import "../../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faBars);

export default function NavBar(props) {
  const navigate = useNavigate();
  function navigateToLogIn(){
      navigate("/login");
      window.location.reload();
    
  }
  return (
          <Popover>
              <nav className="bg-transparent container sm:h-10 fix mx-auto top-0 left-0" aria-label="Global">
                <div className="mt-6 mx-auto flex flex-row justify-around lg:mx-8">
                    <div className="flex flex-row justify-between w-full mx-3 lg:mx-0 lg:basis-2/5">
                        <div className='mt-1'>
                            <a href="https://patapila.org/index.php">
                            <img
                                className="h-auto w-[220px]"
                                src="https://patapila.org/assets/img/logo_3.svg"
                                alt="Pata Pila Logo"
                            />
                            </a>
                        </div>
                        <div className="mt-3 flex items-center block mobile-nav-toggle lg:hidden">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-400 hover:text-gray-500">
                                <FontAwesomeIcon icon="fa-bars" className="h-10 w-10 mobile-nav-toggle" aria-hidden="true"/>
                            </Popover.Button>
                        </div>
                    </div>
                    <div className="justify-end mx-auto flex-1 hidden lg:basis-3/5 lg:pr-4 lg:pt-8 lg:flex lg:flex-row">
                    {(props.navigation)?
                    props.navigation.map((item) => (
                      <a key={item.name} href={item.href} className='font-Pop-B uppercase text-white duration-[0.3s] text-sm px-6 inline-block mt-2 position-relative-nowrap yellowTextHover'>
                        {item.name}
                      </a>
                    ))
                  :<></>}
                    <button onClick={navigateToLogIn} className = {"font-Pop-B uppercase text-white text-sm mx-3 px-6 py-2 position-relative-nowrap duration-[0.3s] inline-block bg-white whiteBorder greenText rounded-lg hover:bg-transparent hover:text-white  focus:bg-transparent focus:text-white"}>Iniciar Sesión</button>
                  </div>
                </div>
              </nav>
           

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="darkGreyBg absolute h-full top-0 inset-x-0 z-10 origin-top-right transform p-2 transition lg:hidden"
              >
                
                <div className="px-5 pt-4 justify-self-end grid ">
                    <Popover.Button className="rounded-md p-2 text-white place-self-end" >
                    </Popover.Button>
                </div>
                  
                <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="space-y-1 px-2 pt-2 z-50">
                    {(props.navigation)?
                    props.navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="z-50 block rounded-md px-3 py-4 text-sm font-Pop-B uppercase blackText tracking-[0.5px] grayBottomBorder"
                      >
                        {item.name}
                      </a>
                    ))
                  :
                  <></>}
                  </div>
                    <button className="z-50 block rounded-md px-5 py-4 text-sm font-Pop-B uppercase tracking-[0.5px] yellowBg text-white w-full greenBgHover" onClick={navigateToLogIn}>Iniciar Sesión</button> 
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

  )
}