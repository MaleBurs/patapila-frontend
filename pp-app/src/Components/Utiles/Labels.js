import React from "react"
import "../NavBars/navBar.css";
import "../../App.css"

const FilterLabel = ({ text}) => {
  return (
    <>   
    <div className='font-Pop-R text-gray-500 text-xs'>{text}</div>
    </>
  )
}

const Labels = {
  FilterLabel
}
export default Labels;
