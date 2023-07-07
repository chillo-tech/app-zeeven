import { getInputFormattedDate } from '@/utils';
import React from 'react'
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
type FormValues = {
  date: string;
  time: string;
};
const schema = yup.object({
  date: yup.string().required("Merci de sélectionner une date"),
  time: yup.string()
}).required();

function ScheduleEdit ({ update, index, value, control }: any)  {
  const now = new Date();
  now.setDate(now.getDate() + 1);

  const { register, handleSubmit, formState: {errors} } = useForm({
		defaultValues: {
      date: getInputFormattedDate(now), 
      time: '00:00'},
      mode: "onChange",
      resolver: yupResolver(schema)
	});

  return (
    <>
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
        <div className="mb-0 text-md flex flex-col md:mt-2">
          <button type="submit"
              className="py-2 w-full first: bg-blue-800 hover:bg-blue-800 text-white font-light rounded-lg shadow-sm">
            Insérer dans la liste
          </button>
        </div>
    </div>
    </>
  );
}

export default ScheduleEdit
