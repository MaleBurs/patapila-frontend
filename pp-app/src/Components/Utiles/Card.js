import React from "react";
import "../../App.css"

const Card = (props) => {
  return (
    <>
    <div className={`border border-[#e7e6e6] rounded-md flex flex-col ${props.width}`}>
        <div className="flex flex-row justify-between greyBg darkGrayBottomBorder p-6 blackText font-Pop-M text-sm tracking-widest">
          <div className="flex flex-col space-y-1">
            <div> {props.title}</div>
            <div> {props.subtitle}</div>
          </div>
          {props.popup}
        </div>
        {props.content}
    </div>
    
    </>
  );
};
export default Card;