import React from 'react'
import "../../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

function GoBackSection(props) {

  return (
    <div className='space-y-6'>
      <div className='flex flex-col space-y-14'>
        <div className='bg-white rounded-xl shadow-sm px-10 py-6 darkGrayBorder'>
          <button onClick={()=>props.closeSection()} className="flex flex-row bg-gray-300 py-2 px-2 rounded-2xl"> 
            <FontAwesomeIcon icon={faChevronLeft} color="white" size='3' />
          </button>

          {props.content}

        </div>
      </div>
    </div>
  )
}

export default GoBackSection;