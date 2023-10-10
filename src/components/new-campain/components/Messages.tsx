import { NewCampainContext } from '@/context/NewCampainContext';
import { INFORMATIONS } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BiBold, BiItalic } from 'react-icons/bi';
import { RxCrossCircled } from 'react-icons/rx';
import BottomBar from './BottomBar';
import Preview from './Preview';

type FormValues = {
  messages: {
    text: string;
    date?: string;
    informations?: { [key: string]: any };
    ordre: number;
    isSent?: boolean;
  }[];
};
type StyleParams = {
  type: string;
  value?: string;
};

function Messages() {
  const messageRef = useRef<HTMLTextAreaElement | null>();
  const [showInformation, setShowInformation] = useState(false);
  const [lastVariable, setLastVariable] = useState('');
  const context = useContext(NewCampainContext);
  const { state, updateCampain, previousStep } = context;
  const {
    stepIndex,
    campain: { guests, messages = [{ text: '', ordre: 1 }] },
  } = state;
  const {
    setValue,
    watch,
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      messages,
    },
  });
  const { ref, ...rest } = register('messages.0.text', { required: 'Merci de sasir un message' });
  const currentMessage = watch('messages.0.text');
  const { fields } = useFieldArray({
    rules: {
      minLength: 1,
      required: 'Merci de saisir votre message',
    },

    control,
    name: 'messages',
  });

  const updateStyle = ({ type, value }: StyleParams) => {
    const start = messageRef.current?.selectionStart || 0;
    const end = messageRef.current?.selectionEnd || 0;
    const currentFieldValue = messageRef.current?.value || '';
    let fieldValue = currentFieldValue;

    const valueBeforeSelection = currentFieldValue.substring(0, start);
    const valueAfterSelection = currentFieldValue.substring(end, currentFieldValue.length + 1);
    const selection = currentFieldValue.substring(start, end);

    if (lastVariable !== 'BOLD' && type === 'BOLD' && selection.length) {
      fieldValue =
        lastVariable === 'ITALIC'
          ? `${valueBeforeSelection}**${selection}**${valueAfterSelection}`
          : `${valueBeforeSelection} **${selection}** ${valueAfterSelection}`;
    }

    if (lastVariable !== 'ITALIC' && type === 'ITALIC' && selection.length) {
      fieldValue =
        lastVariable === 'BOLD'
          ? `${valueBeforeSelection}*${selection}*${valueAfterSelection}`
          : `${valueBeforeSelection} *${selection}* ${valueAfterSelection}`;
    }

    if (type === 'VARIABLE') {
      fieldValue = `${valueBeforeSelection}{{${value}}}${
        selection.length ? selection + valueAfterSelection : valueAfterSelection
      }`;
      setShowInformation(false);
    }
    setLastVariable(type);
    setValue('messages.0.text', fieldValue);
    closeModal();
  };

  const onSubmit = (data: FormValues) => {
    let messages = data.messages;
    data['messages'] = messages;
    updateCampain(data);
  };
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <section className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-3 md:gap-0">
      <div className="border-r-2 border-slate-300 p-4 md:col-span-2 md:p-5">
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={`message-${field.id}`}>
              <label
                htmlFor="message"
                className="mb-2 flex w-full flex-col justify-between font-light"
              >
                <span className="font-semibold text-app-blue">Votre message</span>
                <span className="text-sm text-gray-500">
                  Vous pourrez définir la valeur des informations dans la suite
                </span>
              </label>
              <div className="overflow-hidden rounded-lg border shadow-sm">
                <textarea
                  rows={8}
                  id="message"
                  className="bg-gray-10 w-full border-none p-3 focus:border-none focus:shadow-md"
                  {...rest}
                  name={`messages.${index}.text`}
                  ref={(e) => {
                    ref(e);
                    messageRef.current = e; // you can still assign to ref
                  }}
                />
                <p className="text-red-500">
                  {errors?.messages ? errors?.messages[index]?.text?.message : null}
                </p>
                <div className="flex flex-col items-center justify-between p-2 shadow-2xl md:flex-row">
                  <p>
                    <button
                      type="button"
                      className="text-lg"
                      onClick={() => updateStyle({ type: 'BOLD' })}
                    >
                      <BiBold className="p-0" size={25} />
                    </button>
                    <button
                      type="button"
                      className="px-3 text-lg"
                      onClick={() => updateStyle({ type: 'ITALIC' })}
                    >
                      <BiItalic className="p-0 font-extralight" size={25} />
                    </button>
                  </p>
                  <div className="buttons flex items-center">
                    <div className="information relative">
                      <button
                        type="button"
                        className="relative z-10 flex items-center rounded-full border border-app-blue px-4 py-2 text-app-blue"
                        //onClick={() => setShowInformation(!showInformation)}
                        onClick={openModal}
                      >
                        Ajouter une personnalisation
                      </button>
                      {showInformation ? (
                        <ul className="informations absolute bottom-0 left-0 right-0 z-10 bg-white pb-10 transition duration-1000">
                          {INFORMATIONS.map(({ label, value }, index) => (
                            <li className="information" key={`information-${index}`}>
                              <button
                                type="button"
                                className="w-full border-b border-slate-200 px-3 py-1 text-left"
                                onClick={() =>
                                  updateStyle({
                                    type: 'VARIABLE',
                                    value,
                                  })
                                }
                              >
                                {label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/**
							<h2 className="w-full flex flex-col justify-between my-2 font-light">
								<span
									className='text-app-blue font-semibold'>Quand voulez vous envoyer les messages</span>
							</h2>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="block">
									<label htmlFor="date"
										   className="w-full flex flex-col justify-between mb-2 font-light">
										<span className='text-app-blue font-semibold'>Date</span>
									</label>
									<input id="date" type="date" min={getInputFormattedDate(new Date())}
										   className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
										   {...register(
											   `messages.${index}.date` as const,
											   {required: "Merci de sasir une date"}
										   )}
									/>
									<p className="text-red-500">{errors?.messages ? errors?.messages[index]?.date?.message : null}</p>
								</div>
								<div className="block">
									<label htmlFor="time"
										   className="w-full flex flex-col justify-between mb-2 font-light">
										<span className='text-app-blue font-semibold'>Heure</span>
									</label>
									<input type="time" id="time"
										   className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
										   {...register(
											   `messages.${index}.time` as const,
											   {required: "Merci de sasir une heure"}
										   )}
									/>
									<p className="text-red-500">{errors?.messages ? errors?.messages[index]?.time?.message : null}</p>
								</div>
							</div>
               */}
            </div>
          ))}
          <p className="text-red-500">{errors?.messages?.root?.message}</p>

          <BottomBar stepIndex={stepIndex} nextDisabled={false} previousStep={previousStep} />
        </form>
      </div>
      <div className="p-4 md:p-5">
        <Preview text={currentMessage} guests={guests} />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex w-full items-center justify-between text-lg font-medium leading-6 text-gray-900"
                  >
                    Personnalisez votre message
                    <button
                      type="button"
                      className="px-3 text-lg"
                      onClick={closeModal}
                    >
                      <RxCrossCircled className="p-0 font-extralight" size={20} />
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <ul className="informations bg-white pb-10 transition duration-1000 text-md">
                      {INFORMATIONS.map(({ label, value }, index) => (
                       	<li className='information' key={`information-${index}`}>
                         <button type="button"
                             className='font-light w-full text-left px-3 py-2 border-b border-slate-200 flex justify-between items-center'
                             onClick={() => updateStyle({
                               type: 'VARIABLE',
                               value
                             })}>
                           <span>{label} </span>
                           <span className='text-app-blue bg-blue-100 px-2 py-1 rounded-full'>{`{{${value}}}`} </span>
                         </button>
                       </li>
                      ))}
                      {(guests && guests[0].others) ? (
                        guests[0].others.map(({label, key}: any, index: any ) => (
                          <li className='information' key={`other-user-${index}`}>
                          <button type="button"
                              className='font-light w-full text-left px-3 py-1 border-b border-slate-200 flex justify-between items-center'
                              onClick={() => updateStyle({
                                type: 'VARIABLE',
                                value: key
                              })}>
                            <span>{label} </span>
                            <span className='text-app-blue bg-blue-100 px-2 py-1 rounded-full'>{`{{${key}}}`} </span>
                          </button>
                        </li>
                       ))
                      ) : null}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}

export default Messages;
