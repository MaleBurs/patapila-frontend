import { useNavigate } from "react-router-dom"
import React from "react";
import {textos} from "./MakeDonationTexts"

const ModifyDonation = () => {

  const navigate = useNavigate();

  const modifyDonationInSettings = () => {
    navigate("/settings");
  };

  return (
    <>
      <button onClick={modifyDonationInSettings}
        className="rounded-xl p-3 h-auto w-full text-center greenBg yellowBgHover font-Pop-SB text-base text-white">
        {textos.irAjustes}
      </button>
    </>
  )
}

export default ModifyDonation;