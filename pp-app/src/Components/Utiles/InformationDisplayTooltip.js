import React from "react";
import {
  Button,
  Tooltip
} from "@material-tailwind/react";

const InstructionTooltip = (props) => {
  return ( 
    <>
    <Tooltip className="font-Pop-L text-xs p-3 leading-relaxed text-center rounded-md w-36" content={props.tooltipContent} placement="right-start">
      <div className="relative flex h-5 w-5 shaddow-none items-center justify-center" data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button">
        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#7BA391] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7BA391]"></span>
      </div>
    </Tooltip>
    </>              
  );
};

const BasicInfoTooltip = (props) => {
  return ( 
    <>
    <Tooltip className={"font-Pop-R w-52 z-40 p-3 font-xs md:font-sm mt-4 md:mt-7 text-center"} content={props.content} placement="right-start">
      <div className={`shadow-none py-0.5 px-1`} data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button" >
          <div className={`rounded-full bg-[#7BA391] h-4 w-4 text-white text-center font-Pop-L`}>?</div>
      </div>
    </Tooltip>  
    </>              
  );
};

const InformationTooltips ={
  InstructionTooltip,
  BasicInfoTooltip
}

export default InformationTooltips;

