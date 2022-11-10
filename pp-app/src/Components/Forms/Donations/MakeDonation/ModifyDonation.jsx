import { useNavigate } from "react-router-dom"
import React from "react";

const ModifyDonation = () => {

  const navigate = useNavigate();

  const modifyDonationInSettings = () => {
    navigate("/settings");
  };

  return (
    <>
      <button onClick={modifyDonationInSettings}
        className="rounded-xl p-3 h-auto w-full text-center greenBg yellowBgHover font-Pop-SB text-base text-white">
        Ir a Ajustes
      </button>
    </>
  )
}

export default ModifyDonation;