import React, {useContext, useRef} from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import  BottomBar  from './BottomBar';
import {NewCampainContext} from '../../../context/NewCampainContext';
import {BoldOutlined, ItalicOutlined} from '@ant-design/icons';
import Preview from './Preview';

type FormValues = {
  message: string;
};

const schema = yup.object({
	message: yup.string().required("Merci de saisir votre message"),
}).required();


function Message() {
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
  const updateStyle = (style: string) => {
    const start = messageRef.current?.selectionStart;
    const end = messageRef.current.selectionEnd;
    const value = messageRef.current.value;
    let fieldValue = value;
    
    const valueBeforeSelection = value.substring(0, start);
    const valueAfterSelection = value.substring(end, value.length + 1);
    const selection = value.substring(start, end);

    if(style === 'BOLD' && selection.length){
      fieldValue = `${valueBeforeSelection} **${selection}** ${valueAfterSelection}`;
    }

    if(style === 'ITALIC' && selection.length){
      fieldValue = `${valueBeforeSelection} *${selection}* ${valueAfterSelection}`;
    }

    if(style === 'VARIABLE'){
      let variables = value.match(/{{\d+}}/g) || [];
      fieldValue = `${valueBeforeSelection} {{${variables.length + 1}}} ${selection.length ? selection + valueAfterSelection : valueAfterSelection}`;
    
      variables = fieldValue.match(/{{\d+}}/g) || [];
      variables.forEach((variable, index) => fieldValue = fieldValue.replace(variable, `{{${index + 1}}}`));
    }
    setValue("message", fieldValue);
  }
	const onSubmit = (data: any) => {
    let {message} = data;
    const variables = message.match(/{{\d+}}/g) || [];
    variables.forEach((variable: string, index: number) => message = message.replace(variable, `{{${index + 1}}}`));
		updateCampain({message: message.trim()})
	};
	return (
    <section className='grid grid-cols-1 md:grid-cols-4 md:gap-0 gap-2 rounded-lg bg-white border border-slate-200 shadow-sm'>
      <div className=" md:p-5 p-4 md:col-span-3 border-r-2 border-slate-300">
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="block">
            <label htmlFor="message" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
              <span className='text-blue-800 font-semibold'>Votre message</span>
              <span className="text-gray-500 text-sm">Vous pourrez définir la valeur des paramètres dans la suite</span>
            </label>
            <textarea rows={6} id="message"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
                  { ...rest } ref={(e: any) => {
                    ref(e)
                    messageRef.current = e
                  }}/>
            <p className="text-red-500">{errors?.message?.message}</p>
            <div className="flex justify-between flex-col md:flex-row">
              <p>Charactères: {currentMessage ? currentMessage.length: 0}</p>
              <p className="flex buttons items-center">
                <button type='button' className='px-2' onClick={() => updateStyle('BOLD')}>
                  <BoldOutlined/>
                </button>
                <button type='button' className='px-2'onClick={() => updateStyle('ITALIC')}>
                  <ItalicOutlined/>
                </button>
                <button type='button' className='px-2 pt-2' onClick={() => updateStyle('VARIABLE')}>
                  + Ajouter une variable
                </button>
              </p>
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
