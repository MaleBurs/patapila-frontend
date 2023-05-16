import "../../Fonts/Poppins-Bold.ttf"
import NavBar from '../../Components/NavBars/NavBar'
import RegistrationForm from "../../Components/Forms/Registration-AutentificationForms/RegistrationForm"
import "../../App.css"
import { useParams } from 'react-router-dom';
import React from 'react';
import ImagePageContainer from "./ImagePageContainer";
import opcionesFotosCabecera from "../../Values/opcionesDeFotosCabecera";
import { useEffect, useState } from "react";
import { navigationInformative } from '../navigationInformative'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import YoDono from "../../Components/Images/YoDono.png";
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";
import ImpactChart from "../../Components/Profile/DoughnutChartImpact";
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ComunidadFoto from "../../Components/Images/ComunidadFoto.jpg";
import LogoLaComunidad from "../../Components/Images/LogoLaComunidad.png";
import { SectionWithPictureWithInformation } from "../../Components/Utiles/SectionWithPictureWithInformation";
import { DosManerasDeDonarSection } from "./DosManerasDeDonarSection";
import PublicProfileInformationServices from "../../services/publicProfileInformation.service";
import ManoConCorazon from "../../Components/Images/ManoConCorazon.png";

export default function RefferalsPage() {
  const params = useParams();
  const [refferalUserInformation, setRefferalUserInformation]= useState(null);
  const [refferalUser, setRefferalUser]= useState(null);
  useEffect(() => {
    PublicProfileInformationServices.getPublicProfileInformationByUserURL(params.refferalURL).then(
      (response) => {
        setRefferalUserInformation(response.data)
        setRefferalUser(response.data.user)
  });}, [params.refferalURL]);
  return (
    <> 
    { refferalUser ?
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
              Registrese para luchar junto a {refferalUser.name} y toda la comunidad contra la desnutrición infantil
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
            <img src={opcionesFotosCabecera[refferalUserInformation.chosenCoverPhotoId-1].imagen} alt="Niño en el piso" className="rounded-lg w-full"/>
          </div>
          <div className="border border-gray opacity-95 rounded-md bg-white h-fit px-8 pt-8 pb-5 basis-2/5 flex flex-col">
                <div className="font-Pop-L text-xs mb-4 text-gray-600 tracking-wider">Conocé más acerca de {refferalUser.name} {refferalUser.lastname} ...</div>

                <div className="flex flex-col py-5 space-y-4 border-b border-[#e7e6e6] border-dashed mb-3">
                  <div className="font-Pop-R text-base text-center purpleText">
                    {refferalUserInformation.headerText==="" ?
                    "No podemos mostrar indiferencia ante los niños que pasan hambre"
                    : refferalUserInformation.headerText}
                  </div>
                  <div className="font-Pop-L text-xs text-gray-700 text-justify">
                    {refferalUserInformation.biography ==="" ?
                    "Unite a la comunidad de Pata Pila para poder llegar a los niños de las comunidades Wichis en Salta. Todas tus donaciones ayudan a crear un mundo mejor!"
                    : refferalUserInformation.biography}
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex flex-row -ml-10">
                    {refferalUserInformation.publicProfileConfiguration.showTotalAmountDonated &&
                    refferalUserInformation.publicProfileConfiguration.showReferralsTotalAmountDonated ?
                    <div className="chart-container" style={{position: 'relative', width:'20vh'}}>
                      <ImpactChart donatedByRefferals={refferalUserInformation.referralsTotalAmountDonated} donatedByUser={refferalUserInformation.totalAmountDonated}/>
                    </div>
                    :<img src={ManoConCorazon} alt="sinImpacto" className="h-16 w-auto ml-9"/>
                    }
                    
                    <div className={`flex flex-col mt-3 justify-center
                      ${refferalUserInformation.publicProfileConfiguration.showTotalAmountDonated &&
                      refferalUserInformation.publicProfileConfiguration.showReferralsTotalAmountDonated ? 
                      "-ml-5":"ml-3"}`}>
                        {refferalUserInformation.publicProfileConfiguration.showLifeImpact &&<div className="font-Pop-R text-lg text-start">${refferalUserInformation.lifeImpact}</div>}
                        <div className="font-Pop-L text-xs text-start italic">Impacto de Vida de <span className="underline decoration-gray-400 underline-offset-2" >Paula</span></div>   
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 mx-3">

                    {refferalUserInformation.publicProfileConfiguration.showTotalAmountDonated &&
                    refferalUserInformation.publicProfileConfiguration.showReferralsTotalAmountDonated ?
                    <>
                      
                      <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                        <span className="inline-flex rounded-full bg-[#6c3333] h-3 w-3"></span>
                        <div>${refferalUserInformation.totalAmountDonated} donados</div>
                      </div>
                      {refferalUserInformation.publicProfileConfiguration.showReferralsQuantity ?
                      <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                        <span className="inline-flex rounded-full bg-[#f4dcbf] h-3 w-3"></span>
                        <div>${refferalUserInformation.referralsTotalAmountDonated} donados entre {refferalUserInformation.referralsQuantity} referidos</div>
                      </div>
                      :
                      <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                        <span className="inline-flex rounded-full bg-[#f4dcbf] h-3 w-3"></span>
                        <div>${refferalUserInformation.referralsTotalAmountDonated} donados por referidos de {refferalUser.name}</div>
                      </div>}

                    </>
                    :
                    <div className="flex flex-row space-x-4 justify-start">
                        {refferalUserInformation.publicProfileConfiguration.showTotalAmountDonated &&
                        <DashedImpactBox description="Ha donado a lo largo de su historia" impact={"$" + refferalUserInformation.totalAmountDonated}/>
                        }
                        {refferalUserInformation.publicProfileConfiguration.showReferralsTotalAmountDonated &&
                        <DashedImpactBox description="Gracias a sus referidos ha ayudado a recaudar," impact={"$" + refferalUserInformation.referralsTotalAmountDonated}/>
                        }
                        {refferalUserInformation.publicProfileConfiguration.showReferralsQuantity && 
                        <DashedImpactBox description="Ha ayudado a que se unan nuevos miembros," impact={refferalUserInformation.referralsQuantity} />
                        }
                    </div>
                    }

                  </div>
                </div>

                <div className="flex flex-row justify-start space-x-3 px-3 mt-12">
                  {refferalUserInformation.facebookProfile!="" && <button onClick={() => window.location.replace(refferalUserInformation.facebookProfile)} ><FontAwesomeIcon icon={faFacebookF} size="base" color="gray" /></button>}
                  {refferalUserInformation.instagramProfile!="" && <button onClick={() => window.location.replace(refferalUserInformation.instagramProfile)} ><FontAwesomeIcon icon={faInstagram} size="base" color="gray"/></button>}
                  {refferalUserInformation.twitterProfile!="" && <button onClick={() => window.location.replace(refferalUserInformation.twitterProfile)} ><FontAwesomeIcon icon={faTwitter} size="base" color="gray"/></button>}
                  {refferalUserInformation.linkedInProfile!="" && <button onClick={() => window.location.replace(refferalUserInformation.linkedInProfile)} ><FontAwesomeIcon icon={faLinkedinIn} size="base" color="gray"/> </button>}
                </div>

          </div>
        </div>
        <img src={YoDono} alt="Yo Dono" className="w-40 h-60 z-10 place-self-end -mb-10" />

      </div>
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
    :
    <></>} 
    </>
  )

function DashedImpactBox(props) {
    return <div className="flex flex-col space-y-1 basis-1/2 p-2 border-[#6c333349] border-dashed border rounded-md">
      <div className="font-Pop-L text-[11px] text-gray-700 text-center">
        {props.description}
      </div>
      <div className="font-Pop-SB text-lg tracking-wider purpleText text-center">{props.impact}</div>
    </div>;
  }
}