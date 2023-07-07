import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import ScheduleEdit from './ScheduleEdit';
import { watch } from 'fs';

function Schedules() {
  const { control, handleSubmit } = useForm({
    defaultValues: {schedules: [{ firstName: "" }]}
  });
  const schedules = watch('schedules')
  const { fields, append, update } = useFieldArray({
    control,
    name: 'schedules'
  });
  console.log('====================================');
  console.log(schedules);
  console.log('====================================');
  return (
    <div className="rounded-lg bg-white mt-10 md:p-10 p-4">
      <h2 className="mb-2 w-full flex flex-col justify-between mb-2 text-lg lg:text-xl font-light">
          <span className='text-blue-800 font-semibold'>Quand voulez vous envoyer message</span>
					<span className="text-gray-500 text-sm">Le message sera envoyé en fonction de votre fuseau horaire</span>
			</h2>
      <div className="form-wrapper">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {fields.map((field, index) => (
          <ScheduleEdit
            key={field.id}
            control={control}
            update={update}
            index={index}
            value={field}
          />
        ))}
      <button
        type="button"
        onClick={() => {
          append({ firstName: "" });
        }}
      >
        append
      </button>
      <input type="submit" />
    </form>
      </div>
    </div>
  )
}

export default Schedules
