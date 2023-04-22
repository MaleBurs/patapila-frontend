import React from "react"
import "../../App.css"
import AuthService from "../../services/auth.service";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { aQueAyudas } from "../../Values/aQueAyudas";
import { CurrentUserContextProvider } from "../../Context/CurrentUserContext";

const PaginaAgradecimiento = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const categories = aQueAyudas
  return (
    <>
      <CurrentUserContextProvider>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      <UserNavBar navigation={navigationOptions.userNavigation}/>
      {currentUser ? (
        <div className="flex flex-row py-14 justify-center space-x-5">
          <div className="flex flex-col basis-1/4 border rounded-md border-[#e7e6e6]">
            <iframe title="video agradecimiento" className="rounded-t-md" width="full" height="350" src="https://www.youtube.com/embed/YlJuxYNZlII?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <GraciasPorUnirteALaComunidad/>
          </div>
          <div className="flex flex-col basis-1/3 space-y-5">
            <div className="flex flex-col space-y-5 border rounded-md border-[#e7e6e6] p-5 divide-y divide-[#e7e6e6] divide-dashed">
              <DonacionExitosa/>
              <Impacto categories={categories}/>
            </div>
            <button onClick={()=>navigate("/historialDonaciones")} className="purpleBgHover bg-[#6c3333] text-white rounded py-2 px-4 font-Pop-M uppercase text-sm tracking-[0.4px] text-center">Ir a ver mi impacto</button>
          </div>
        </div>
      ) : (
      <></>
    )} 
    </div>
    </CurrentUserContextProvider> 
    </>
  );
};
export default PaginaAgradecimiento;

function GraciasPorUnirteALaComunidad() {
  return <div className="flex flex-col space-y-3 p-5">
    <span className="font-Pop-R text-md">¡Gracias por Contibuír a la Comunidad!</span>
    <div className="flex flex-row"><div className="border-b-2 border-[#eb8301] basis-1/4 justify-start"></div></div>
    <span className="font-Pop-L text-xs tracking-wide leading-5">Somos un grupo de personas comprometidas y apasionadas, que desean acabar con la desnutrición infantil.</span>
  </div>;
}

function DonacionExitosa() {
  return <div className="flex flex-row items-center space-x-5">
    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#0f6938", }} size='3x' />
    <div className="flex flex-col space-y-2">
      <span className="uppercase text-sm font-Pop-R tracking-wide">Donación Exitosa</span>
      <span className="text-xs font-Pop-L tracking-wide leading-5">Con cada donación permitís que nuestra comunidad pueda seguir creciendo</span>
    </div>
  </div>;
}

function Impacto(props) {
  return <div className="flex flex-row -space-x-4 pt-5">
    <div className="flex items-end -ml-4 py-10"><div className="font-Pop-M tracking-[0.7px] -rotate-90 text-xs h-hit text-gray-900">Ayudas a </div></div>
    <div className="flex flex-col -space-y-2">
      {props.categories.map((category) => {
        return (
          <LogoAndImpact category={category} />
        );
      })}
    </div>
  </div>;
}

function LogoAndImpact(props) {
  const category = props.category;  
  return <>
    <div className="flex flex-row">
      <img
        className="object-scale-down w-[60px]"
        src={category.logo}
        alt="title" />
      <div className="text-gray-700 font-Pop-R text-xs tracking-wide flex items-center">
        {category.title}
      </div>
    </div>
  </>;
}
