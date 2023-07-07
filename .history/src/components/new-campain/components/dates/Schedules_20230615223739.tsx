import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiPlusCircle } from 'react-icons/bi';
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
  const addContact = (data: Schedule) => {};
  const removeContact = (scheduleToRemove: any) => {
    setSchedules(schedules.filter((schedule: any) => schedule.date !== scheduleToRemove.date));
  };
  const handleDate = (schedule: Schedule) => {
    setSchedules((current: Schedule[]) => [...current, schedule]);
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
        {formVisible ? <ScheduleEdit update={handleDate} /> : null}
        {schedules && schedules.length ? (
          <div className="mt-6">
            <p className="p3 mb-2 border-b border-blue-800 text-left text-lg font-semibold text-blue-800">
              Souhaiter envoyer ce message à d&apos;autres dates ?
            </p>
            <div className="grid"></div>
            <ul>
              {
                schedules.map((schedule: Schedule, index: number) => (
                  <li key={`schedule-${index}`}>
                <button
                  type="button"
                  className="add-date_button"
                  onClick={() => setFormVisible(!formVisible)}
                >
                  {getHumanDate(schedule.date) }<BiPlusCircle className="ml-2" />
                </button>
              </li>
                ))
              }
              <li>
                <button
                  type="button"
                  className="add-date_button"
                  onClick={() => setFormVisible(!formVisible)}
                >
                  Ajouter une date <BiPlusCircle className="ml-2" />
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
