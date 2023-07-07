import { getHumanDate, tomorrow } from '@/utils';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BiPlusCircle } from 'react-icons/bi';
import BottomBar from '../BottomBar';
import ScheduleEdit from './ScheduleEdit';

function Schedules() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { schedules: [{ date: tomorrow() }] },
  });
  const schedules = watch('schedules');
  const { fields, append, update } = useFieldArray({
    control,
    name: 'schedules',
  });
  const handleUpdate = (index: number, data: any) => {
    update(index, data);
    console.log(index, data);
  };
  return (
    <div className="mt-10 rounded-lg bg-white p-4 md:p-10">
      <h2 className="mb-2 mb-2 mb-4 flex w-full flex-col justify-between text-lg font-light lg:text-xl">
        <span className="font-semibold text-blue-800">Quand voulez vous envoyer message</span>
        <span className="text-sm text-gray-500">
          Le message sera envoyé en fonction de votre fuseau horaire
        </span>
      </h2>
      <div className="form-wrapper">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
      {fields.map((field, index) => (
        <Edit
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
  );
}

export default Schedules;
