import React, {useContext} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import  BottomBar  from './BottomBar'
import { NewCampainContext } from '@/context/NewCampainContext';
import Image from 'next/image';

type FormValues = {
  channels: string[];
};

const schema = yup.object({
  channels: yup.array().of(yup.string()).min(1, "Merci de sélectionner un canal")
}).required();
const options = [
  {
     "label": "Email",
     "image": "email.png",
     "value": "EMAIL"
  },
  {
     "label": "SMS",
     "image": "sms.png",
     "value": "SMS"
  },
  {
     "label": "Whatsapp",
     "image": "whatsapp.png",
     "value": "WHATSAPP"
  }
]
function Options() {
  const context = useContext(NewCampainContext);
  const {state: {stepIndex, campain: {channels = []}}, updateCampain, previousStep} = context;
	const { register, handleSubmit, watch, formState:{ errors} } = useForm<FormValues>({
    defaultValues:{channels},
    mode: "onChange",
    resolver: yupResolver(schema)
  });
  const watchoption = watch("channels", channels); 
  
  const onSubmit = (data:any) => updateCampain(data);

  return (
    <div className="rounded-lg bg-white md:p-5 p-4">
      <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="block">
          <label htmlFor="channels" className="w-full flex justify-between mb-2 text-md lg:text-xl">
            <span className="text-blue-800 font-semibold">Sur quel canal voulez vous envoyer votre message</span>
          </label>
          <div className="grid md:grid-cols-3 gap-4 md:items-center md:justify-center" aria-labelledby="channels">
            {options.map((option) => (
              <label key={option.label} htmlFor={option.value} className={`
                    cursor-pointer border-2 
                    ${ watchoption.indexOf(option.value) === -1 ? 'border-slate-400': 'border-blue-600'} 
                    p-4 rounded-md flex flex-col items-center
                  `}>
                <span><Image alt={option.label} src={`/images/option/${option.image}`} width="100" height="100"/></span>
                <input type="checkbox" 
                        value={option.value} 
                        id={option.value} 
                        className="hidden"
                        {...register("channels")}
                />
                <span className='mt-3'>{option.label}</span>
              </label>
            ))}
          </div>
          <p className="text-red-500">{errors?.channels?.message}</p>
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

export default Options