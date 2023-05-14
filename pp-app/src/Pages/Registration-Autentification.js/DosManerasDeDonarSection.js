import React from 'react';
import CorazonSinColor from "../../Components/Images/CorazonSinColor.png";
import ManoConPlata from "../../Components/Images/ManoConPlata.png";

export function DosManerasDeDonarSection() {
  return <div className="mx-10 mt-32 flex flex-col items-center">
    <div className="font-Pop-B tracking-[0.7px] text-[#2e2a25] text-4xl mb-10">
      Dos Maneras de Donar
    </div>
    <div className="flex flex-row">

      <div className="flex flex-col my-5 space-x-7 items-center basis-1/2 space-y-5">
        <img
          className="object-scale-down w-[110px]"
          src={CorazonSinColor}
          alt="title" />

        <button onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className="font-Pop-M text-lg text-white uppercase rounded-lg yellowBg greenBgHover w-fit px-6 py-3">
          Involucrate
        </button>
        <div className="font-Pop-M text-base text-white tracking-[0.7px] px-16 text-center">
          Registrate para ser parte de la comunidad. Podrás suscribirte para donar todos los meses, donar cuando lo desees, llevar un registro de tus donaciones y compartir tu impacto con amigos!
        </div>
      </div>
      <div className="flex flex-col my-5 space-x-7 items-center basis-1/2 space-y-5">
        <img
          className="object-scale-down w-[110px]"
          src={ManoConPlata}
          alt="title" />

        <button onClick={() => window.location.replace("http://donar.patapila.org/comunidad")} className="font-Pop-M text-lg text-white uppercase rounded-lg yellowBg greenBgHover w-fit px-6 py-3">
          Dona
        </button>
        <div className="font-Pop-M text-base text-white tracking-[0.7px] px-16 text-center">
          Dona una una vez para ayudarnos a combatir la desnutrición infantil.
        </div>
      </div>

    </div>
  </div>;
}
