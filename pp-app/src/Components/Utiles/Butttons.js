import React, { useState, useEffect } from "react"
import "../NavBars/navBar.css";
import "../../App.css"
import Loading from "./Loading";

const SolidGreenButton = ({ text, color, margins, onClick, loading}) => {
  const [loadingState, setLoadingState] = useState(loading);
  useEffect(() => {
    setLoadingState(loading);
  }, [loading])
  
  return (
    <>   
            <div>
              <button
                className={`group font-Pop-M relative flex flex-row space-x-3 w-full justify-center rounded-lg border border-transparent yellowBgHover py-3 px-4 uppercase text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${color} ${margins}`}
                onClick = {onClick}
              >
                <div>{text}</div>
                {loadingState ? <Loading/> : null}
              </button >
            </div>
    </>
  )
}

const IndicationButton = ({ text,customStyle, onClick}) => {
  return (
    <>   
            <div>
              <button
                className={`py-2 px-6 md:px-8 lg:px-10 duration-700 rounded-xl tracking-widest font-Pop-M uppercase text-sm duration-700 hover:text-white focus:text-white ${customStyle}`}
                onClick = {onClick}
              >
                {text}
              </button >
            </div>
    </>
  )
}

const SolidWhiteButton = ({ text, onClick}) => {
  return (
    <>   
            <div>
              <button
                className = "font-Pop-B uppercase duration-[0.3s] text-[16px] position-relative-nowrap px-[40px] py-[12px] ml-[5px] tracking-[0.5px] inline-block greenText bg-white rounded-lg yellowBgHover focus:text-white hover:text-white "
                onClick = {onClick}
              >
                {text}
              </button >
            </div>
    </>
  )
}

const ProfileNavBarButton = ({ text, onClick}) => {
    return (
      <>   
              <div>
                <button
                  className = "block w-full px-1 py-2 text-left greenText uppercase font-Pop-M tracking-[0.5px] text-[10pt] duration-300 hover:text-[11pt] focus:text-[11pt]"
                  onClick = {onClick}
                >
                  {text}
                </button >
              </div>
      </> 
  )
}

const Switch = ({ text1, text2}) => {
  const [button1Active, SetButton1Active] = useState(true);
  return (
    <>   
             <div className="w-full flex flex-row font-Pop-SB text-[23px]">
                    <button className={`basis-1/2 p-4 border-[#eb8301] border-4 rounded-l-lg ${(button1Active ? 'text-white yellowBg' : 'yellowText')}`} onClick={()=>SetButton1Active(true)}>{text1}</button>
                    <button  className={`basis-1/2 p-4 border-[#eb8301] border-4 rounded-r-lg ${(!button1Active ? 'text-white yellowBg' : 'yellowText')}`} onClick={()=>SetButton1Active(false)}>{text2}</button>
                </div>
    </> 
)
}

const Buttons = {
  SolidGreenButton,
  SolidWhiteButton,
  ProfileNavBarButton,
  Switch,
  IndicationButton
}
export default Buttons;
