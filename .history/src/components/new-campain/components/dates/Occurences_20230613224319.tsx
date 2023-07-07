import React from 'react'
import { BiPlusCircle } from 'react-icons/bi'

function Occurences() {
  const addDate = () => {
    
  }
  return (
    <div className='mt-6'>
      <p className="mb-2 text-left p3 text-lg text-blue-800 font-semibold border-b border-blue-800">Souhaiter envoyer ce message à d&apos;autres dates ?</p>
      <ul>
        <li> 
            <button type="button" className="add-date_button" onClick={addDate}>
              Ajouter une date <BiPlusCircle className='ml-2'/> 
            </button> 
          </li>
      </ul>
    </div>
  )
}

export default Occurences
