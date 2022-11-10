import React from "react";
import "../../App.css"

const Card = (props) => {
  return (
    <>
    <div className={`darkGrayBorder rounded-lg flex flex-col ${props.width}`}>
        <div className="flex flex-row justify-between greyBg darkGrayBottomBorder p-6 blackText font-Pop-M uppercase text-base tracking-wider">
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