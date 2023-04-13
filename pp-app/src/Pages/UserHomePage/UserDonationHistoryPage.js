import React from "react";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import { CurrentUserContextProvider} from "../../Context/CurrentUserContext";
import UserInformationSection from "../../Components/Profile/UserInformationSection";
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";
import DonationService from "../../services/donations.service";
import ManoConCorazon from "../../Components/Images/ManoConCorazon.png";
import ImpactChart from "../../Components/Profile/DoughnutChartImpact";

const UserDonationHistoryPage = () => {
  const currentUser = AuthService.getCurrentUser();
  const [lifeImpact, setLifeImpact] = useState(0);
  const [donatedByRefferals, setDonatedByRefferals] = useState(0);

  useEffect(() => {
    DonationService.amountDonatedByRefferals(currentUser.id).then(
      res=>{
        setDonatedByRefferals(res.data.total);
        var total = (res.data.total == null) ? 0 : res.data.total;
        setLifeImpact(currentUser.totalAmountDonated + total);
      }
    )
  }, [currentUser])

  const isAdmin = () => {
    return JSON.stringify((AuthService.getCurrentUser()).roles) === JSON.stringify(["ROLE_ADMIN"]);
  };

  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {(currentUser) ? (
      <>
      {(isAdmin())  ?
        <UserNavBar navigation={navigationOptions.adminNavigation} currentUser={currentUser}/>
          :
        <UserNavBar navigation={navigationOptions.userNavigation} currentUser={currentUser}/>}
        <CurrentUserContextProvider>

          <UserInformationSection
            description="Explorá tu impacto en la comunidad, y el efecto que tiene cada donación en la vida de las personas que más lo necesitan."
            backToHome={true}
            select="impacto"
          ></UserInformationSection>
          
          <div className="flex flex-row md:flex-row px-10 md:px-12 lg:px-32 md:space-x-5 lg:space-x-16 bg-[#f6f7f36b]">
            
            <div className="md:basis-1/2 flex flex-col py-12 space-y-10 container">
              <div className="flex flex-col space-y-3">   
                <div className="font-Pop-L uppercase text-xs">Impacto de Vida</div>
                <div className="flex flex-row space-x-3">
                  <img src={ManoConCorazon} className="w-14 h-14" alt="mano con corazon"/>  
                  <div className="font-Pop-R text-lg">
                    {((lifeImpact/980).toFixed(0) == 0) ?
                    "Todavía no has podido Brindar atención nutricional a ningún niño"
                    :
                    "Has brindado atención nutricional a aproximadamente " + (lifeImpact/980).toFixed(0) + "niños"
                    }
                  </div>
                </div>
                <div className="flex flex-row "><div className="border-b-2 border-[#f4dcbf] basis-1/4 justify-start"></div></div>
                <div className="font-Pop-L text-xs">Su Impacto de por vida reconoce todas sus contribuciones: cada peso donado, recaudado o entregado a través de una afiliación a La Comunidad que usted haya recomendado.</div>
              </div>
            </div>

            <div className="p-5 h-fit flex flex-col space-y-5 md:basis-1/2 bg-white my-12 border border-[#e7e6e6] divide-y divide-[#e7e6e6] divide-dashed basis-1/4 rounded-md">
              
              <div className="flex flex-col space-y-5">
                <div className="flex flex-row">
                  <div className="chart-container" style={{position: 'relative', width:'25vh'}}>
                    <ImpactChart/>
                  </div>
                  <div className="flex flex-col mt-5 -ml-5">
                      <div className="font-Pop-R text-lg text-start">${lifeImpact}</div>
                      <div className="font-Pop-L text-xs text-start italic">Impacto de Vida</div>   
                  </div>
                </div>
                <div className="flex flex-col space-y-1 mx-10">
                  <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                    <span class="inline-flex rounded-full bg-[#f4dcbf] h-3 w-3"></span>
                    <div>${currentUser.totalAmountDonated} donados</div>
                  </div>
                  <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                    <span class="inline-flex rounded-full bg-[#6c3333] h-3 w-3"></span>
                    <div>${donatedByRefferals} donados entre {currentUser.referralsQuantity} referidos</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col py-5 space-y-4">
                <div className="text-[11px] font-Pop-L">Aumente su impacto de por vida donando o compartiendo su perfil y pidiendo a sus amigos que apoyen a nuestra causa.</div>
                <div className="flex flex-row space-x-4">
                  <button className="px-3 py-2 bg-[#6c3333] text-xs font-Pop-R text-white uppercase rounded-md"> Compartir Perfil</button>
                  <button className="px-3 py-2 yellowBg text-xs font-Pop-R text-white uppercase rounded-md"> Donar </button>
                </div>
              </div>

            </div>

          </div>

          <div className="h-32 bg-[#f6f7f36b]"></div>
          <PieDePaginaInformativo/>
        </CurrentUserContextProvider>
        </>
      ) : (
      <></>
    )}
    </div> 
    </>
  );
};
export default UserDonationHistoryPage;


