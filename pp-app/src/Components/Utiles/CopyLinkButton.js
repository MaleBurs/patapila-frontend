import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Tooltip
} from "@material-tailwind/react";
import { useCurrentUser } from "../../Context/CurrentUserContext";


export async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}
export const CopyLinkButton = () => {
  const { publicProfileInf } = useCurrentUser();
  const [publicProfileURL, setPublicProfileURL] = useState("");
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    setPublicProfileURL("http://localhost:3000/signup/"+publicProfileInf.publicProfileUrl); 
  }, [publicProfileInf]);
  const copyLink = () => {
    copyTextToClipboard(publicProfileURL)
      .then(() => {
        setIsLinkCopied(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLinkCopied(false);
  }, []);
  return <Tooltip
    className={"font-Pop-L p-3 font-sm z-40"}
    content={isLinkCopied ?
      <div className="flex flex-row space-x-1">
        <div>Copiado!</div>
        <FontAwesomeIcon icon={faCheck} color={"white"} className="m-0.5" />
      </div> :
      "Copiar"}
    placement="top-end">
    <Button onClick={copyLink} className={`shadow-none m-0 rounded-lg purpleBg flex flex-row justify-center space-x-4 w-full py-2 px-0`} data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button">
      <div className="text-white font-Pop-R text-sm uppercase">Copiar tu enlace</div>
      <div className="py-0"><FontAwesomeIcon icon={['fa', 'link']} color={"white"} /></div>
    </Button>
  </Tooltip>;
};

export const CompartirPerfilButton = () => {
  const { publicProfileInf } = useCurrentUser();
  const [publicProfileURL, setPublicProfileURL] = useState("");
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    setPublicProfileURL("http://localhost:3000/signup/"+publicProfileInf.publicProfileUrl); 
  }, [publicProfileInf]);
  const copyLink = () => {
    copyTextToClipboard(publicProfileURL)
      .then(() => {
        setIsLinkCopied(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLinkCopied(false);
  }, []);
  return <Tooltip
    className={"font-Pop-L p-3 font-xs z-40"}
    content={isLinkCopied ?
      <div className="flex flex-row space-x-1">
        <div>Enlace Copiado! Ahora comparti tu perfil</div>
        <FontAwesomeIcon icon={faCheck} color={"white"} className="m-0.5" />
      </div> :
      "Copiar"}
    placement="top-end">
   <button onClick={copyLink} className="px-3 py-2 bg-[#6c3333] text-xs font-Pop-R text-white uppercase rounded-md"> Compartir Perfil</button>
  </Tooltip>;
};
