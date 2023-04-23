import React from "react";
import { useCurrentUser } from "../../Context/CurrentUserContext";
import LogoCorazon from "../../Components/Images/LogoCorazon.png";
import logoHerramienta from "../../Components/Images/logoHerramienta.png";
import NiñaSaltandoFondoAmarillo from "../../Components/Images/NinaSaltandoFondoAmarillo.png";
import { useNavigate } from "react-router-dom";

const UserInformationSection = (props) => {
  const {currentUser, profilePicture} = useCurrentUser();
  const navigate = useNavigate();

  return (
    <>
    <div className = "flex flex-col space-y-4 md:space-y-0 md:flex-row z-10 basis-1/3 border border-[#e7e6e6] mt-6 md:mt-14 divide-x divide-[#e7e6e6]">
       
        <div className="py-6 pl-6 md:pl-12 lg:pl-24 pr-12 basis-1/2 flex flex-row space-x-5 md:space-x-6 lg:space-x-10 items-center">
            {profilePicture!=="null" ? 
            <img
                className="object-cover h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded "
                src={profilePicture}
                alt="ProfilePhoto"
            />
            :null}
            <div className = "flex flex-col justify-center items-start basis-8/10 flex z-10 space-y-1 md:space-y-3 lg:space-y-4 py-1">
                {props.backToHome &&
                <button onClick={()=>navigate("/inicio")} className="font-Pop-L text-xs text-gray-500"> &#60; <span className="underline">Volver al inicio</span> </button>
                }
                <div className="z-10 font-Pop-M tracking-[0.5px] text-sm md:text-lg blackText">Hola, {currentUser.name}</div>
                <div className="z-10 font-Pop-L blackText text-xs break-normal">{props.description}</div>
            </div>
        </div> 
    
        <div className = "bg-[#F6F7F3] pt-6 pb-10 pr-6 md:pr-12 lg:pr-24 basis-1/2 md:justify-end items-start flex flex-row space-x-10">
            <div className="flex flex-col justify-center items-center z-10 py-1">
                <button onClick={()=>navigate("/historialDonaciones")} className={`rounded-full w-fit ${props.select==="impacto" ? "bg-[#fdfcfc] border-[#e7e6e6] border" : "hover:bg-[#fdfcfc] hover:border-[#e7e6e6] hover:border"}`}>
                    <img
                        className="object-cover h-10 w-10 md:h-20 md:w-20 "
                        src={LogoCorazon}
                        alt="ProfilePhoto"
                    />
                </button>
                <div className="flex flex-col space-y-1">
                    <div className="font-Pop-R text-xs text-center underline">Mi Impacto</div> 
                    <div className="font-Pop-L text-[10.5px] text-center w-32" >Ver mis donaciones y mi impacto de vida.</div>
                </div>  
            </div>

            <div className="flex flex-col justify-center items-center z-10 py-1">
                <button onClick={()=>navigate("/miPerfil")} className={`rounded-full w-fit ${props.select==="miPerfil" ? "bg-[#fdfcfc] border-[#e7e6e6] border" : "hover:bg-[#fdfcfc] hover:border-[#e7e6e6] hover:border"}`}>
                    <img
                        className="object-cover h-10 w-10 md:h-20 md:w-20 "
                        src={NiñaSaltandoFondoAmarillo}
                        alt="ProfilePhoto"
                    />
                </button>
                <div className="flex flex-col space-y-1">
                    <div className="font-Pop-R text-xs text-center underline">Mi Perfil</div> 
                    <div className="font-Pop-L text-[10.5px] text-center w-32" >Ver y configurar mi perfil público, para compartirlo con amigos.</div>
                </div>  
            </div>    

            <div className="flex flex-col justify-center items-center z-10 py-1">
                <button onClick={()=>navigate("/settings")} className={`rounded-full w-fit ${props.select==="ajustes" ? "bg-[#fdfcfc] border-[#e7e6e6] border " : "hover:bg-[#fdfcfc] hover:border-[#e7e6e6] hover:border"}`}>
                    <img
                        className="object-cover h-10 w-10 md:h-20 md:w-20 "
                        src={logoHerramienta}
                        alt="ProfilePhoto"
                    />
                </button>
                <div className="flex flex-col space-y-1">
                    <div className="font-Pop-R text-xs text-center underline">Ajustes</div> 
                    <div className="font-Pop-L text-[10.5px] text-center w-32" >Administra la configuracion de tu perfil.</div>
                </div>  
            </div>
        </div> 
    </div> 
    </>
  );
};
export default UserInformationSection;
