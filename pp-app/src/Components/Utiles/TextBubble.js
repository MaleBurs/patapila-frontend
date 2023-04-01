import React from 'react';

export function TextBubble(props) {
  return (
  <div className="flex flex-col justify-end p-2 md:p-10 lg:p-20 mt-5 lg:mt-10 lg:basis-1/2 font-Pop-B text-white text-2xl tracking-[0px] mx-10 lg:mx-30">
    <div className="mt-5">
      {props.title}
    </div>
    <div className="font-medium tracking-[0.2px] text-base text-white font-Pop-M mt-8 text-justify">
      {props.text}
    </div>
  </div>)
  ;
}
