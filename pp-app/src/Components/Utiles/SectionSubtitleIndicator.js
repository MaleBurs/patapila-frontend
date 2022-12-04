import React from "react";
import "../../App.css"

const SectionSubtitleIndicator = (props) => {
  return (
    <>
    <div className = "flex justify-between flex-row z-10 px-10 md:px-20 basis-1/3 bg-[#f2f5ee] darkGrayBorder py-6 mt-6 md:mt-14">
      <div className = "flex flex-col basis-8/10 flex z-10 space-y-1 md:space-y-2 lg:space-y-2">
          <div className="z-10 font-Pop-M tracking-[0.4px] text-base blackText">{props.title}</div>
          <div className="z-10 font-Pop-L blackText text-xs">{props.subtitle}</div>
      </div>  
      {props.rightSideFunctionality}
    </div> 
    </>
  );
};
export default SectionSubtitleIndicator ;