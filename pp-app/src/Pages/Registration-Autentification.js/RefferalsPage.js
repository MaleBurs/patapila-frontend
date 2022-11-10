import "../../Fonts/Poppins-Bold.ttf"
import NavBar from '../../Components/NavBars/NavBar'
import RegistrationForm from "../../Components/Forms/Registration-AutentificationForms/RegistrationForm"
import "../../App.css"
import { useParams } from 'react-router-dom';
import React from 'react';
import ImagePageContainer from "./ImagePageContainer";
import AuthService from "../../services/auth.service";
import { useEffect, useState } from "react";

export default function RefferalsPage() {
  const params = useParams();
  const [refferalUser, setRefferalUser]= useState(null);
  useEffect(() => {
    AuthService.findUserById(params.refferalId).then((response) => {setRefferalUser(response.data)});    
  }, [params.refferalUser, params.refferalId]);
  return (
    <> 
    { refferalUser ?
      <ImagePageContainer content={
        <>
        <NavBar 
        navigation={[
          { name: '¿Por qué desnutrición?', href: 'https://patapila.org/desnutricion.php' },
          { name: 'Nuestro Trabajo', href: 'https://patapila.org/impacto.php' },
          { name: 'Sobre Nosotros', href: 'https://patapila.org/nosotros.php' },
          { name: 'Involucrate', href: 'https://patapila.org/involucrate.php' },
        ]}
        />
        <div className="flex flex-row px-24">
          <div className=" basis-1/2 mt-20 text-end font-Pop-SB text-white text-[20pt] tracking-[0px] mx-10 lg:mx-30">
            <div className="mt-5">
            Usted ha sigo referido por {refferalUser.name} {refferalUser.lastName}
            </div>
            <div className="font-medium tracking-[0.2px] text-[15pt] text-white font-Pop-R mt-8 text-justify">
            Registrese para luchar junto a nosotros y {refferalUser.name} {refferalUser.lastName} contra la desnutrición infantil. 
            </div>
          </div>
          <div className="basis-1/2 flex w-full"><RegistrationForm extraStyles="lg:w-3/4" refferalUser={refferalUser}></RegistrationForm></div>
        </div>
        </>
      }/>
    :
    <></>} 
    </>
  )
}