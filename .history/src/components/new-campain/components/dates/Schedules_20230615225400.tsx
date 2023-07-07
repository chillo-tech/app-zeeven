import { getHumanDate } from '@/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiPlusCircle } from 'react-icons/bi';
import { RxCrossCircled } from 'react-icons/rx';
import ScheduleEdit from './ScheduleEdit';

export interface Schedule {
  date: Date;
  handled: boolean;
}
function Schedules() {
  const { control, handleSubmit, setValue } = useForm();
  const [formVisible, setFormVisible] = useState(true);

  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const removeSchedule = (scheduleToRemove: any) => {
    setSchedules(schedules.filter((schedule: any) => schedule.date !== scheduleToRemove.date));
    
    if(!schedules.length) {
      setFormVisible(true);
    }
  };
  const handleSchedule = (schedule: Schedule) => {

    setSchedules((current: Schedule[]) => {
      const uniqueAuthors = [...current, schedule].reduce((accumulator, current) => {
        if (!accumulator.find((item) => item.tweet.author.id === current.tweet.author.id)) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
     return [...current, schedule]
    });
    setFormVisible(false);
    
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
        { (formVisible || !schedules.length) ? <ScheduleEdit update={handleSchedule} /> : null}
        {schedules && schedules.length ? (
          <div className="mt-6">
            <p className="p3 mb-2 border-b border-blue-800 text-left text-lg font-semibold text-blue-800">
              Souhaiter envoyer ce message à d&apos;autres dates ?
            </p>
            <div className="grid"></div>
            <ul className="flex flex-wrap gap-2">
              {schedules.map((schedule: Schedule, index: number) => (
                <li key={`schedule-${index}`}>
                  <span className="outline-blue-button">
                    {getHumanDate(schedule.date)}{' '}
                    <button
                      type="button"
                      onClick={() => removeSchedule(schedule)}
                    >
                      <RxCrossCircled className="ml-3 text-red-900" />
                    </button>
                  </span>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="add-date_button"
                  onClick={() => setFormVisible(!formVisible)}
                >
                  Ajouter une date <BiPlusCircle className="ml-3" />
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Schedules;
