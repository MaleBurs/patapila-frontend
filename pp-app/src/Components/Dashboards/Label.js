import React from 'react';

export default function Label(props) {

  return (
    <>      
        <div className="greyBg  rounded-md flex  flex-col space-y-2 p-4 w-56">
            <div className="flex flex-[0_0_auto] leading-relaxed pt-1 blackText font-Pop-R uppercase text-sm tracking-widest">{props.title}</div>
            <div className="flex flex-[0_0_auto] blackText font-Pop-R uppercase text-sm tracking-widest">{props.subtitle}</div>
        </div>         
    </>
  );
}

