import React from "react";
import AuthService from "../../services/auth.service";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import { CurrentUserContextProvider} from "../../Context/CurrentUserContext";
import UserInformationSection from "../../Components/Profile/UserInformationSection";
import CopyLinkSection from "../../Components/Profile/CopyLinkSection";
import MilestonesProgress from "../../Components/Profile/MilestonesProgress";
import InvitationToDonate from "../../Components/Profile/InvitationToDonate";
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";

const UserHome = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {(currentUser) ? (
      <>
        <CurrentUserContextProvider>
          <UserNavBar navigation={navigationOptions.userNavigation}/>
          <UserInformationSection
            description="Bienvenido a tu perfil, una página de recaudación de fondos que puedes personalizar y compartir. ¡Todas las donaciones realizadas en tu perfil aumentarán tu Impacto de Vida!"
            backToHome={false}
          ></UserInformationSection>
          
          <div className="flex flex-col md:flex-row px-10 md:px-12 lg:px-32 md:space-x-5 lg:space-x-16 bg-[#f6f7f36b]">
            <div className="md:basis-3/5">
              <MilestonesProgress/>
              <InvitationToDonate/>
            </div>
            <div className="md:basis-2/5 flex flex-col space-y-4">
              <CopyLinkSection/>
              <div className="flex flex-col space-y-2 p-8 border border-[#e7e6e6] rounded-md">
                <div className="font-Pop-R text-sm text-gray-700 tracking-widest">Descripción de PataPila:</div>
                <div className="font-Pop-L text-xs text-gray-500 tracking-wide text-justify leading-4">Somos una Asociación Civil sin fines de lucro que vive y trabaja junto a comunidades en situación de vulnerabilidad del norte salteño. Nuestros ejes de trabajo son la prevención de la desnutrición infantil, la promoción humana, la educación integral y el desarrollo comunitario.</div>
              </div>
            </div>
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
export default UserHome;