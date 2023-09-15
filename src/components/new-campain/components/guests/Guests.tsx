import CsvFile from '@/components/csv-file/CsvFile';
import { NewCampainContext } from '@/context/NewCampainContext';
import { Guest } from '@/types/Guest';
import { GUESTS_OPTIONS } from '@/utils/index';
import { useContext, useState } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaFileCsv, FaWpforms, FaUserCircle } from 'react-icons/fa';
import BottomBar from '../BottomBar';
import GuestEdit from './GuestEdit';
import GuestList from './GuestList';
import ContactSelection from '@/components/contacts/ContactSelection';

function Guests() {
  const context = useContext(NewCampainContext);
  const {
    state: {
      stepIndex,
      campain: { guests = [] },
    },
    updateCampain,
    previousStep,
  } = context;
  const [displayedSection, setDisplayedSection] = useState('OPTIONS');

  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [contacts, setContacts] = useState(guests);
  const addContact = (data: Guest) => {
    setContacts([...contacts, data]);
  };
  const removeContact = (contactToRemove: Guest) => {
    setContacts(
      contacts.filter(
        (contact: any) =>
          `${contactToRemove.phoneIndex}${contactToRemove.phone}` !==
          `${contact.phoneIndex}${contact.phone}`
      )
    );
  };
  const saveContacts = (event: any) => {
    event.preventDefault();
    if (contacts.length) {
      updateCampain({ guests: contacts });
      setDisplayErrorMessage(false);
    } else {
      setDisplayErrorMessage(true);
    }
  };

  function display(id: string): void {
    setDisplayedSection(id);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div
        id="contacts"
        className="text-md mb-8 flex w-full flex-col items-center justify-between md:flex-row lg:text-lg"
      >
        <p className="flex flex-col">
          <span className="text-xl font-semibold text-app-blue">
            A qui transmettre votre message
          </span>
          <span className="text-sm text-gray-500">
            Choisissez comment vous voulez ajouter des contacts
          </span>
        </p>
      </div>
      {displayedSection === 'OPTIONS' ? (
        <>
          <article className="mb-10 grid items-center gap-8 rounded-lg md:h-56 md:grid-cols-2">
            {GUESTS_OPTIONS.map((option, index) => (
              <button
                onClick={() => display(option.id)}
                type="button"
                key={`${index}-${option.id}`}
                className="relative flex items-center rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <BsArrowRightShort className="absolute right-3 top-1/3 text-3xl text-3xl font-thin text-app-blue" />
                <span className="icon flex-column flex items-center justify-center px-5">
                  {option.id === 'CSV' ? <FaFileCsv className="text-3xl text-app-blue" /> : null}
                  {option.id === 'CONTACTS' ? <FaUserCircle className="text-3xl text-app-blue" /> : null}
                  {option.id === 'FORM' ? <FaWpforms className="text-3xl text-app-blue" /> : null}
                </span>
                <span className="flex flex-col items-start border-l border-gray-200 py-4 pl-3">
                  <span className="text-gray-700">{option.sublabel}</span>
                  <span className="text-xl font-medium uppercase text-app-blue">
                    {option.label}
                  </span>
                </span>
              </button>
            ))}
          </article>
        </>
      ) : null}

      {displayedSection === 'FORM' ? (
        <>
          <p className="flex items-center justify-end py-3">
            <button
              onClick={() => display('OPTIONS')}
              className="text-md relative flex items-center rounded-lg font-semibold text-app-blue hover:bg-gray-50"
            >
              Changer
            </button>
          </p>
          <article className="border-gray-10 items-center rounded-lg border bg-white  p-4">
            <p className="text-xl font-semibold text-app-blue">
              Saisissez chaque contact et cliquez sur <span className="font-cold">enregistrer</span>
              .
            </p>
            <div aria-describedby="contacts">
              <GuestEdit handleSubmit={addContact} />
            </div>
          </article>
        </>
      ) : null}

      {displayedSection === 'CSV' ? (
          <CsvFile display={display} setContacts={setContacts} />
      ) : null}

      {displayedSection === 'CONTACTS' ? (
          <ContactSelection contacts={contacts} display={display} setContacts={setContacts} />
      ) : null}
      {(contacts.length && displayedSection !== 'CONTACTS') ? <GuestList guests={contacts} remove={removeContact} /> : null}

      <form onSubmit={saveContacts}>
        <BottomBar stepIndex={stepIndex} nextDisabled={false} previousStep={previousStep} />

        {displayErrorMessage ? (
          <p className="text-red-600">
            Veuillez saisir au moins un contact et cliquer sur{' '}
            <span className="font-extrabold">Insérer dans la liste</span>
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default Guests;
