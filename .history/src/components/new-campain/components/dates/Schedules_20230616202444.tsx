import { NewCampainContext } from '@/context/NewCampainContext';
import { getHumanDate } from '@/utils';
import { useContext, useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { RxCrossCircled } from 'react-icons/rx';
import BottomBar from '../BottomBar';
import ScheduleEdit from './ScheduleEdit';

export interface Schedule {
  date: Date;
  handled: boolean;
}
function Schedules() {
  const context = useContext(NewCampainContext);
  const {
    state: {
      stepIndex,
      campain: { messages },
    },
    updateCampain,
    previousStep,
  } = context;
  const [formVisible, setFormVisible] = useState(true);

  const [schedules, setSchedules] = useState<Schedule[]>(messages[0].schedules);
  const removeSchedule = (scheduleToRemove: any) => {
    setSchedules(schedules.filter((schedule: any) => schedule.date !== scheduleToRemove.date));

    if (!schedules.length) {
      setFormVisible(true);
    }
  };
  const handleSchedule = (schedule: Schedule) => {
    setSchedules((current: Schedule[] = []) => {
      const uniqueAuthors = [...current, schedule].reduce(
        (accumulator: Schedule[], item: Schedule) => {
          if (
            !accumulator.find((entry: Schedule) => entry.date.getTime() === item.date.getTime())
          ) {
            accumulator.push(item);
          }
          return accumulator;
        },
        []
      );
      return uniqueAuthors;
    });
    setFormVisible(false);
  };
  const saveSchedules = (event: any) => {
    event.preventDefault();
    if (schedules.length) {
      let message = messages ? messages[0] : {};
      message = { ...message, schedules };
      updateCampain({ messages: Array(1).fill(message) });
    }
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
        {formVisible || !schedules.length ? <ScheduleEdit update={handleSchedule} /> : null}
        {schedules && schedules.length ? (
          <>
            <div className="mt-6">
              <p className="p3 mb-2 border-b border-blue-800 text-left text-lg font-semibold text-blue-800">
                Souhaiter envoyer ce message à d&apos;autres dates ?
              </p>
              <div className="grid"></div>
              <ul className="flex flex-wrap gap-2">
                {schedules
                  .sort(function (a: Schedule, b: Schedule) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b.date) - new Date(a.date);
                  })
                  .map((schedule: Schedule, index: number) => (
                    <li key={`schedule-${index}`}>
                      <span className="outline-blue-button">
                        {getHumanDate(schedule.date)}{' '}
                        <button type="button" onClick={() => removeSchedule(schedule)}>
                          <RxCrossCircled className="ml-3 text-red-600" />
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
            <BottomBar
              stepIndex={stepIndex}
              nextDisabled={false}
              previousStep={previousStep}
              nextButtonType="button"
              handleOnClick={saveSchedules}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Schedules;
