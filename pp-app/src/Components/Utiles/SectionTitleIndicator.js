import React from "react";
import "../../App.css"

const SectionTitleIndicator = (props) => {
  return (
    <>
    <div className = "flex justify-between flex-row z-10 px-10 md:px-20 basis-1/3 greyBg darkGrayBorder py-8 md:py-10 lg:py-8 mt-6 md:mt-14">
      <div className = "flex flex-col basis-8/10 flex z-10 space-y-1 md:space-y-3 lg:space-y-4">
          <div className="z-10 font-Pop-SB tracking-[0.8px] text-lg blackText">{props.title}</div>
          <div className="z-10 font-Pop-L blackText text-sm">{props.subtitle}</div>
      </div>  
      {props.rightSideFunctionality}
    </div> 
    </>
  );
};
export default SectionTitleIndicator;