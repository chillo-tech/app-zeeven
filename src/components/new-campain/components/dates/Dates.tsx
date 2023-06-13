import React, {useContext} from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import  BottomBar  from '../BottomBar';
import {NewCampainContext} from '@/context/NewCampainContext';
import { getInputFormattedDate } from '@/utils';
import Occurences from './Occurences';
type FormValues = {
  date: string;
  time: string;
};
const schema = yup.object({
  date: yup.string().required("Merci de sélectionner une date"),
  time: yup.string()
}).required();

function Dates() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain}, updateCampain, previousStep} = context;
  const {date , time = '00:00'} = campain.messages[0];
	const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
		defaultValues: {
      date: date ? date : getInputFormattedDate(now), 
      time: time ? time: '00:00'},
		mode: "onChange",
		resolver: yupResolver(schema)
	});
	const onSubmit = (data: any) => {
    const {messages: campainMessages} = campain;
		const messages = campainMessages.map((entry: any) => ({
      ...entry, 
      ...data,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }));
		data['messages'] = messages;
		updateCampain(data);
	};


	return (
		<div className="rounded-lg bg-white mt-10 md:p-10 p-4">
      <h2 className="mb-2 w-full flex flex-col justify-between mb-2 text-lg lg:text-xl font-light">
          <span className='text-blue-800 font-semibold'>Quand voulez vous envoyer message</span>
					<span className="text-gray-500 text-sm">Le message sera envoyé en fonction de votre fuseau horaire</span>
			</h2>
      <div className="form-wrapper">
        <form noValidate className="block" onSubmit={handleSubmit(onSubmit)}>
          <div className="block mb-2">
            <label htmlFor="date" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
              <span className='text-blue-800 font-semibold'>Date</span>
            </label>
            <input id="date" type="date" min={getInputFormattedDate(new Date())}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
                {...register("date")}/>
            <p className="text-red-500">{errors?.date?.message}</p>
          </div>
          <div className="block">
            <label htmlFor="time" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
              <span className='text-blue-800 font-semibold'>Heure</span>
            </label>
            <input type="time" id="time"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
                {...register("time")}/>
            <p className="text-red-500">{errors?.time?.message}</p>
          </div>
          
          <BottomBar
            stepIndex={stepIndex}
            nextDisabled={false}
            previousStep={previousStep}
          />
        </form>
      </div>
		</div>
	)
}

export default Dates
