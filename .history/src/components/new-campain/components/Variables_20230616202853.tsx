import React, {useContext, useState, useEffect, useCallback} from 'react'
import {useForm} from 'react-hook-form';
import  BottomBar  from './BottomBar';
import {NewCampainContext} from '@/context/NewCampainContext';
import Preview from './Preview';
import { INFORMATIONS, isUserInformation, variableWithoutTemplate, variableFieldType} from '@/utils/data';

interface FormValues {
  messages: {
    text: string,
    timezone: string,
    informations:{
      [key: string]: any
    },
    isSent?: boolean
  }[];
};
const informationLabel= (information: string) => {
  const vWithoutPattern = information ? variableWithoutTemplate(information) : '';
  return vWithoutPattern.length ? INFORMATIONS.find(({value}) => value === vWithoutPattern)?.label : vWithoutPattern;
}

function Variables() {
  const defaultMessage = "Vous n'avez aucun paramètre, vous pouvez passer à l'étape suivante.";
  const [assignments, setAssignments] = useState<string[]>([]);
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain}, updateCampain, previousStep} = context;
  const {guests, messages} = campain;
	const {register, setValue, handleSubmit, watch, formState: {errors}} = useForm<FormValues>({
		mode: "onChange"
	});
  const updatedVariables = watch("messages.0.informations");
	const onSubmit = (data: any) => {
		updateCampain(data);
	};
  
  useEffect(() => {
    const informationsInMessage = messages[0].text.match(/{{\w+}}/g) || [];
    setAssignments(informationsInMessage);
    informationsInMessage.forEach((variable: string, index: number) => {
      const variableWithoutPattern = variableWithoutTemplate(variable);
      const variables = messages[0].informations||{};
      if (Object.keys(variables).length) {
        const variableToSet = Object.keys(variables)[index];
        setValue(
          `messages.0.informations.${''+index}`, 
          variables[variableToSet],
          {shouldDirty: true}
         )
      } else {
        setValue(
          `messages.0.informations.${''+index}`, 
          `${isUserInformation(variable) ? variable : ''}`,
          {shouldDirty: true}
         )
      }
    });
  }, [guests, messages, setValue])
	return (
    <section className='grid grid-cols-1 md:grid-cols-3 md:gap-0 gap-2 rounded-lg bg-white border border-slate-200 shadow-sm'>
      <div className=" md:p-5 p-4 md:col-span-2 border-r-2 border-slate-300">
          <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>    
          <div className="hidden-fields hidden">
            <textarea                          
               className="hidden" defaultValue={messages[0].text}
               {...register(`messages.0.text`, { required: `Veuillez saisir une valeur pour le paramètre text` })}/>
            <input type="date"                             
               className="hidden" defaultValue={messages[0].date}
               {...register(`messages.0.date`, { required: `Veuillez saisir une valeur pour le paramètre date` })}/>
            <input type="time"                             
               className="hidden" defaultValue={messages[0].time}
               {...register(`messages.0.time`, { required: `Veuillez saisir une valeur pour le paramètre time` })}/>
               <input type="timezone"                             
                  className="hidden" defaultValue={messages[0].timezone}
                  {...register(`messages.0.timezone`, { required: `Veuillez sélectionner votre fuseau horaire` })}/>
          </div>  
          {
            assignments.length ? (
              <div className="block">
                <label htmlFor="informations" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
                  <span className='text-blue-800 font-semibold'>Veuillez personnaliser votre message</span>
                  <span className="text-gray-500 text-sm">Les informations permettront de construire le message final</span>
                </label>
                <div className={`grid grid-rows-${assignments.length}`} aria-describedby='informations'>
                  <div className={`grid gap-6 grid-cols-3 border-t border-b border-slate-200 py-1 text-lg`}>
                    <span className=''>L&apos;information</span>
                    <span className='col-span-2 flex flex-col'>
                      <span>a la valeur</span> 
                      <span className="text-gray-500 text-sm">Vous pouvez saisir une valeur</span>
                    </span>
                  </div>
                  {
                    assignments.map((information: string, index: number) =>
                      (
                        <div key={`var-${index}`} className={`grid gap-4 pr-3 items-center grid-cols-3 text-center border-b border-slate-200 py-3 ${index%2 === 0 ? 'bg-slate-100' : ''}`}>
                          <label htmlFor={`information-${index}-${variableWithoutTemplate(information)}`}>{informationLabel(information)}( {information} )</label>
                          <div className='col-span-2'>
                          <div className='flex items-center'>
                            {
                              isUserInformation(information) 
                              ? (
                                <>
                                <p className='shadow-sm disabled:opacity-50 bg-gray-300 py-2 px-2 mr-1 rounded-lg block w-full text-left'> 
                                {informationLabel(information)} du destinataire
                                </p>
                                <input 
                                {...register(
                                  `messages.0.informations.${index}`, 
                                  { 
                                    required: `Veuillez saisir une valeur pour le paramètre ${variableWithoutTemplate(information)}` 
                                  })}
                                defaultValue={messages[0].informations ? 'information': ''}
                                type={variableFieldType(information)}
                                disabled={Object.keys(guests[0]).indexOf(variableWithoutTemplate(information)) > -1}
                                placeholder={informationLabel(information)}
                                id={`information-${index}-${variableWithoutTemplate(information)}`}
                                className={`hidden`}
                                />
                                </>
                              )
                              : (
                              <input 
                                {...register(
                                  `messages.0.informations.${index}`, 
                                  { 
                                    required: `Veuillez saisir une valeur pour le paramètre ${variableWithoutTemplate(information)}`
                                    
                                  })}
                                defaultValue={messages[0].informations ? messages[0].informations[variableWithoutTemplate(information)]: ''}
                                type={variableFieldType(information)}
                                disabled={Object.keys(guests[0]).indexOf(variableWithoutTemplate(information)) > -1}
                                placeholder={informationLabel(information)}
                                id={`information-${index}-${variableWithoutTemplate(information)}`}
                                className={`${Object.keys(guests[0]).indexOf(variableWithoutTemplate(information)) > -1 ? 'disabled:opacity-75 bg-gray-300': null} col-span-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000`}
                                />
                              )
                            }
                          
                          </div> 
                          <p className="text-red-500">
                            {
                              (errors?.messages) 
                              ? errors?.messages[0]?.informations?.[index]?.message as string
                              : null
                            }
                          </p>    
                          </div>       
                        </div>
                      ))
                    }
                </div>
              </div>
            )
            : (
              <div className="text-center flex justify-center flex-col h-full text-xl py-10 font-extralight">
                {defaultMessage}
              </div>
            )
          }
          <BottomBar
            stepIndex={stepIndex}
            nextDisabled={false}
            previousStep={previousStep}
          />
        </form>
      </div>
      <div className='md:p-5 p-4'>
       <Preview text={messages[0].text} variables={updatedVariables} contacts={guests}/>
      </div>
    </section>
  )
}

export default Variables

