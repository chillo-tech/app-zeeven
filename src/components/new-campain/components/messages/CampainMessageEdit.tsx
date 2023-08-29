import { INFORMATIONS, updateMessageStyle } from '@/utils';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState } from 'react';
import { UseFieldArrayUpdate, useForm } from 'react-hook-form';
import { BiBold, BiItalic } from 'react-icons/bi';
import { FaIdCard } from 'react-icons/fa';
import { FormValues, Message, StyleParams } from './types';
import BottomBar from '../BottomBar';

interface CampainMessageEditProps {
  update: UseFieldArrayUpdate<FormValues, 'messages'>;
  index: number;
  value: Message;
  control: any;
  stepIndex: number,
  previousStep: any,
  setCurrentMessage: Dispatch<SetStateAction<string>>;
}

const CampainMessageEdit: FunctionComponent<CampainMessageEditProps> = ({
  update,
  index,
  value,
  control,
  stepIndex,
  previousStep,
  setCurrentMessage,
}) => {
  const [style, setStyle] = useState({name: '', value: ''});
  const [lastVariable, setLastVariable] = useState('');
  const [showInformation, setShowInformation] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement | null>();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: value,
  });
  const { ref, ...rest } = register('text', { required: 'Merci de sasir un message' });
  setValue('order', index + 1);
  setValue('date', value.date);
  setValue('time', value.time);
  const userText = watch('text');
  
  const onSubmit = (event: any) => {
    const target = event;
    //update(index, data)
  }
	const updateStyle = ({name, value}: StyleParams) => {
		const start = messageRef.current?.selectionStart || 0;
		const end = messageRef.current?.selectionEnd || 0;
		const currentFieldValue = messageRef.current?.value || '';
		let fieldValue = currentFieldValue;

		const valueBeforeSelection = currentFieldValue.substring(0, start);
		const valueAfterSelection = currentFieldValue.substring(end, currentFieldValue.length + 1);
		const selection = currentFieldValue.substring(start, end);

		if (lastVariable !== 'BOLD' && (name === 'BOLD' && selection.length)) {
			fieldValue = lastVariable === 'ITALIC' ? `${valueBeforeSelection.trim()} **${selection.trim()}** ${valueAfterSelection.trim()}` : `${valueBeforeSelection.trim()} **${selection.trim()}** ${valueAfterSelection.trim()}`;
		}

		if (lastVariable !== 'ITALIC' && (name === 'ITALIC' && selection.length)) {
			fieldValue = lastVariable === 'BOLD' ? `${valueBeforeSelection.trim()} *${selection.trim()}* ${valueAfterSelection.trim()}` : `${valueBeforeSelection.trim()} *${selection.trim()}* ${valueAfterSelection.trim()}`;
		}

		if (name === 'VARIABLE') {
			fieldValue = `${valueBeforeSelection.trim()} {{${value}}}${selection.length ? selection.trim() + valueAfterSelection.trim() : valueAfterSelection.trim()}`;
			setShowInformation(false);
		}
		setLastVariable(name);
		setValue("text", fieldValue, {shouldDirty: true});
	}

  useEffect(() => {
    const subscription = watch((data, { name, type }) => {
      if (name === 'text' ) {
        setCurrentMessage(data.text || '');
        update(index, {...data, text: data.text|| '', order: index + 1});
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setCurrentMessage, index, update]);
  return (
    <div>
      <label htmlFor="message" className="mb-2 flex w-full flex-col justify-between font-light">
        <span className="font-semibold text-app-blue">Votre message</span>
        <span className="text-sm text-gray-500">
          Vous pourrez définir la valeur des informations dans la suite
        </span>
      </label>
      <textarea
        rows={6}
        id="message"
        className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-3 shadow-sm focus:border-indigo-500"
        {...rest}
        name={`text`}
        ref={(e) => {
          ref(e);
          messageRef.current = e; // you can still assign to ref
        }}
      />
      <p className="text-red-500">{errors?.text ? errors?.text?.message : null}</p>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <p>Charactères: {userText ? userText.length: 0}</p>
        <div className="buttons flex items-center">
          <button type="button" className="text-lg" onClick={() => updateStyle({ name: 'BOLD', value: ''})}>
            <BiBold className="p-0" size={25} />
          </button>
          <button
            type="button"
            className="px-3 text-lg"
            onClick={() => updateStyle({ value: '', name: 'ITALIC' })}
          >
            <BiItalic className="p-0 font-extralight" size={25} />
          </button>
          <div className="information relative">
            <button
              type="button"
              className="relative z-20 flex items-center rounded-full border border-gray-400 px-2"
              onClick={() => setShowInformation(!showInformation)}
            >
              <FaIdCard className="mr-1" /> Ajouter une information
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
                          name: 'VARIABLE',
                          value
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


      <BottomBar 
        stepIndex={stepIndex} 
        nextDisabled={false} 
        previousStep={previousStep} 
        nextButtonType='button'
        handleOnClick={onSubmit}
      />
    </div>
  );
};

export default CampainMessageEdit;
