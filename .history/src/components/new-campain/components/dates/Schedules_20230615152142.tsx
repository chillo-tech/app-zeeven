import { useFieldArray, useForm } from 'react-hook-form';
import { BiPlusCircle } from 'react-icons/bi';
import ScheduleEdit from './ScheduleEdit';
import { getDisplayedDate } from '@/utils';
import { useState } from 'react';

function Schedules() {
  const [displayForm, setDisplayForm] = useState(initialState)
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { schedules: [{ date: '' }] },
  });
  const schedules = watch('schedules');
  const { fields, append, update } = useFieldArray({
    control,
    name: 'schedules',
  });
  console.log('====================================');
  console.log(schedules);
  console.log('====================================');
  return (
    <div className="mt-10 rounded-lg bg-white p-4 md:p-10">
      <h2 className="mb-2 mb-2 flex w-full flex-col justify-between text-lg font-light lg:text-xl">
        <span className="font-semibold text-blue-800">Quand voulez vous envoyer message</span>
        <span className="text-sm text-gray-500">
          Le message sera envoyé en fonction de votre fuseau horaire
        </span>
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
          <ul className="flex gap-2 py-2">
            {schedules
            .filter(({date}, index) => date.trim().length > 0)
            .map(({date}, index) => (
              <li key={`schedule-${index}`}>
                <button
                  type="button"
                  className="add-date_button"
                  onClick={() => append({ date: '' })}
                >
                  {getDisplayedDate(date)}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="add-date_button"
                onClick={() => append({ date: '' })}
              >
                Ajouter une date <BiPlusCircle className="ml-2" />
              </button>
            </li>
          </ul>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Schedules;
