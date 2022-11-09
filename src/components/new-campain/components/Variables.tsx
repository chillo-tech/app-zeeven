import React, {useContext, useState, useEffect, useCallback} from 'react'
import {useForm} from 'react-hook-form';
import  BottomBar  from './BottomBar';
import {NewCampainContext} from '../../../context/NewCampainContext';
import Preview from './Preview';
import { INFORMATIONS, variableWithoutTemplate } from '../../../utils/data';

const variableLabel= (variable: string) => {
  const vWithoutPattern = variable ? variableWithoutTemplate(variable) : '';
  return vWithoutPattern.length ? INFORMATIONS.find(({value}) => value === vWithoutPattern)?.label : vWithoutPattern;
}

function Variables() {
  const defaultMessage = "Vous n'avez aucun paramètre, vous pouvez passer à l'étape suivante.";
  const [assignments, setAssignments] = useState<string[]>([]);
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain: {invites, variables = {}, message}}, updateCampain, previousStep} = context;
	const {register, setValue, handleSubmit, watch, formState: {errors}} = useForm({
		defaultValues: {variables},
		mode: "onChange"
	});
  const updatedVariables =  watch("variables");
	const onSubmit = (data: any) => {
		updateCampain(data);
	};
  
  useEffect(() => {
    const variablesInMessage = message.match(/{{\w+}}/g) || [];
    setAssignments(variablesInMessage);
    variablesInMessage.forEach((variable: string, index: number) => {
      const variableWithoutPattern = variableWithoutTemplate(variable);
      if (Object.keys(variables).length) {
        const variableToSet = Object.keys(variables)[index];
        setValue(
          `variables.${index}`, 
          `${variableWithoutPattern === 'phone' ? "00"+invites[0]["profile"]["phoneIndex"]+invites[0]["profile"][variableWithoutPattern]: variables[variableToSet]}`,
          {shouldDirty: true}
         )
      } else {
        setValue(
          `variables.${index}`, 
          invites[0]["profile"][variableWithoutPattern],
          {shouldDirty: true}
         )
      }
    });
  }, [invites, updatedVariables, message])
	return (
    <section className='grid grid-cols-1 md:grid-cols-3 md:gap-0 gap-2 rounded-lg bg-white border border-slate-200 shadow-sm'>
      <div className=" md:p-5 p-4 md:col-span-2 border-r-2 border-slate-300">

          <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>      
          {
            assignments.length ? (
              <div className="block">
                <label htmlFor="variables" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
                  <span className='text-blue-800 font-semibold'>Veuillez personnaliser votre message</span>
                  <span className="text-gray-500 text-sm">Les informations permettront de construire le message final</span>
                </label>
                <div className={`grid grid-rows-${assignments.length}`} aria-describedby='variables'>
                  <div className={`grid gap-6 grid-cols-3 border-t border-b border-slate-200 py-1 text-lg`}>
                    <span className=''>L&apos;information</span>
                    <span className='col-span-2 flex flex-col'>
                      <span>a la valeur</span> 
                      <span className="text-gray-500 text-sm">Vous pouvez saisir une valeur</span>
                    </span>
                  </div>
                  {
                  assignments.map((variable: string, index: number) =>
                    (
                      <div key={`var-${index}`} >
                      <div className={`grid gap-4 pr-3 items-center grid-cols-3 text-center border-b border-slate-200 py-3 ${index%2 === 0 ? 'bg-slate-100' : ''}`}>
                        <label htmlFor={`variable-${index}-${variableWithoutTemplate(variable)}`}>{variableLabel(variable)}( {variable} )</label>
                        <input 
                          {...register(
                            `variables.${index}`, 
                            { 
                              required: `Veuillez saisir une valeur pour le paramètre ${variableWithoutTemplate(variable)}` 
                            })}
                          defaultValue={variables ? variables[variableWithoutTemplate(variable)]: ''}
                          type="text" 
                          disabled={Object.keys(invites[0]['profile']).indexOf(variableWithoutTemplate(variable)) > -1}
                          placeholder={variableLabel(variable)}
                          id={`variable-${index}-${variableWithoutTemplate(variable)}`}
                          className={`${Object.keys(invites[0]['profile']).indexOf(variableWithoutTemplate(variable)) > -1 ? 'disabled:opacity-75 bg-gray-300': null} col-span-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000`}
                          />
                      </div>
                      <div className="text-red-500">
                        {errors.variables && (errors.variables as any)?.[index]?.message}
                      </div>
                      </div>
                    )
                  )
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
       <Preview text={message} variables={updatedVariables} contacts={invites}/>
      </div>
    </section>
  )
}

export default Variables

