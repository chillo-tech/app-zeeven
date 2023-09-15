import { handleError, search } from '@/services';
import { Guest } from '@/types/Guest';
import { BACKEND_BASE_PATH, CIVILITY_MAPPING } from '@/utils';
import classNames from 'classnames';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import Message from '../Message';

function ContactSelection({ display, setContacts, contacts }: any) {
  const [selectedContacts, setSelecteContacts] = useState(contacts);
  const [isError, setIsError] = useState(false);
  const isSelected = (contact: Guest) => {
    return selectedContacts.findIndex((item: Guest) => contact.publicId === item.publicId) > -1;
  };
  const handleGuest = (contact: Guest) => {
    if (isSelected(contact)) {
      const contactsToKeep = selectedContacts.filter(
        (item: Guest) => contact.publicId !== item.publicId
      );
      setSelecteContacts(contactsToKeep);
      setContacts(contactsToKeep);
    } else {
      setSelecteContacts((prev: Guest[]) => [...prev, contact]);
      setContacts([...selectedContacts, contact]);
    }
  };
  const {
    isLoading,
    refetch,
    data: { data } = {},
  } = useQuery<any>({
    queryKey: ['contact', 'guests'],
    queryFn: () => search(`${BACKEND_BASE_PATH}/contact`),
    onError: (error: any) => {
      setIsError(true);
      handleError(error);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading ? (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous chargeons vos informations"
        />
      ) : null}
      {isError ? (
        <Message
          type="error"
          firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
          secondMessage="Veuillez prendre contact avec nous"
        />
      ) : null}
      {data ? (
        <>
          <h3 className="pt-4 text-left text-lg font-semibold text-app-blue">Vos contacts </h3>
          <p className="flex items-center justify-end py-3">
            <button
              onClick={() => display('OPTIONS')}
              className="text-md relative flex items-center rounded-lg font-semibold text-app-blue hover:bg-gray-50"
            >
              Changer
            </button>
          </p>
          <div className="">
            <div
              className="grid gap-2 md:grid-cols-2 md:items-center md:justify-center"
              aria-labelledby="channels"
            >
              {data
                .sort((a: Guest, b: Guest) => a.firstName.localeCompare(b.firstName))
                .map((guest: Guest) => (
                  <label
                    key={guest.publicId}
                    htmlFor={guest.publicId}
                    className={classNames(
                      'flex cursor-pointer rounded-md border p-2',
                      { 'border-slate-400': !isSelected(guest) },
                      {
                        'bg-app-blue bg-opacity-90 text-white': isSelected(guest),
                      }
                    )}
                  >
                    <input
                      type="checkbox"
                      value={guest.publicId}
                      id={guest.publicId}
                      onChange={() => handleGuest(guest)}
                      className="hidden"
                    />
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p
                            className={`font-medium  ${
                              isSelected(guest) ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            <span
                              className="flex flex-col overflow-hidden py-1 capitalize md:col-span-2"
                              title={guest.firstName}
                            >
                              <span>
                                {`${
                                  guest.civility && (CIVILITY_MAPPING as any)[`${guest.civility}`]
                                } ${guest.firstName} ${guest.lastName}`.trim()}
                              </span>
                              {guest.partner ? <span>{guest.partner}</span> : null}
                            </span>
                          </p>
                          <span
                            className={`inline ${
                              isSelected(guest) ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span
                              className="flex flex-col overflow-hidden py-1 capitalize md:col-span-2"
                              title={guest.firstName}
                            >
                              <span className="overflow-hidden truncate py-1 md:col-span-2">
                                {guest.email}
                              </span>
                              <span
                                className="overflow-hidden truncate py-1 md:col-span-2"
                                title={`(${guest.phoneIndex}) ${guest.phone}`}
                              >
                                ({guest.phoneIndex}) {guest.phone}
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                      {isSelected(guest) && (
                        <div className="shrink-0 text-white">
                          <AiFillCheckCircle className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default ContactSelection;
