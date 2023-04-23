import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Tooltip
} from "@material-tailwind/react";
import DonorServices from "../../services/donor.service";
import { useCurrentUser } from "../../Context/CurrentUserContext";

export async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

const CopyLinkSection = () => {
  const {currentUser} = useCurrentUser();
  const [publicProfileURL, setPublicProfileURL] = useState("");
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    DonorServices.getpublicProfileURL(currentUser.id).then(
      (res)=> {setPublicProfileURL(res.data.url)}
    )
}, [currentUser.id])
  const copyLink = () => {
    copyTextToClipboard(publicProfileURL)
      .then(() => {
        setIsLinkCopied(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setIsLinkCopied(false);
  }, [])

  return (
    <>
    <div className="border bg-white rounded-md -mt-5 p-6 space-y-4">
    <div className="font-Pop-M text-sm text-center purpleText"> ¡Haz crecer tu impacto de vida compartiendo tu enlace! </div>
    <div className="font-Pop-L text-xs text-center text-gray-400"> Al compartir tu enlace con tus amigos nos ayudas a llegar a miles de personas más y a expandir nuestra comunidad </div>
    
    <Tooltip 
    className={"font-Pop-L p-3 font-sm z-40"} 
    content={isLinkCopied ? 
        <div className="flex flex-row space-x-1">
            <div>Copiado!</div>
            <FontAwesomeIcon icon={faCheck} color={"white"} className="m-0.5"/>
        </div>:
        "Copiar" }
    placement="top-end">
        <Button onClick={copyLink} className={`shadow-none m-0 rounded-lg purpleBg flex flex-row justify-center space-x-4 w-full py-2 px-0`} data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button" >
        <div className="text-white font-Pop-R text-sm uppercase">Copiar tu enlace</div>
        <div className="py-0"><FontAwesomeIcon icon={[ 'fa', 'link']}  color={"white"} /></div>
        </Button>
    </Tooltip>
    </div>
   </>
  );
};
export default CopyLinkSection;