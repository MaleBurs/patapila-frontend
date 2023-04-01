import React from 'react';

export function SectionTextAndLogo(props) {
  return <div className="flex flex-col yellowBg justify-center items-center px-56 py-10 text-white space-y-6">
    <img
      className="object-scale-down w-[140px]"
      src={props.logo}
      alt="title" />
    <div className="font-medium tracking-[0.2px] text-3xl font-Pop-B text-justify">
      {props.heather}
    </div>
    <div className="font-medium tracking-[0.2px] text-base font-Pop-M text-center">
      {props.text}
    </div>
    {props.activeButton &&
      <button onClick={props.buttonFunction} className="greenBg purpleBgHover rounded-lg py-3 px-4 font-Pop-M w-fit uppercase text-base tracking-[0.4px] flex justify-start">
        {props.buttonText}
      </button>}
  </div>;
}
