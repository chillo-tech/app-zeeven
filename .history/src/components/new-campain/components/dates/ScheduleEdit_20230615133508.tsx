import React from 'react'
import { useForm } from 'react-hook-form';

function ScheduleEdit ({ update, index, value, control }: any)  {
  const { register, handleSubmit } = useForm({
    defaultValues: value
  });

  return (
    <>
    <div className='flex border border-red-300'>
      <input
        placeholder="first name"
        {...register(`firstName`, { required: true })}
      />
      <button
        type="button"
        onClick={handleSubmit((data) => update(index, data))}
      >
        Submit
      </button>
    </div>
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
    </>
  );
}

export default ScheduleEdit
