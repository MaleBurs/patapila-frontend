import "../../Fonts/Poppins-Bold.ttf"
import NavBar from '../../Components/NavBars/NavBar'
import RegistrationForm from "../../Components/Forms/Registration-AutentificationForms/RegistrationForm"
import "../../App.css"
import { useParams } from 'react-router-dom';
import React from 'react';
import ImagePageContainer from "./ImagePageContainer";
import AuthService from "../../services/auth.service";
import { useEffect, useState } from "react";
import { navigationInformative } from '../navigationInformative'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import NiñoPiso from "../../Components/Images/NiñoPiso.jpg";
import YoDono from "../../Components/Images/YoDono.png";
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";
import ImpactChart from "../../Components/Profile/DoughnutChartImpact";
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function RefferalsPage() {
  const params = useParams();
  const [refferalUser, setRefferalUser]= useState(null);
  useEffect(() => {
    AuthService.findUserById(params.refferalId).then((response) => {setRefferalUser(response.data)});    
  }, [params.refferalUser, params.refferalId]);
  return (
    <> 
    { true ?
    <>
      <ImagePageContainer 
      bgImage="imageDosNinas"
      content={
        <>
        <NavBar 
        navigation={navigationInformative}
        />
        <div className="flex flex-row px-24 items-center h-fit ">
          <div className="basis-1/2 flex flex-col items-center space-y-12">
            <div className="font-Pop-B text-2xl tracking-wider h-fit text-white text-center">
              Registrese para luchar junto a Paula y toda la comunidad contra la desnutrición infantil
            </div>
            <button className="animate-bounce yellowBg w-fit rounded-full p-3" onClick={()=>window.scrollTo({ top: 700, left: 0, behavior: 'smooth' })}>
              <FontAwesomeIcon icon={faArrowDown} size="3x" color="white"/>
            </button>
          </div>
          <div className="basis-1/2 flex w-full"><RegistrationForm extraStyles="lg:w-3/4" refferalUser={refferalUser}></RegistrationForm></div>
        </div>
        </>
      }/>

      <div className="flex flex-row md:flex-row px-10 md:px-12 lg:px-32 bg-[#f6f7f36b] -space-x-44">

        <div className="-space-x-24 flex flex-row items-center h-fit w-full">
          <div className="py-14 basis-3/5 flex flex-row -space-x-40">
            <img src={NiñoPiso} alt="Niño en el piso" className="rounded-lg w-full"/>
          </div>
          <div className="border border-gray opacity-95 rounded-md bg-white h-fit px-8 pt-8 pb-5 basis-2/5 flex flex-col">
                <div className="font-Pop-L text-xs mb-4 text-gray-600 tracking-wider">Conocé más acerca de Paula Aletti ...</div>

                <div className="flex flex-col py-5 space-y-4 border-b border-[#e7e6e6] border-dashed mb-3">
                  <div className="font-Pop-R text-base text-center purpleText">No podemos mostrar indiferencia ante los niños que pasan hambre</div>
                  <div className="font-Pop-L text-xs text-gray-700 text-justify">Unite a la comunidad de Pata Pila para poder llegar a los niños de las comunidades Wichis en Salta. Todas tus donaciones ayudan a crear un mundo mejor!</div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex flex-row -ml-10">
                    <div className="chart-container" style={{position: 'relative', width:'20vh'}}>
                      <ImpactChart donatedByRefferals={23489} donatedByUser={10789}/>
                    </div>
                    <div className="flex flex-col mt-3 -ml-5">
                        <div className="font-Pop-R text-lg text-start">$34278</div>
                        <div className="font-Pop-L text-xs text-start italic">Impacto de Vida de <span className="underline decoration-gray-400 underline-offset-2" >Paula</span></div>   
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 mx-3">
                    <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                      <span className="inline-flex rounded-full bg-[#f4dcbf] h-3 w-3"></span>
                      <div>$10789 donados</div>
                    </div>
                    <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                      <span className="inline-flex rounded-full bg-[#6c3333] h-3 w-3"></span>
                      <div>$23489 donados entre 3 referidos</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-start space-x-3 px-3 mt-12">
                  <button onClick={() => window.location.replace("https://www.facebook.com/patapila.org/")} ><FontAwesomeIcon icon={faFacebookF} size="base" color="gray" /></button>
                  <button onClick={() => window.location.replace("https://www.instagram.com/patapilaok/")} ><FontAwesomeIcon icon={faInstagram} size="base" color="gray"/></button>
                  <button onClick={() => window.location.replace("https://twitter.com/patapilaok")} ><FontAwesomeIcon icon={faTwitter} size="base" color="gray"/></button>
                  <button onClick={() => window.location.replace("https://www.linkedin.com/company/pata-pila")} ><FontAwesomeIcon icon={faLinkedinIn} size="base" color="gray"/> </button>
                </div>

          </div>
        </div>
        <img src={YoDono} alt="Yo Dono" className="w-40 h-60 z-10 place-self-end -mb-10" />

      </div>
      <div className="flex flex-col">
        <div className="h-20 bg-[#f6f7f36b]"></div>
        <PieDePaginaInformativo/>
      </div>
      
    </>
    :
    <></>} 
    </>
  )
}