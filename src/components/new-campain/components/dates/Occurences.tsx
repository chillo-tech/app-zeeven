import React, { useState } from 'react'
import { BiPlusCircle } from 'react-icons/bi'

function Occurences() {
  const [displayForm, setDisplayForm] = useState(false);
  const addDate = () => {
    setDisplayForm(!displayForm);
  }
  return (
    <div className='mt-6'>
      <p className="mb-2 text-left p3 text-lg text-app-blue font-semibold border-b border-blue-800">Souhaiter envoyer ce message à d&apos;autres dates ?</p>
      <div className="grid">
          
      </div>
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
