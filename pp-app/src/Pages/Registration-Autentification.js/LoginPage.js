import "../../Fonts/Poppins-Bold.ttf"
import NavBar from '../../Components/NavBars/NavBar'
import LogInForm from "../../Components/Forms/Registration-AutentificationForms/LogInForm"
import "../../App.css";
import "./loginPage.css";
import ImagenNinaSonriendo from "../../Components/Images/ImagenNinaSonriendo.jpg"
import PictureWithText from "../../Components/Utiles/PictureWithText"
import React from 'react';
import ImagePageContainer from "./ImagePageContainer";

export default function LoginPage() {
  return (
    <>
      <ImagePageContainer content={
        <>
        <NavBar 
        navigation={[
          { name: '¿Por qué desnutrición?', href: 'https://patapila.org/desnutricion.php' },
          { name: 'Nuestro Trabajo', href: 'https://patapila.org/impacto.php' },
          { name: 'Sobre Nosotros', href: 'https://patapila.org/nosotros.php' },
          { name: 'Involucrarte', href: 'https://patapila.org/involucrate.php' },
        ]}
        />
        <LogInForm></LogInForm>
        </>
      }/>
      <PictureWithText  picture={ImagenNinaSonriendo} title={"Unite a La Comunidad"} text={" No importa la edad que tengas, dónde vivas o cuánto podes dar. Está al alcance de tus manos ayudar a terminar con la crisis de la desnutrición infantil y podes tomar acción ahora mismo. Inicia Sesión para unirte a la Comunidad. La comunidad es un grupo de personas comprometidas y apasionadas, que donan casualmente o mes a mes para acabar con la problemática de la desnutrición infantil"}/> 
    </>
  )
}