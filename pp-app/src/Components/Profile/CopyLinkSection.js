import React from "react";
import { CopyLinkButton } from "../Utiles/CopyLinkButton";

const CopyLinkSection = () => {

  return (
    <>
    <div className="border bg-white rounded-md -mt-5 p-6 space-y-4">
    <div className="font-Pop-M text-sm text-center purpleText"> ¡Haz crecer tu impacto de vida compartiendo tu enlace! </div>
    <div className="font-Pop-L text-xs text-center text-gray-400"> Al compartir tu enlace con tus amigos nos ayudas a llegar a miles de personas más y a expandir nuestra comunidad </div>
    
    <CopyLinkButton/>
    </div>
   </>
  );
};
export default CopyLinkSection;


