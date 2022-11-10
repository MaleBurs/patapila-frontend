import React from "react";
import "../../App.css"

const InformationColumn = (props) => {
  return (
    <>
    <div className="px-7 pt-4 pb-7 space-y-3 md:space-y-6 ">
    {props.information.map((data) => {
        return (
            <div key={data.title} className="blackText flex flex-col space-y-2">
                <div className="tracking-wide font-Pop-M text-base uppercase blackText">{data.title}</div>
                <div className="font-Pop-R text-sm">{data.information}</div>
            </div>
    );})} 
    </div>
    </>
  );
};
export default InformationColumn;