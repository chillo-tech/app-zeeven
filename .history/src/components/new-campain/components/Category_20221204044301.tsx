import React, {useContext} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { NewCampainContext } from '../../../context/NewCampainContext';
import Image from 'next/image';
import BottomBar from './BottomBar';
type FormValues = {
  category: {
    label: string
  };
};
const schema = yup.object({
  category: yup.object({
    label: yup.string().nullable().required("Merci de saisir de sélectionner un évènément"),
  }).required()
}).required();
function Category() {
  const context = useContext(NewCampainContext);
  const {state: {stepIndex, campain: {category = {}}}, updateCampain, updateStepIndex} = context;
	const { register, handleSubmit, watch, formState:{ errors} } = useForm<FormValues>({
    defaultValues:{category},
    mode: "onChange",
    resolver: yupResolver(schema)
  });
  const watchCategory = watch("category", category); // you can supply default value as second argument
  const onSubmit = (data:any) => updateCampain(data);
  const previousStep = () => updateStepIndex(stepIndex >= 1 ? stepIndex -1 : 0);

  return (
    <div className="rounded-lg bg-white md:p-5 p-4 border border-slate-200 shadow-sm">
      <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="block">
          <label htmlFor="name" className="w-full flex justify-between mb-2 font-light">
            <span className="text-blue-800 font-semibold text-lg">Pour quel évènement est votre message</span>
          </label>
          <div className="grid gap-4 md:grid-cols-3 md:gap-8 md:items-center md:justify-center">
            {categories.map((category) => (
              <label key={category.label} htmlFor={category.value} className={`cursor-pointer border-2 ${ watchCategory.label === category.value ? 'border-blue-500': 'border-slate-400'} p-4 rounded-md flex flex-col items-center`}>
                <span><Image src={`/images/category/${category.image}`} width="100" height="100" alt={category.label}/></span>
                <input type="radio" 
                        value={category.value} 
                        id={category.value} 
                        className="hidden"
                        {...register("category.label")}
                />
                {category.label}
              </label>
            ))}
          </div>
          <p className="text-red-500">{errors?.category?.label?.message}</p>
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

export default Category