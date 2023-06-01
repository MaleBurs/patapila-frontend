import React from "react";
import { useCurrentAdmin } from "../../Context/CurrentAdminContext";
import LogoCorazon from "../../Components/Images/LogoCorazon.png";
import logoHerramienta from "../../Components/Images/logoHerramienta.png";
import NiñaSaltandoFondoAmarillo from "../../Components/Images/NinaSaltandoFondoAmarillo.png";
import { useNavigate } from "react-router-dom";

const AdminInformationSection = (props) => {
  const {profilePicture} = useCurrentAdmin();
  const navigate = useNavigate();

  return (
    <>
    <div className = "flex flex-col relative z-10 space-y-4 md:space-y-0 md:flex-row border border-[#e7e6e6] divide-x divide-[#e7e6e6]">
       
        <div className="py-6 pl-6 md:pl-12 lg:pl-24 pr-12 basis-1/2 flex flex-row space-x-5 md:space-x-6 lg:space-x-10 items-center">
            <div className = "flex flex-col justify-center items-start basis-8/10 flex z-10 space-y-1 md:space-y-3 lg:space-y-4 py-1">
                {props.backToHome &&
                <button onClick={()=>navigate("/inicio")} className="font-Pop-L text-xs text-gray-500"> &#60; <span className="underline">Volver al inicio</span> </button>
                }
                <div className="z-10 font-Pop-M tracking-[0.5px] text-sm md:text-lg blackText">{props.title}</div>
                <div className="z-10 font-Pop-L blackText text-xs break-normal">{props.description}</div>
            </div>
        </div> 
    
        <div className = "bg-[#F6F7F3] py-6 pr-6 md:pr-12 lg:pr-24 basis-1/2 md:justify-end items-start flex flex-row space-x-10">
            <div className="flex flex-col justify-center items-center z-10 py-1">
                <button onClick={()=>navigate("/dashboards")} className={`rounded-full w-fit ${props.select==="dashboards" ? "bg-[#fdfcfc] border-[#e7e6e6] border" : "hover:bg-[#fdfcfc] hover:border-[#e7e6e6] hover:border"}`}>
                    <img
                        className="object-cover h-10 w-10 md:h-20 md:w-20 "
                        src={LogoCorazon}
                        alt="ProfilePhoto"
                    />
                </button>
                <div className="flex flex-col space-y-1">
                    <div className="font-Pop-R text-xs text-center">Dashboards</div>
                </div>  
            </div>

            <div className="flex flex-col justify-center items-center z-10 py-1">
                <button onClick={()=>navigate("/reporteSubscripciones")} className={`rounded-full w-fit ${props.select==="reporteSubscripciones" ? "bg-[#fdfcfc] border-[#e7e6e6] border" : "hover:bg-[#fdfcfc] hover:border-[#e7e6e6] hover:border"}`}>
                    <img
                        className="object-cover h-10 w-10 md:h-20 md:w-20 "
                        src={NiñaSaltandoFondoAmarillo}
                        alt="ProfilePhoto"
                    />
                </button>
                <div className="flex flex-col">
                    <div className="font-Pop-R text-xs text-center">Reporte</div>
                    <div className="font-Pop-R text-xs text-center">Subscripciones</div> 
                </div>  
            </div>    

            <div className="flex flex-col justify-center items-center z-10 py-1">
                <button onClick={()=>navigate("/reporteTransacciones")} className={`rounded-full w-fit ${props.select==="reporteTransacciones" ? "bg-[#fdfcfc] border-[#e7e6e6] border " : "hover:bg-[#fdfcfc] hover:border-[#e7e6e6] hover:border"}`}>
                    <img
                        className="object-cover h-10 w-10 md:h-20 md:w-20 "
                        src={logoHerramienta}
                        alt="ProfilePhoto"
                    />
                </button>
                <div className="flex flex-col">
                    <div className="font-Pop-R text-xs text-center">Reporte</div> 
                    <div className="font-Pop-R text-xs text-center">Transacciones</div> 
                </div>  
            </div>

        </div> 
    </div> 
    </>
  );
};
export default AdminInformationSection;
