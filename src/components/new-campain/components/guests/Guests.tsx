import React, {useContext, useState} from 'react'
import BottomBar from '../BottomBar';
import {NewCampainContext} from '@/context/NewCampainContext';
import GuestEdit from './GuestEdit';
import GuestList from './GuestList';
import {Guest} from '@/types/Guest';
import {GUESTS_OPTIONS} from '@/utils/index';
import {FaFileCsv, FaWpforms} from 'react-icons/fa';
import {BsArrowRightShort} from 'react-icons/bs';
import CsvFile from '@/components/csv-file/CsvFile';

function Guests() {
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain: {guests = []}}, updateCampain, previousStep} = context;
	const [displayedSection, setDisplayedSection] = useState("OPTIONS");

	const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
	const [contacts, setContacts] = useState(guests);
	const addContact = (data: Guest) => {
		setContacts([...contacts, data])
	};
	const removeContact = (contactToRemove: Guest) => {
		setContacts(contacts.filter((contact: any) => (`${contactToRemove.phoneIndex}${contactToRemove.phone}` !== `${contact.phoneIndex}${contact.phone}`)))
	};
	const saveContacts = (event: any) => {
		event.preventDefault();
		if (contacts.length) {
			updateCampain({guests: contacts});
			setDisplayErrorMessage(false);
		} else {
			setDisplayErrorMessage(true);
		}
	}

	function display(id: string): void {
		setDisplayedSection(id);
	}


	return (
		<div className="rounded-lg bg-white md:p-5 p-4 border border-slate-200 shadow-sm">
			<div id="contacts"
				 className="w-full flex flex-col md:flex-row justify-between mb-8 items-center text-md lg:text-lg">
				<p className='flex flex-col'>
					<span className="text-app-blue font-semibold text-xl">A qui transmettre votre message</span>
					<span className="text-gray-500 text-sm">Choisissez comment vous voulez ajouter des contacts</span>
				</p>
			</div>
			{
				displayedSection === "OPTIONS" ?
					(
						<>
							<article
								className="bg-white border border-gray-10 rounded-lg p-4 grid md:grid-cols-2 mb-10 gap-8 md:h-56 items-center">
								{GUESTS_OPTIONS.map((option, index) => (
									<button
										onClick={() => display(option.id)}
										type="button"
										key={`${index}-${option.id}`}
										className="relative border border-gray-200 flex hover:bg-gray-50 rounded-lg items-center">
										<BsArrowRightShort
											className="absolute top-1/3 right-3 text-3xl text-3xl text-app-blue font-thin"/>
										<span className="icon flex flex-column items-center justify-center px-5">
										{option.id === "CSV" ? (<FaFileCsv className="text-3xl text-app-blue"/>) : null}
											{option.id === "FORM" ? (
												<FaWpforms className="text-3xl text-app-blue"/>) : null}
									</span>
										<span className="flex flex-col items-start pl-3 py-4 border-l border-gray-200">
										<span className="text-gray-700">{option.sublabel}</span>
										<span
											className="text-app-blue text-xl uppercase font-medium">{option.label}</span>
									</span>
									</button>
								))}
							</article>
						</>
					)
					: null
			}

			{
				displayedSection === "FORM" ?
					(
						<>

							<p className="flex items-center justify-end py-3">
								<button
									onClick={() => display("OPTIONS")}
									className="relative text-app-blue text-md font-semibold flex hover:bg-gray-50 rounded-lg items-center">
									Changer
								</button>
							</p>
							<article className="bg-white border border-gray-10 rounded-lg p-4  items-center">
								<p className="text-app-blue text-xl font-semibold">Saisissez chaque contact et cliquez
									sur <span className="font-cold">enregistrer</span>.</p>
								<div aria-describedby='contacts'>
									<GuestEdit handleSubmit={addContact}/>
								</div>
							</article>
						</>
					)
					: null
			}

			{
				displayedSection === "CSV" ?
					(
						<>
							<CsvFile display={display} setContacts={setContacts}/>
						</>
					)
					: null
			}
			{contacts.length ? <GuestList guests={contacts} remove={removeContact}/> : null}

			<form onSubmit={saveContacts}>
				<BottomBar
					stepIndex={stepIndex}
					nextDisabled={false}
					previousStep={previousStep}
				/>

				{displayErrorMessage ?
					<p className='text-red-600'>
						Veuillez saisir au moins un contact et cliquer sur <span className='font-extrabold'>Insérer dans la liste</span>
					</p> : null}
			</form>
		</div>
	)
}

export default Guests
