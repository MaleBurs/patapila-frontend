import React from "react";
import { useNavigate } from "react-router-dom"


const InvitationToDonate = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="border bg-white rounded-md p-6 space-y-4 -mt-8 mb-16 md:mb-0">
      <div className="font-Pop-M text-sm text-center purpleText"> ¡Realizá una donación para hacer crecer tu impacto de vida! </div>
      <div className="font-Pop-L text-xs text-center text-gray-400"> El 100% de tus donaciones ayudan a combatir la desnutrición infantil </div>   
        <button onClick={()=>navigate("/donar")} className="shadow-none m-0 rounded-md greenBg flex flex-row justify-center space-x-4 w-full py-3 px-0 text-white font-Pop-M text-sm uppercase">
        Donar ahora
        </button>
    </div>
   </>
  );
};
export default InvitationToDonate;