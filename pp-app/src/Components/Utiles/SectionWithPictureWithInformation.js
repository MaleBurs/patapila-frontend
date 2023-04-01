import React from 'react';

export function SectionWithPictureWithInformation(props) {
  return <div className={` ${props.backgoundColor} py-6 md:py-10 lg:px-16 flex space-y-2 flex-col sm:flex-col md:flex-col lg:flex-row`}>
    <div className="flex justify-center items-center basis-1/2 mx-10 lg:ml-30 -mt-3">
      <img
        className="object-scale-down my-auto w-auto mt-10"
        src={props.picture}
        alt="title" />
    </div>
    <div className="basis-1/2 space-y-5 py-8 grid justify-start font-Pop-SB text-white text-2xl tracking-[0px] mx-10 lg:mx-30">
      <img
        className="object-scale-down w-[240px]"
        src={props.logo}
        alt="title" />
      <div className='font-medium tracking-[0.2px] text-xl text-gray-700 font-Pop-SB text-justify'>
        {props.heather}
      </div>
      <div className="font-medium tracking-[0.2px] text-base text-gray-700 font-Pop-R text-justify">
        {props.text}
      </div>
      {props.activeButton &&
      <button onClick={props.buttonFunction} className="yellowBg greenBgHover rounded-lg py-3 px-4 font-Pop-M w-fit uppercase text-base tracking-[0.4px] flex justify-start">
        {props.buttonText}
      </button>
      }
    </div>
  </div>;
}
