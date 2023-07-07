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
            <ScheduleEdit 
            key={field.id}
              control={control}
              update={handleUpdate}
              index={fields.length - 1}
              value={tomorrow()}
            />
          ))}
            <button
              type="button"
              className="add-date_button"
              onClick={() => {
                append({ date: "" });
              }}
            >
              Ajouter une date <BiPlusCircle className="ml-2" />
            </button>
{/**
          <ul className="flex flex-wrap gap-2 py-2">
            {schedules
              .filter(({ date }) => date !== undefined)
              .map(({ date }, index) => (
                <li key={`schedule-${index}`}>
                  <button
                    type="button"
                    className="outline-blue-button"
                    onClick={() => append({ date: tomorrow() })}
                  >
                    {getHumanDate(date as any)}
                  </button>
                </li>
              ))}
            {displayForm ? null : (
              <li>
                <button
                  type="button"
                  className="add-date_button"
                  onClick={() => setDisplayForm(true)}
                >
                  Ajouter une date <BiPlusCircle className="ml-2" />
                </button>
              </li>
            )}
          </ul>
           */}
          <BottomBar stepIndex={0} nextDisabled={false} previousStep={() => null} />
        </form>
      </div>
    </div>
  );
}

export default Schedules;
