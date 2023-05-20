import "../../Fonts/Poppins-Bold.ttf"
import NavBar from '../../Components/NavBars/NavBar'
import RegistrationForm from "../../Components/Forms/Registration-AutentificationForms/RegistrationForm"
import "../../App.css"
import ComunidadFoto from "../../Components/Images/ComunidadFoto.jpg";
import LogoLaComunidad from "../../Components/Images/LogoLaComunidad.png";
import React, {useEffect} from 'react';
import ImagePageContainer from "./ImagePageContainer";
import { navigationInformative } from '../navigationInformative'
import { TextBubble } from "../../Components/Utiles/TextBubble"
import { SectionWithPictureWithInformation } from "../../Components/Utiles/SectionWithPictureWithInformation";
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";
import { DosManerasDeDonarSection } from "./DosManerasDeDonarSection";

export default function RegistrationPage() {
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <>  
      <ImagePageContainer 
      bgImage="imageBg"
      content={
        <>
        <NavBar 
        navigation={navigationInformative}
        />
        <div className="flex flex-col lg:flex-row justify-around">
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
        <DosManerasDeDonarSection/>
      }/>
      <PieDePaginaInformativo/>
    </>
  )
}


