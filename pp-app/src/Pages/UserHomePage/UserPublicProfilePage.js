import React from "react";
import AuthService from "../../services/auth.service";
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import { CurrentUserContextProvider, useCurrentUser} from "../../Context/CurrentUserContext";
import UserInformationSection from "../../Components/Profile/UserInformationSection";
import { CopyLinkButton } from "../../Components/Utiles/CopyLinkButton";
import YoDono from "../../Components/Images/YoDono.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faNetworkWired, faChevronUp, faChevronDown, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import opcionesFotosCabecera from "../../Values/opcionesDeFotosCabecera";

const UserPublicProfilePage = () => {
  const [modal, setModal] = React.useState(false);
  const currentUser = AuthService.getCurrentUser();
  const publicProfileInf = AuthService.getPublicProfileInf();

  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {(currentUser) ? (
      <>
        <CurrentUserContextProvider>
          <UserNavBar navigation={navigationOptions.userNavigation}/>
          {modal ?
            <EditPubliProfileModal onCloseModal={()=>setModal(false)} />
            : null} 
          <UserInformationSection
            description="Customizá tu perfil público y compartilo con amigos! Ellos podrán registrarse, como referidos tuyos, mediante tu url. Todas sus donaciones impactaran en tu perfil!"
            backToHome={true}
            select="miPerfil"
          ></UserInformationSection>
          
          <div className="flex flex-row md:flex-row px-10 md:px-12 lg:px-32 bg-[#f6f7f36b] -space-x-44">

            <div className="-space-x-24 flex flex-row items-center h-fit w-full">
              <div className="py-14 basis-3/5 flex flex-row -space-x-40">
                <img src={opcionesFotosCabecera[publicProfileInf.chosenCoverPhotoId-1].imagen} alt="Niño en el piso" className="rounded-lg w-full"/>
              </div>
              <div className="border border-[#e7e6e6] rounded-md bg-white h-fit px-8 pt-10 pb-16 basis-2/5 flex flex-col">
                <button className="place-self-end mb-5 mr-2" onClick={()=>setModal(true)} >
                  <FontAwesomeIcon icon={faPen} style={{color: "#cecdcd",}} size="sm" />
                </button>
                <div className="font-Pop-M text-lg tacking-widest text-center purpleText">
                  {publicProfileInf.headerText === "" ?
                  "Ayudemos a reducir la cantidad niños que pasan hambre!"
                  : publicProfileInf.headerText
                  }
                </div>
                <div className="my-7 font-Pop-L text-[11.5px] text-gray-500 text-justify tracking-wide leading-4">
                  {
                  publicProfileInf.biography === "" ?
                  "Me uní a la comunidad de Pata Pila para ayudar a acabar con la desnutrición infantil. Por favor, considera unirte a mí para apoyar a Pata Pila. El 100% de tu donación se destina a acabar con la desnutrición infantil en Argentina."
                  : publicProfileInf.biography
                }</div>
                <CopyLinkButton/>
              </div>
            </div>
            <img src={YoDono} alt="Yo Dono" className="w-40 h-60 z-10 place-self-end -mb-4" />
           
          </div>

          <div className="h-32 bg-[#f6f7f36b]"></div>
          <PieDePaginaInformativo/>
        </CurrentUserContextProvider>
        </>
      ) : (<></>)
    }
    </div> 
    </>
  );
};
export default UserPublicProfilePage;

