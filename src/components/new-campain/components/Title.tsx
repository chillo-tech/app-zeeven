import React, {useContext} from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import BottomBar from './BottomBar'
import {NewCampainContext} from '@/context/NewCampainContext';

type FormValues = {
	name: string;
};
const schema = yup.object({
	name: yup.string().required("Merci de saisir le titre"),
}).required();

function Title() {
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain: {name}}, updateCampain, previousStep} = context;
	const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
		defaultValues: {name},
		mode: "onChange",
		resolver: yupResolver(schema)
	});
	const onSubmit = (data: any) => {
		updateCampain(data)
	};

	return (
		<div className="rounded-lg bg-white mt-10 md:p-10 p-4 border border-slate-200 shadow-sm">
			<form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
				<div className="block">
					<label htmlFor="name" className="w-full flex flex-col justify-between mb-2 text-lg">
						<span className='text-app-blue font-semibold'>Un nom s&apos;il vous plait ...</span>
						<span className="text-gray-500 text-sm">Le nom sera l&apos;objet de votre message</span>
					</label>
					<input type="text" id="name"
						   className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
						   {...register("name")}/>
					<p className="text-red-500">{errors.name?.message}</p>
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

export default Title;
