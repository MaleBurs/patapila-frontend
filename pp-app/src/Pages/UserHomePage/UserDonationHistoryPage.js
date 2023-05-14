import React from "react";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import { CurrentUserContextProvider, useCurrentUser} from "../../Context/CurrentUserContext";
import UserInformationSection from "../../Components/Profile/UserInformationSection";
import { PieDePaginaInformativo } from "../../Components/Utiles/PieDePaginaInformativo";
import DonationService from "../../services/donations.service";
import ManoConCorazon from "../../Components/Images/ManoConCorazon.png";
import ImpactChart from "../../Components/Profile/DoughnutChartImpact";
import YoDono from "../../Components/Images/YoDono.png";
import ActServices from "../../services/activities.service";
import ImageService from "../../services/images.service";
import {CompartirPerfilButton } from "../../Components/Utiles/CopyLinkButton"
import PublicProfileInformationServices from "../../services/publicProfileInformation.service";

const UserDonationHistoryPage = () => {
  const [lifeImpact, setLifeImpact] = useState(0);
  const [donatedByRefferals, setDonatedByRefferals] = useState(0);
  const [registrationYear, setRegistrationYear] = useState(null);
  const [activities, setActivities] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const publicProfileInf = PublicProfileInformationServices.getPublicProfileInf();

  useEffect(() => {
    DonationService.amountDonatedByRefferals(currentUser.id).then(
      res=>{
        setDonatedByRefferals(res.data.total);
        var total = (res.data.total == null) ? 0 : res.data.total;
        setLifeImpact( publicProfileInf.totalAmountDonated+ total);    
      }
    )
  }, [currentUser])


  useEffect(() => {
    AuthService.findUserById(currentUser.id).then(res=>setRegistrationYear((new Date(res.data.createdAt)).getFullYear()))
  }, [currentUser])

  useEffect(() => {
    ActServices.getUserActivities(currentUser.id).then(
      (res)=> {setActivities(res.data)}
    )
}, [currentUser.id])

  function convertToFormattedDate(d){
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(d);
    const formattedDate = date.toLocaleDateString('es-ES', options);
    return formattedDate;
  }
  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {(currentUser) ? (
      <>
        <CurrentUserContextProvider>
        <UserNavBar navigation={navigationOptions.userNavigation}/>

          <UserInformationSection
            description="Explorá tu impacto en la comunidad, y el efecto que tiene cada donación en la vida de las personas que más lo necesitan."
            backToHome={true}
            select="impacto"
          ></UserInformationSection>
          
          <div className="flex flex-col px-10 md:px-12 lg:px-32 divide-y  bg-[#f6f7f36b] divide-[#e7e6e6] divide-dashed">
            <div className="flex flex-row md:flex-row md:space-x-5 lg:space-x-16">
              
              <div className="md:basis-1/2 flex flex-col py-12 space-y-10 container">
                <div className="flex flex-col space-y-3">   
                  <div className="font-Pop-L uppercase text-xs">Impacto de Vida</div>
                  <div className="flex flex-row space-x-3">
                    <img src={ManoConCorazon} className="w-14 h-14" alt="mano con corazon"/>  
                    <div className="font-Pop-R text-lg">
                      {((lifeImpact/980).toFixed(0) === 0) ?
                      "Todavía no has podido Brindar atención nutricional a ningún niño"
                      :
                      "Has brindado atención nutricional a aproximadamente " + (lifeImpact/980).toFixed(0) + " niños"
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
                      <ImpactChart donatedByUser={publicProfileInf.totalAmountDonated} donatedByRefferals={donatedByRefferals}/>
                    </div>
                    <div className="flex flex-col mt-5 -ml-5">
                        <div className="font-Pop-R text-lg text-start">${lifeImpact}</div>
                        <div className="font-Pop-L text-xs text-start italic">Impacto de Vida</div>   
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1 mx-10">
                    <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                      <span className="inline-flex rounded-full bg-[#f4dcbf] h-3 w-3"></span>
                      <div>${publicProfileInf.totalAmountDonated} donados</div>
                    </div>
                    <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
                      <span className="inline-flex rounded-full bg-[#6c3333] h-3 w-3"></span>
                      <div>${donatedByRefferals} donados entre {publicProfileInf.referralsQuantity} referidos</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col py-5 space-y-4">
                  <div className="text-[11px] font-Pop-L">Aumente su impacto de por vida donando o compartiendo su perfil y pidiendo a sus amigos que apoyen a nuestra causa.</div>
                  <div className="flex flex-row space-x-4">
                    <CompartirPerfilButton/>
                    <button className="px-3 py-2 yellowBg text-xs font-Pop-R text-white uppercase rounded-md"> Donar </button>
                  </div>
                </div>

              </div>

            </div>
            <div className="-mt-5 px-24 flex flex-col">
              <div className="font-Pop-R tracking-widest text-xl flex flex-row items-center">
                <img alt="icono de historial" src={YoDono} className="h-auto w-40"/>
                <div>Tu Historial</div>
              </div>
              <div className="p-5 -mt-5 bg-white border border-[#e7e6e6] rounded-md divide-y divide-[#e7e6e6] flex flex-col">
                <div className="flex flex-row p-7 items-center">
                    <div className="basis-1/3 flex flex-col text-center space-y-1">
                      <div className="font-Pop-L text-xs tracking-wide text-gray-700">Te uniste a la comunidad en el año</div>
                      <div className="font-Pop-R text-xl tracking-widest purpleText">{registrationYear}</div>
                    </div>
                    <div className="basis-1/3 flex flex-col text-center space-y-1">
                      <div className="font-Pop-L text-xs tracking-wide text-gray-700">Tus referidos han donado</div>
                      <div className="font-Pop-R text-xl tracking-widest purpleText">${donatedByRefferals}</div>
                    </div>
                    <div className="basis-1/3 flex flex-col text-center space-y-1">
                      <div className="font-Pop-L text-xs tracking-wide text-gray-700">Has donado</div>
                      <div className="font-Pop-R text-xl tracking-widest purpleText">${publicProfileInf.totalAmountDonated}</div>
                    </div>
                </div>

                <div className="flex flex-col space-y-6 p-10">
                {activities.map((activity) => (
                  <>
                    <div key={activity.id} className="flex flex-row items-center space-x-5">
                      <img className="h-12 w-auto" src={ImageService.convertBinaryImageToUsableImage(activity.activityTyped.icon)} alt="icono de actividad"/>  
                      <div className="flex flex-col space-y-2 basis-2/3">
                        <div className="text-xs font-Pop-R tracking-widest purpleText">{activity.activityTyped.title}</div>
                        <div className="text-[11.5px] font-Pop-L tracking-wide text-gray-700">{activity.description}</div>
                      </div>        
                      <div className="text-[13px] font-Pop-L basis-1/3 text-center tracking-widest text-gray-500">{convertToFormattedDate(activity.createdAt.split('T')[0])}</div>  
                    </div>
                  </>
                ))} 
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


