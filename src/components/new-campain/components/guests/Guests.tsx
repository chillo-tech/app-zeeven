import React, { useContext,useState } from 'react'
import  BottomBar  from '../BottomBar';
import { NewCampainContext } from '../../../../context/NewCampainContext';
import { BsPlusCircle } from 'react-icons/bs';
import { ImUserPlus } from 'react-icons/im';
import GuestEdit from './GuestEdit';
import GuestList from './GuestList';
import { Guest } from '../../../../types/Guest';

function Guests() {
  const context = useContext(NewCampainContext);
  const {state: {stepIndex, campain: {invites = []}}, updateCampain, previousStep} = context;
  const [formVisible, setFormVisible] = useState(true);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [contacts, setContacts] = useState(invites);
	const addContact = (data: Guest) => {
		setContacts([...contacts, data])
	};
  const removeContact = (contactToRemove: Guest) => {
    setContacts(contacts.filter((contact: any) => (`${contactToRemove.phoneIndex}${contactToRemove.phone}` !== `${contact.phoneIndex}${contact.phone}`)))
	};
  const saveContacts = (event: any) => {
    event.preventDefault();
    if(contacts.length) {
      updateCampain({guests: contacts});
      setDisplayErrorMessage(false);
    } else {
      setDisplayErrorMessage(true);
    }
  }
  return (
    <div className="rounded-lg bg-white md:p-5 p-4 border border-slate-200 shadow-sm">
        <div id="contacts" className="w-full flex flex-col md:flex-row justify-between mb-8 items-center text-md lg:text-lg">
          <p className='flex flex-col'>
            <span className="text-blue-800 font-semibold">A qui transmettre votre message</span>
            <span className="text-gray-500 text-sm">Saisissez chaque contact sur une ligne. <br/>Séparez les informations par une virgule(Exemple: Mlle,Emmanuelle,BERNARD,...)</span>
          </p>
          <button type='button' className='hidden md:block border-4 border-blue-800 rounded-full w-12 h-12' onClick={() => setFormVisible(!formVisible)}>
            <ImUserPlus className='text-3xl text-blue-800'/>
          </button>
          
          <button type='button' className='md:hidden flex items-center justify-center my-4 py-2 text-lg border text-blue-800 border-blue-800 rounded-lg w-full' onClick={() => setFormVisible(!formVisible)}>
          <BsPlusCircle className='text-3xl text-blue-800 mr-2'/> Ajouter un contact
          </button> 
        </div>
        <div aria-describedby='contacts'>
          {formVisible ? <GuestEdit handleSubmit={addContact} /> : null }
          {contacts.length ? <GuestList guests={contacts} remove={removeContact} /> : null }
        </div>
        <form onSubmit={saveContacts}>
          <BottomBar
            stepIndex={stepIndex}
            nextDisabled={false}
            previousStep={previousStep}
          />

          {displayErrorMessage ? 
          <p className='text-red-600'>
            Veuillez saisir au moins un contact et cliquer sur <span className='font-extrabold'>Insérer dans la liste</span>
          </p> : null }
        </form>
    </div>
  )
}

export default Guests