import { useFieldArray, useForm } from 'react-hook-form';
import { BiPlusCircle } from 'react-icons/bi';
import BottomBar from '../BottomBar';
import ScheduleEdit from './ScheduleEdit';
import { tomorrow } from '@/utils';
import { useState } from 'react';

export interface Schedule{
  date: Date,
  handled: boolean
}
function Schedules() {
  const { control, handleSubmit, setValue } = useForm();

	const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
	const [schedules, setSchedules] = useState([]);
	const addContact = (data: any) => {
		setSchedules([...schedules, data])
	};
	const removeContact = (scheduleToRemove: any) => {
		setSchedules(schedules.filter((schedule: any) => schedule.date !== scheduleToRemove.date))
	};
  const handleDate = (schedule: any) => {
    console.log(schedule);
    
  }
  return (
    <div className="mt-10 rounded-lg bg-white p-4 md:p-10">
      <h2 className="mb-2 mb-2 mb-4 flex w-full flex-col justify-between text-lg font-light lg:text-xl">
        <span className="font-semibold text-blue-800">Quand voulez vous envoyer message</span>
        <span className="text-sm text-gray-500">
          Le message sera envoyé en fonction de votre fuseau horaire
        </span>
      </h2>
      <div className="form-wrapper">
        <ScheduleEdit update={handleDate}/>
      </div>
    </div>
  );
}

export default Schedules;
