import React, {useContext} from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import  BottomBar  from './BottomBar';
import {NewCampainContext} from '../../../context/NewCampainContext';
import { getInputFormattedDate } from 'utils';
type FormValues = {
  dateDebut: string;
  heureDebut: string;
};
const schema = yup.object({
  dateDebut: yup.string().required("Merci de sélectionner une date"),
  heureDebut: yup.string()
}).required();

function Dates() {
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain: {dateDebut, heureDebut= '06:00'}}, updateCampain, previousStep} = context;
	const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
		defaultValues: {dateDebut, heureDebut: heureDebut ? heureDebut: '06:00'},
		mode: "onChange",
		resolver: yupResolver(schema)
	});
	const onSubmit = (data: any) => {
		updateCampain(data);
	};

	return (
		<div className="rounded-lg bg-white mt-10 md:p-10 p-4">
      <h2 className="w-full flex flex-col justify-between mb-2 text-lg lg:text-xl font-light">
          <span className='text-blue-800 font-semibold'>Quand voulez vous envoyer message</span>
			</h2>
      <div className="form-wrapper">
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="block">
            <label htmlFor="date" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
              <span className='text-blue-800 font-semibold'>Date</span>
            </label>
            <input id="date" type="date" min={getInputFormattedDate(new Date())}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
                {...register("dateDebut")}/>
            <p className="text-red-500">{errors?.dateDebut?.message}</p>
          </div>
          <div className="block">
            <label htmlFor="time" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
              <span className='text-blue-800 font-semibold'>Heure</span>
            </label>
            <input type="time" id="time"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
                {...register("heureDebut")}/>
            <p className="text-red-500">{errors?.heureDebut?.message}</p>
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
