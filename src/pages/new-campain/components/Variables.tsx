import React, {useContext, useState, useEffect, useCallback} from 'react'
import {useForm} from 'react-hook-form';
import  BottomBar  from './BottomBar';
import {NewCampainContext} from '../context/NewCampainContext';
import Preview from './Preview';

const variableWithoutTemplate = (variable: string) => {
  return variable ? variable.replace('{{', '').replace('}}', '') : '';
}

function Variables() {
  const [assignments, setAssignments] = useState<string[]>([]);
  const [firstContact, setFirstContact] = useState<string[]>([]);
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain: {contacts, variables = {}, message}}, updateCampain, previousStep} = context;
	const {register, handleSubmit, watch, formState: {errors}} = useForm({
		defaultValues: {variables},
		mode: "onChange"
	});

  const updatedVariables =  watch("variables");
  
	const onSubmit = (data: any) => {
		updateCampain(data);
	};
  
  useEffect(() => {
    const variablesInMessage = message.match(/{{\d+}}/g) || [];
    setAssignments(variablesInMessage);
    /*
    const shapes : {[key: string] : yup.StringSchema} = {};
    variablesInMessage.forEach((variable: string) => {
      const variableWithoutPattern = variableWithoutTemplate(variable);
      shapes[variableWithoutPattern] = yup.string().required(`Veuillez saisir une valeur pour le paramètre ${variableWithoutTemplate(variable)}` )
    });
    schema = yup.object(shapes).required();
    */
  }, [contacts, updatedVariables, message])
	return (
    <section className='grid grid-cols-1 md:grid-cols-4 md:gap-0 gap-2 rounded-lg bg-white border border-slate-200 shadow-sm'>
      <div className=" md:p-5 p-4 md:col-span-3 border-r-2 border-slate-300">

          <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>      
          {
            assignments.length ? (
              <div className="block">
                <label htmlFor="variables" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
                  <span className='text-blue-800 font-semibold'>Veuillez définir les valeurs des variables de votre message</span>
                  <span className="text-gray-500 text-sm">Les valeurs permettront de construire le message final</span>
                  <span className="text-gray-500 text-sm">Si une variable n'a pas de valeur, sasissez là</span>
                </label>
                <div className={`grid grid-rows-${assignments.length}`} aria-describedby='variables'>
                  <div className={`grid gap-6 grid-cols-4 border-t border-b border-slate-200 py-1 text-lg`}>
                    <span className=''>La variable</span>
                    <span className='col-span-3 flex flex-col'>
                      <span>a la valeur</span> 
                      <span className="text-gray-500 text-sm">Vous pouvez saisir une valeur</span>
                    </span>
                  </div>
                  {
                  assignments.map((variable: string, index: number) =>
                    (
                      <div key={`var-${index}`} >
                      <div className={`grid gap-6 items-center grid-cols-4 text-center border-b border-slate-200 py-3 ${index%2 === 0 ? 'bg-slate-100' : ''}`}>
                        <span>{variable}</span>
                        <input 
                          {...register(
                            `variables.${variableWithoutTemplate(variable)}`, 
                            { 
                              required: `Veuillez saisir une valeur pour le paramètre ${variableWithoutTemplate(variable)}` 
                            })}
                          defaultValue={variables ? variables[variableWithoutTemplate(variable)]: ''}
                          type="text" 
                          className="col-span-2 w-full text-center border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000"
                          />
                      </div>
                      <div className="text-red-500">
                        {errors.variables && (errors.variables as any)?.[variableWithoutTemplate(variable)]?.message}
                      </div>
                      </div>
                    )
                  )
                  }
                </div>
              
              </div>
            )
            : (
              <div className="text-center flex justify-center flex-col h-full text-xl py-10">
                <span className='font-extralight'>Vous n'avez aucun paramètre, vous pouvez passer à l'étape suivante.</span>
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
       <Preview text={message} variables={updatedVariables} contacts={contacts}/>
      </div>
    </section>
  )
}

export default Variables

