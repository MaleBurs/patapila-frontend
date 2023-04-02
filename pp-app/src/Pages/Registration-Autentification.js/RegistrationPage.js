import "../../Fonts/Poppins-Bold.ttf"
import NavBar from '../../Components/NavBars/NavBar'
import RegistrationForm from "../../Components/Forms/Registration-AutentificationForms/RegistrationForm"
import "../../App.css"
import ComunidadFoto from "../../Components/Images/ComunidadFoto.jpg";
import LogoLaComunidad from "../../Components/Images/LogoLaComunidad.png";
import React from 'react';
import ImagePageContainer from "./ImagePageContainer";
import { navigationInformative } from '../navigationInformative'
import { TextBubble } from "../../Components/Utiles/TextBubble"
import { SectionWithPictureWithInformation } from "../../Components/Utiles/SectionWithPictureWithInformation";
import CorazonSinColor from "../../Components/Images/CorazonSinColor.png";
import ManoConPlata from "../../Components/Images/ManoConPlata.png";
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";

export default function RegistrationPage() {
  return (
    <>  
      <ImagePageContainer 
      bgImage="imageBg"
      content={
        <>
        <NavBar 
        navigation={navigationInformative}
        />
        <div className="flex flex-col space-y-10 lg:flex-row justify-around">
          <TextBubble title="Unite a La Comunidad" text="No importa la edad que tengas, dónde vivas o cuánto podes dar. Está al alcance de tus manos ayudar a terminar con la crisis de la desnutrición infantil y podes tomar acción ahora mismo. Regístarte para ser parte de la Comunidad."/>
          <RegistrationForm extraStyles="md:w-3/4 lg:w-full"></RegistrationForm>
        </div>
        </>
      }/>
      <SectionWithPictureWithInformation 
        picture={ComunidadFoto} 
        logo={LogoLaComunidad}
        heather=""
        text="Es un grupo de personas comprometidas y apasionadas, que donan para acabar con la problemática de la desnutrición infantil."
        activeButton={true}
        buttonText="Quiero Unirme"
        backgoundColor="bg-[#e7e6e6]"
        buttonFunction={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      />
      <ImagePageContainer 
      bgImage="imageBgNiñoMirada"
      content={
        <div className="mx-10 mt-32 flex flex-col items-center">
          <div className="font-Pop-B tracking-[0.7px] text-[#2e2a25] text-4xl mb-10">
            Dos Maneras de Donar
          </div>
          <div className="flex flex-row"> 

          <div className="flex flex-col my-5 space-x-7 items-center basis-1/2 space-y-5">
              <img
              className="object-scale-down w-[110px]"
              src={CorazonSinColor}
              alt="title" />
              
              <button onClick={()=>window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className="font-Pop-M text-lg text-white uppercase rounded-lg yellowBg greenBgHover w-fit px-6 py-3">
              Involucrate
              </button>
              <div className="font-Pop-M text-base text-white tracking-[0.7px] px-16 text-center">
              Registrate para ser parte de la comunidad. Podrás suscribirte para donar todos los meses, donar cuando lo desees, llevar un registro de tus donaciones y compartir tu impacto con amigos!
              </div>    
          </div>
          <div className="flex flex-col my-5 space-x-7 items-center basis-1/2 space-y-5">
              <img
              className="object-scale-down w-[110px]"
              src={ManoConPlata}
              alt="title" />
              
              <button onClick={()=>window.location.replace("http://donar.patapila.org/comunidad")} className="font-Pop-M text-lg text-white uppercase rounded-lg yellowBg greenBgHover w-fit px-6 py-3">
              Dona
              </button>
              <div className="font-Pop-M text-base text-white tracking-[0.7px] px-16 text-center">
              Dona una una vez para ayudarnos a combatir la desnutrición infantil.
              </div>    
          </div> 
          
          </div>
        </div>
      }/>
      <PieDePaginaInformativo/>
    </>
  )
}