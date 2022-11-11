import React, {useEffect} from "react";
import ManoConCorazon from "../../Components/Images/ManoConCorazon.png";
import InformationTooltips from "../Utiles/InformationDisplayTooltip";
import { useCurrentUser } from "../../Context/CurrentUserContext";
import AuthService from "../../services/auth.service";

import AdminServices from "../../services/transactions.service";

const UserInformationSection = () => {
  const {currentUser, profilePictureURL} = useCurrentUser();
  const {lifeImpact, setLifeImpact} = React.useState(432);

  return (
    <>
    <div className = "flex flex-col space-y-4 md:space-y-0 md:flex-row z-10 px-6 md:px-12 lg:px-32 basis-1/3 bg-[#F6F7F3] border border-[#E3E7DA] py-6 md:py-10 lg:py-8 mt-6 md:mt-14">
        <div className="basis-2/3 flex flex-row space-x-5 md:space-x-6 lg:space-x-10 items-center ">
            {profilePictureURL ? 
            <img
                className="object-cover h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded "
                src={profilePictureURL}
                alt="ProfilePhoto"
            />
            :null}
            <div className = "flex flex-col justify-center basis-8/10 flex z-10 space-y-1 md:space-y-3 lg:space-y-4 py-1">
                <div className="z-10 font-Pop-SB tracking-[0.5px] text-base md:text-lg blackText">{currentUser.name} {currentUser.lastname}</div>
                <div className="z-10 font-Pop-L blackText text-xs lg:text-sm break-normal">Me uni a pata pila en el año 2020, para conbatir la desnutrición infantil. Se que toda donación impacta en la salud física y psicologica de cada niño.</div>
            </div>
        </div> 

        <div className = "basis-1/3 md:justify-end flex">
            <div className="flex flex-col justify-center z-10 space-y-1 py-1">
                
                <div className="flex flex-row items-center justify-center space-x-4">
                <div className="font-Pop-R text-xl md:text-2xl text-center ">{lifeImpact}</div>
                <img
                    className="object-cover h-10 w-10 md:h-14 md:w-14 "
                    src={ManoConCorazon}
                    alt="ProfilePhoto"
                />
                </div>

                <div className="flex flex-row space-x-1">
                <div className="font-Pop-L text-xs md:text-sm text-start">Impacto de Vida</div>   
                <InformationTooltips.BasicInfoTooltip content="Tu Impacto de Vida representa el total que donaste, gracias a una subscripción o a donaciones de una única vez, y el total de referidos a Para Pila, gracias a haber compartido tu link."/> 
                </div>
            </div>
        </div> 
    </div> 
    </>
  );
};
export default UserInformationSection;