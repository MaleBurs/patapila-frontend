import { Fragment } from 'react'
import { Popover, Transition } from '@sheadlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import LoginButton from '../../Components/Registration Buttons/loginButton'
import "../../Fonts/Poppins-Bold.ttf"
import "../../Components/NavBar/navBar.css"
import "./IntroductionPage.css"
import { navigationInformative } from '../navigationInformative'

export default function IntroductionPage() {
  
  return (
    <div className="relative overflow-hidden greenBackground">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">

          <Popover>
            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
              <nav className="relative items-center justify-between sm:h-10 lg:justify-start d-flex justify-content-start" aria-label="Global">
                <div className="flex flex-shrink-0 flex-grow items-center mt-10 lg:flex-grow-0">
                  <div className="flex w-full items-center justify-between md:w-auto">
                    <a href="https://patapila.org/index.php">
                      <span className="sr-only">Workflow</span>
                      <img
                        alt
                        className="sm:h-10 navBarLogo"
                        src="https://patapila.org/assets/img/logo_3.svg"
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="hidden md:ml-10 md:block md:pr-4 md:pt-8">
                  {navigationInformative.map((item) => (
                    <a key={item.name} href={item.href} className='navBarText'>
                      {item.name}
                    </a>
                  ))}
                    <LoginButton style = {"navBarText navBarButtonBorder"}></LoginButton>
                </div>
                </div>
              </nav>
            </div>

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
                className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src={require('../../Components/Images/Copia de Logo-Pata Pila-03.png')}
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close main menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                    <LoginButton style = {"block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"}></LoginButton>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </div>
  )
}