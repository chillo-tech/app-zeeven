import { getHumanDate, tomorrow } from '@/utils';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BiPlusCircle } from 'react-icons/bi';
import ScheduleEdit from './ScheduleEdit';

function Schedules() {
  const [displayForm, setDisplayForm] = useState(true);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { schedules: [{ date:  tomorrow() }] },
  });
  const schedules = watch('schedules');
  const { fields, append, update } = useFieldArray({
    control,
    name: 'schedules',
  });
  const handleUpdate = (index: number, data: any) => {
    update(index, data);
    setDisplayForm(false);
  }
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
              update={handleUpdate}
              index={index}
              value={field}
            />
          ))}
          <ul className="flex gap-2 py-2">
            {schedules
              .filter(({ date }) => date !== undefined)
              .map((schedule , index) => (
                <li key={`schedule-${index}`}>
                  <button
                    type="button"
                    className="add-date_button"
                    onClick={() => append({ date: tomorrow() })}
                  >
                    {getHumanDate(date)} {JSON.stringify(date)}
                  </button>
                </li>
              ))}
            {displayForm ? null : (
              <li>
                <button
                  type="button"
                  className="add-date_button"
                  onClick={() => append({ date:  tomorrow()  })}
                >
                  Ajouter une date <BiPlusCircle className="ml-2" />
                </button>
              </li>
            )}
          </ul>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Schedules;