const EditPubliProfileModal = (props) =>{
  const { publicProfileInf, publicProfileConfig} = useCurrentUser();
  const [showSelectPictureModal, setShowSelectPictureModal] = React.useState(false);
  const [picture, setPicture] = React.useState(opcionesFotosCabecera[publicProfileInf.chosenCoverPhotoId-1]);
  const [biografía, setBiografía] = React.useState(publicProfileInf.biography);
  const [title, setTitle] = React.useState(publicProfileInf.headerText);
  const [linkedin, setLinkedin] = React.useState(publicProfileInf.linkedInProfile);
  const [facebook, setFacebook] = React.useState(publicProfileInf.facebookProfile);
  const [twitter, setTwitter] = React.useState(publicProfileInf.twitterProfile);
  const [instagram, setInstagram] = React.useState(publicProfileInf.instagramProfile);
  const [showLifeImpact, setShowLifeImpact] = React.useState(publicProfileConfig.showLifeImpact);
  const [showRefferals, setShowRefferals] = React.useState(publicProfileConfig.showReferralsQuantity);
  const [showAmountDonated, setShowAmountDonated] = React.useState(publicProfileConfig.showTotalAmountDonated);
  const [showAmountDonatedByReferrals, setShowAmountDonatedByReferrals] = React.useState(publicProfileConfig.showReferralsTotalAmountDonated);
  const [openSocialNetworkLayer, setOpenSocialNetworkLayer] = React.useState(false);
  const [openPrivacyLayer, setOpenPrivacyLayer] = React.useState(false);
  function closeModal() {
      props.onCloseModal();
  }

  return(
      <>
        <div className="scrollbar-hide darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
         {showSelectPictureModal && <SelectPictureModal picture={picture} setPicture={setPicture} onCloseModal={()=>setShowSelectPictureModal(false)} />}
          <div className="my-6 p-10 flex flex-row justify-center">

            <div className="basis-2/3 space-y-4 md:space-y-9 mt-96 px-6 md:px-8 lg:px-12 py-6 rounded-md flex flex-col w-auto bg-white outline-none focus:outline-none">
              <button className="w-full text-end font-Pop-B" onClick={closeModal}>X</button>             
              <div className="pb-4 md:pb-8 flex flex-col">

                <div className="flex flex-col space-y-4 justify-self-center ">
                  <div className="font-Pop-R text-lg text-center purpleText tracking-widest">Customizá tu Perfil</div>
                  <div className="font-Pop-L text-xs text-center text-gray-600 tracking-wide">Hace esta página propia. Elegí una imagen de portada, una biografía que represente tu historia y ajusta tu perfil según tus preferencias.</div>
                </div>
                 
                <div className="flex flex-row space-x-8 w-full mt-10">
                  <div className="h-40 basis-2/3">
                    <img className="rounded-md object-cover h-44" src={picture.imagen}/>
                    <div className="px-3 -mt-8"><button onClick={()=>setShowSelectPictureModal(true)} className="uppercase underline tracking-widest text-white font-Pop-M text-[11px]">Cambiar foto de portada</button></div>
                  </div>
                </div>

                
                <div className="flex flex-col justify-start items-start w-full space-y-2 mt-12">
                  <div className="font-Pop-R text-xs uppercase text-gray-600">Frase cabecera</div>
                  <textarea name="fraceCabecera"
                  onChange={(e)=>{e.target.value.length<50 && setTitle(e.target.value)}}
                  value={title}
                  placeholder="Ej: Ayudemos a combatir la desnutrición infantil!"
                  className="rounded-md w-full resize-y text-xs font-Pop-L tracking-wide border-[#e7e6e6] focus:border-[#e7e6e6] focus:ring-0"/>
                </div>

                <div className="flex flex-col justify-start items-start w-full space-y-2 mt-6 border-b border-[#e7e6e6] pb-8">
                  <div className="font-Pop-R text-xs uppercase text-gray-600">Biografía</div>
                  <textarea name="bio"
                  onChange={(e)=>{e.target.value.length<300 && setBiografía(e.target.value)}}
                  value={biografía}
                  placeholder="Ej: Me uní a la comunidad de Pata Pila para ayudar a acabar con la desnutrición infantil. Por favor, considera unirte a mí para apoyar a Pata Pila. El 100% de tu donación se destina a acabar con la desnutrición infantil en Argentina."
                  className="rounded-md w-full resize-y text-xs font-Pop-L tracking-wide border-[#e7e6e6] focus:border-[#e7e6e6] focus:ring-0"/>
                </div>
                
                <div className="flex flex-col justify-start items-start w-full space-y-2 mt-6">
                  <div className="font-Pop-R text-xs uppercase text-gray-600">Link a tu perfil público</div>
                    <div className="border border-[#e7e6e6] bg-[#f6f7f36b] text-xs font-Pop-L tracking-widest rounded-md p-3 text-gray-700">www.patapila/signup/{publicProfileInf.publicProfileUrl} </div>   
                </div>

                <div className="flex flex-col divide-y divide-[#e7e6e6] border border-[#e7e6e6] rounded-md mt-6 px-4 text-gray-600">
                  <div className="flex flex-row space-x-4 items-center w-full justify-between py-4">
                    <div className="flex flex-row space-x-4">
                      <FontAwesomeIcon icon={faNetworkWired} style={{color: "#cecdcd",}}/>
                      <div className="tracking-wide uppercase font-Pop-R text-xs">Redes Sociales</div>
                    </div>
                    {openSocialNetworkLayer ? 
                    <button onClick={()=>setOpenSocialNetworkLayer(false)}><FontAwesomeIcon icon={faChevronUp} style={{color: "#6c3333",}} size="xs"/></button>
                    : <button onClick={()=>setOpenSocialNetworkLayer(true)}><FontAwesomeIcon icon={faChevronDown} style={{color: "#6c3333",}} size="xs"/></button>}
                  </div>
                  {openSocialNetworkLayer &&
                  <div className="py-6">
                    <div className="flex flex-col justify-start items-start w-full space-y-2">
                    <div className="font-Pop-R text-xs uppercase text-gray-600">Linkedin</div>
                      <input
                      type="text" 
                      name="linkedin"
                      onChange={(e)=>{e.target.value.length<20 && setLinkedin(e.target.value)}}
                      value={linkedin}
                      placeholder="Tu url de linkedin"
                      className="py-3 rounded-md w-full resize-y text-xs font-Pop-L tracking-wide border-[#e7e6e6] focus:border-[#e7e6e6] focus:ring-0"/>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full space-y-2 mt-6">
                    <div className="font-Pop-R text-xs uppercase text-gray-600">Instagram</div>
                      <input
                      type="text" 
                      name="linkedin"
                      onChange={(e)=>{e.target.value.length<20 && setInstagram(e.target.value)}}
                      value={instagram}
                      placeholder="Nombre de usuario"
                      className="py-3 rounded-md w-full resize-y text-xs font-Pop-L tracking-wide border-[#e7e6e6] focus:border-[#e7e6e6] focus:ring-0"/>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full space-y-2 mt-6">
                    <div className="font-Pop-R text-xs uppercase text-gray-600">Twitter</div>
                      <input
                      type="text" 
                      name="twitter"
                      onChange={(e)=>{e.target.value.length<20 && setTwitter(e.target.value)}}
                      value={twitter}
                      placeholder="Nombre de usuario"
                      className="py-3 rounded-md w-full resize-y text-xs font-Pop-L tracking-wide border-[#e7e6e6] focus:border-[#e7e6e6] focus:ring-0"/>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full space-y-2 mt-6">
                    <div className="font-Pop-R text-xs uppercase text-gray-600">Facebook</div>
                      <input
                      type="text" 
                      name="linkedin"
                      onChange={(e)=>{e.target.value.length<20 && setFacebook(e.target.value)}}
                      value={facebook}
                      placeholder="Nombre de Usuario"
                      className="py-3 rounded-md w-full resize-y text-xs font-Pop-L tracking-wide border-[#e7e6e6] focus:border-[#e7e6e6] focus:ring-0"/>
                    </div>
                  </div>
                  }    
                </div>

                <div className="flex flex-col divide-y divide-[#e7e6e6] border border-[#e7e6e6] rounded-md mt-6 px-4 text-gray-600">
                  <div className="flex flex-row space-x-4 items-center w-full justify-between py-4">
                    <div className="flex flex-row space-x-4">
                      <FontAwesomeIcon icon={faEyeSlash} style={{color: "#cecdcd",}}/>
                      <div className="tracking-wide uppercase font-Pop-R text-xs">Configuración de Privacidad</div>
                    </div>
                    {openPrivacyLayer? 
                    <button onClick={()=> setOpenPrivacyLayer(false)}><FontAwesomeIcon icon={faChevronUp} style={{color: "#6c3333",}} size="xs"/></button>
                    :<button onClick={()=> setOpenPrivacyLayer(true)}><FontAwesomeIcon icon={faChevronDown} style={{color: "#6c3333",}} size="xs"/></button>}
                    
                  </div>
                  {openPrivacyLayer &&
                  <div className="flex flex-col divide-y divide-[#e7e6e6]">
                    <div className="flex flex-row items-center">
                      <div className="flex flex-col space-y-2 p-4">
                        <div className="font-Pop-R text-sm text-gray-700">Impacto de Vida</div>
                        <div className="font-Pop-L text-[11px] text-gray-600">Si usted activa el imapcto de vida, cuando comparta su perfil, este valor se mostrará.</div>
                      </div>
                      <div className="p-4">
                        <label className="relative inline-flex items-center cursor-pointer h-fit">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked={true} onClick={()=>setShowLifeImpact(!showLifeImpact)}/>
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0F6938]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-row items-center">
                      <div className="flex flex-col space-y-2 p-4">
                        <div className="font-Pop-R text-sm text-gray-700">Total Donado</div>
                        <div className="font-Pop-L text-[11px] text-gray-600">Si usted activa el total donado, cuando comparta su perfil, este valor se mostrará.</div>
                      </div>
                      <div className="p-4">
                        <label className="relative inline-flex items-center cursor-pointer h-fit">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked={true} onClick={()=>setShowAmountDonated(!showAmountDonated)}/>
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0F6938]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-row items-center">
                      <div className="flex flex-col space-y-2 p-4">
                        <div className="font-Pop-R text-sm text-gray-700">Cantidad de Referidos</div>
                        <div className="font-Pop-L text-[11px] text-gray-600">Si usted activa la cantidad de referidos, cuando comparta su perfil, este valor se mostrará.</div>
                      </div>
                      <div className="p-4">
                        <label className="relative inline-flex items-center cursor-pointer h-fit">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked={true} onClick={()=>setShowRefferals(!showRefferals)}/>
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0F6938]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-row items-center">
                      <div className="flex flex-col space-y-2 p-4">
                        <div className="font-Pop-R text-sm text-gray-700">Total Donado por Referidos</div>
                        <div className="font-Pop-L text-[11px] text-gray-600">Si usted activa el total donado por los usuarios referidos, cuando comparta su perfil, este valor se mostrará.</div>
                      </div>
                      <div className="p-4">
                        <label className="relative inline-flex items-center cursor-pointer h-fit">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked={true} onClick={()=>setShowAmountDonatedByReferrals(!showAmountDonatedByReferrals)}/>
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0F6938]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  }
                </div>
                   
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  );
}

const SelectPictureModal = (props) =>{
 
  function closeModal() {
      props.onCloseModal();
  }

  return(
      <>
        <div className="scrollbar-hide darkGreyBg justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="p-10 w-full flex flex-row justify-center">

            <div className="h-fit space-y-4 basis-2/3 md:space-y-9 px-6 md:px-8 lg:px-12 py-6 rounded-md flex flex-col w-auto bg-white outline-none focus:outline-none">
              <button className="w-full text-end font-Pop-B" onClick={closeModal}>X</button>             
              <div className="pb-4 md:pb-8 flex flex-col">
                <div className="uppercase tracking-widest font-Pop-R text-base text-gray-700">Seleccionar Foto de Cabecera</div>
                <div className="p-5 grid grid-cols-3 gap-4">
                  {opcionesFotosCabecera.map((element) => (
                    <button onClick={()=>{props.setPicture(element); closeModal()}} className="">
                      <img className={`h-36 rounded-md object-cover ${element.id===props.picture.id && "border-dashed border-2 border-[#6c3333] "}`} src={element.imagen} alt={element.id} key={element.id} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  );
}
