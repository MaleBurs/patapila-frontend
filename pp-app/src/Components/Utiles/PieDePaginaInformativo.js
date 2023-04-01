import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import LogoPataPilaAislado from "../../Components/Images/LogoPataPilaAislado.png";

export function PieDePaginaInformativo() {
  return <div>
    <div className="flex flex-row pb-1">
      <div className="basis-1/3"></div>
      <div className="basis-1/3 flex justify-center">
        <img
          className="object-scale-down w-[190px] -mt-24 z-10"
          src={LogoPataPilaAislado} />
      </div>
      <div className="basis-1/3 flex flex-row pt-1 justify-end px-10 space-x-5">
        <button onClick={() => window.location.replace("https://www.facebook.com/patapila.org/")} className="greenColorHover color-[#2e2a25]"><FontAwesomeIcon icon={faFacebookF} size="lg" /></button>
        <button onClick={() => window.location.replace("https://www.instagram.com/patapilaok/")} className="greenColorHover color-[#2e2a25]"><FontAwesomeIcon icon={faInstagram} size="lg" /></button>
        <button onClick={() => window.location.replace("https://www.youtube.com/channel/UCsayiL-Rh95W6d_usuoG_Kg")} className="greenColorHover color-[#2e2a25]"><FontAwesomeIcon icon={faYoutube} size="lg" /></button>
        <button onClick={() => window.location.replace("https://twitter.com/patapilaok")} className="greenColorHover color-[#2e2a25]"><FontAwesomeIcon icon={faTwitter} size="lg" /></button>
        <button onClick={() => window.location.replace("https://www.linkedin.com/company/pata-pila")} className="greenColorHover color-[#2e2a25]"><FontAwesomeIcon icon={faLinkedinIn} size="lg" /> </button>
      </div>
    </div>
    <div className="flex flex-row justify-between px-10 pb-4 font-Pop-L text-xs text-gray-900">
      <div>All rights reserved</div>
      <div>© 2022 Pata Pila Asociación Civil</div>
    </div>
  </div>;
}
