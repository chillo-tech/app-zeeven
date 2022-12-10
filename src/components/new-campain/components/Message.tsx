import React, {useContext, useRef, useState} from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import  BottomBar  from './BottomBar';
import {NewCampainContext} from '../../../context/NewCampainContext';
import Preview from './Preview';
import { FaIdCard, FaIdCardAlt } from 'react-icons/fa';
import { INFORMATIONS } from '../../../utils/data';

type StyleParams = {
  type: string,
  value?: string
}
type FormValues = {
  message: string;
};

const schema = yup.object({
	message: yup.string().required("Merci de saisir votre message"),
}).required();


function Message() {

  const [showInformation, setShowInformation] = useState(false);
  const messageRef = useRef({selectionStart: 0, selectionEnd: 0, value: ''});
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain: {message}}, updateCampain, previousStep} = context;
	const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm<FormValues>({
		defaultValues: {message},
		mode: "onChange",
		resolver: yupResolver(schema)
	});
  const { ref, ...rest} = register('message'); 

  const currentMessage = watch("message");
  const updateStyle = ({type, value}: StyleParams) => {
    const start = messageRef.current?.selectionStart;
    const end = messageRef.current.selectionEnd;
    const currentFieldValue = messageRef.current.value;
    let fieldValue = currentFieldValue;
    
    const valueBeforeSelection = currentFieldValue.substring(0, start);
    const valueAfterSelection = currentFieldValue.substring(end, currentFieldValue.length + 1);
    const selection = currentFieldValue.substring(start, end);

    if(type === 'BOLD' && selection.length){
      fieldValue = `${valueBeforeSelection} **${selection}** ${valueAfterSelection}`;
    }

    if(type === 'ITALIC' && selection.length){
      fieldValue = `${valueBeforeSelection} *${selection}* ${valueAfterSelection}`;
    }

    if(type === 'VARIABLE'){
      fieldValue = `${valueBeforeSelection} {{${value}}} ${selection.length ? selection + valueAfterSelection : valueAfterSelection}`;
      setShowInformation(false);
    }
    setValue("message", fieldValue);
  }
	const onSubmit = (data: any) => {
    let {message} = data;
		updateCampain({message: message.trim()})
	};
	return (
    <section className='grid grid-cols-1 md:grid-cols-3 md:gap-0 gap-2 rounded-lg bg-white border border-slate-200 shadow-sm'>
      <div className=" md:p-5 p-4 md:col-span-2 border-r-2 border-slate-300">
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="block">
            <label htmlFor="message" className="w-full flex flex-col justify-between mb-2 text-md font-light">
              <span className='text-blue-800 font-semibold'>Votre message</span>
              <span className="text-gray-500 text-sm">Vous pourrez définir la valeur des informations dans la suite</span>
            </label>
            <textarea rows={6} id="message"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
                  { ...rest } ref={(e: any) => {
                    ref(e)
                    messageRef.current = e
                  }}/>
            <p className="text-red-500">{errors?.message?.message}</p>
            <div className="flex justify-between items-center flex-col md:flex-row">
              <p>Charactères: {currentMessage ? currentMessage.length: 0}</p>
              <div className="flex buttons items-center">
                <button type='button' className='px-2' onClick={() => updateStyle({type: 'BOLD'})}>
                </button>
                <button type='button' className='px-2'onClick={() => updateStyle({type: 'ITALIC'})}>
                </button>
                <div className='information relative'>
                  <button 
                    type='button' 
                    className='relative z-20 border border-gray-400 rounded-full px-2 flex items-center' 
                    onClick={() => setShowInformation(!showInformation)}>
                    <FaIdCard className='mr-1'/> Ajouter une information
                  </button>
                  {
                    showInformation ? (
                      <ul className='informations absolute bottom-0 left-0 right-0 pb-10 bg-white z-10 transition duration-1000'>
                        {
                          INFORMATIONS.map((information, index) => (
                            <li className='information' key={`information-${index}`}>
                              <button type="button" className='w-full text-left px-3 py-1 border-b border-slate-200' onClick={() => updateStyle({type: 'VARIABLE', value:information.value})}>
                                {information.label}
                              </button>
                            </li>
                          ))
                        }
                      </ul>
                    ) : null
                  }
                </div>
              </div>
            </div>
          </div>
          <BottomBar
            stepIndex={stepIndex}
            nextDisabled={false}
            previousStep={previousStep}
          />
        </form>
      </div>
      <div className='md:p-5 p-4'>
       <Preview text={currentMessage}/>
      </div>
    </section>
	)
}

export default Message
