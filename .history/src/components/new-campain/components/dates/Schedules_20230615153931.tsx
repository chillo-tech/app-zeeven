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
     
      </div>
    </div>
  );
}

export default Schedules;
