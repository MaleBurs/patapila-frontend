import "../../Fonts/Poppins-Bold.ttf"
import NavBar from '../../Components/NavBars/NavBar'
import LogInForm from "../../Components/Forms/Registration-AutentificationForms/LogInForm"
import "../../App.css";
import "./loginPage.css";
import React from 'react';
import ImagePageContainer from "./ImagePageContainer";
import { navigationInformative } from '../navigationInformative'
import { TextBubble } from "../../Components/Utiles/TextBubble";
import { SectionWithPictureWithInformation } from "../../Components/Utiles/SectionWithPictureWithInformation";
import ComunidadFoto from "../../Components/Images/ComunidadFoto.jpg";
import LogoLaComunidad from "../../Components/Images/LogoLaComunidad.png";
import CorazonSinColor from "../../Components/Images/CorazonSinColor.png";
import { SectionTextAndLogo } from "../../Components/Utiles/SectionTextAndLogo";
import { datosDeImpacto } from "../../Values/datosDeImpacto";
import { useNavigate } from "react-router-dom"
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";

export default function LoginPage() {

  const categories = datosDeImpacto
  const navigate = useNavigate();

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
          <TextBubble title="Ayuda a La Comunidad" text="No importa la edad que tengas, dónde vivas o cuánto podes dar. Está al alcance de tus manos ayudar a terminar con la crisis de la desnutrición infantil y podes tomar acción ahora mismo. Inicia Sesión para contibuír a la Comunidad."/>
          <LogInForm></LogInForm>
        </div>
        </>
      }/>
      <SectionTextAndLogo
        logo={CorazonSinColor}
        heather="Nuestro Propósito"
        text="Existimos para combatir la desnutrición infantil e integrar a las familias y comunidades en situación de pobreza extrema de la Argentina, al sistema público-privado, generando oportunidades de desarrollo económico y trabajando activamente en la restitución del derecho a la salud, la identidad, la vivienda digna y al acceso al agua potable."
        activeButton={true}
        buttonText="Quiero Conocer Más"
        backgoundColor="yellowBg"
        buttonFunction={() => window.location.replace("https://patapila.org/nosotros")}
      />
      <ImagePageContainer 
      bgImage="imageBgSonrisa"
      content={
        <div className="mx-10 mt-20 flex flex-row">
          <div className="font-Pop-SB tracking-[0.7px] text-white -rotate-90 text-lg w-fit h-fit mt-20">Impacto HOY</div>
          <div className="flex flex-col">
          {categories.map((category) => {
            return (
            <>
            <div className="flex flex-row my-5 space-x-7">
                <img
                className="object-scale-down w-[90px]"
                src={category.logo}
                alt="title" />
                <div className="flex flex-col text-white">
                  <div className="font-Pop-B text-4xl">
                    {category.cantidad}
                  </div>
                  <div className="font-Pop-B text-lg uppercase tracking-[0.7px]">
                    {category.title}
                  </div>
                </div>
            </div>
            </> 
          )})}
          </div>
        </div>
      }/>
      <SectionWithPictureWithInformation 
        picture={ComunidadFoto} 
        logo={LogoLaComunidad}
        heather=""
        text="Es un grupo de personas comprometidas y apasionadas, que donan para acabar con la problemática de la desnutrición infantil."
        activeButton={true}
        buttonText="Quiero Unirme"
        backgoundColor="bg-[#e7e6e6]"
        buttonFunction={() => navigate("/signup")}
      />
      <div className="flex flex-col">
        <div className="h-16 bg-[#e7e6e6]"></div>
        <PieDePaginaInformativo/>
      </div>
    </>
  )
}