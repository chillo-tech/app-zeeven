import React, { useContext,useRef } from 'react'
import  BottomBar  from './BottomBar';
import { useForm } from 'react-hook-form';
import { NewCampainContext } from '../../../context/NewCampainContext';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { STRING_WITH_NUMBERS_REGEXP } from '../../../../utils/data';
type FormValues = {
  contacts: string;
};
const getArrayFromString = (entry: string) => {
  const lines = entry.split("\n").filter((line: string) => line.length);
  return lines;
}

const schema = yup.object({
	contacts: yup
    .string()
    .required()
    .test({
      name: 'max',
      exclusive: true,
      message: "Un de vos concacts n'a pas numéro de téléphone ou a un téléphone invalide",
      test: (value: string = '') => {
        const valuesAsArray = getArrayFromString(value);
        const testedValues = valuesAsArray.map((entry:string) => STRING_WITH_NUMBERS_REGEXP.test(entry));
        const testedValuesAsBoolean = new Set(testedValues);
        return testedValuesAsBoolean.size === 1 && testedValuesAsBoolean.values().next().value === true;
      }
    })
}).required();

function Contacts() {
 
  const contactsRef =useRef<HTMLTextAreaElement | null>(null);
  const context = useContext(NewCampainContext);
  const {state: {stepIndex, campain: {contacts}}, updateCampain, previousStep} = context;
	const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
		defaultValues: {contacts},
		mode: "onChange",
		resolver: yupResolver(schema)
	});
  const { ref, ...rest} = register('contacts');
  
  //@TODO Afficher les contacts
  const handleKeyUp = (event: any) => {
    event.preventDefault();
    const key = event.key;
    if(key === 'Enter') { 
      if (contactsRef && contactsRef.current) {
        const fieldValues = contactsRef.current.value;
        const lines = fieldValues.split("\n").filter((line: string) => line.length);
      }
    }
  }
	const onSubmit = (data: any) => {
		updateCampain(data)
	};

  return (
    <div className="rounded-lg bg-white md:p-5 p-4 border border-slate-200 shadow-sm">
    <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="block">
        <label htmlFor="contact" className="w-full flex flex-col justify-between mb-2 text-md lg:text-lg">
          <span className="text-blue-800 font-semibold">A qui transmettre votre message</span>
          <span className="text-gray-500 text-sm">Saisissez chaque contact sur une ligne. <br/>Séparez les informations par une virgule(Exemple: Mlle,Emmanuelle,BERNARD,...)</span>
        </label>
        <textarea rows={6} id="contact"
          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
          { ...rest } ref={(e) => {
            ref(e)
            if (contactsRef) {
              contactsRef.current = e;
            }
          }}
          onKeyUp={handleKeyUp}
        />
        <p className="text-red-500">{errors.contacts?.message}</p>
      </div>
      <BottomBar
          stepIndex={stepIndex}
          nextDisabled={false}
          previousStep={previousStep}
        />
    </form>
  </div>
  )
}

export default Contacts