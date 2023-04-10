import React from "react";
import "../../App.css"

const TwoColumnsPage = (props) => {
  return (
    <>
    <div className = "px-10 md:px-20 lg:basis-3/4 flex flex-col lg:flex-row w-full lg:space-x-10 space-y-10 lg:space-y-0">
        <div className="lg:basis-1/2 flex flex-col space-y-10">
           {props.column1}
        </div>
        <div className="lg:basis-1/2 flex flex-col space-y-10">
            {props.column2}
        </div>  
    </div>  
    </>
  );
};
export default TwoColumnsPage;