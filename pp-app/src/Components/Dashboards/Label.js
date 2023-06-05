import React from 'react';

export default function Label(props) {

  return (
    <>      
        <div className="greyBg darkGrayBottomBorder flex  flex-col space-y-1 p-7">
            <div className="flex flex-[0_0_auto] pt-1 blackText font-Pop-SB uppercase text-lg tracking-wider">{props.title}</div>
            <div className="flex flex-[0_0_auto] blackText font-Pop-M uppercase text-lg tracking-wider">{props.subtitle}</div>
        </div>         
    </>
  );
}

