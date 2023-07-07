import { getInputFormattedDate } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
type FormValues = {
  date: string;
  time: string;
};
const schema = yup
  .object({
    date: yup.date().required('Merci de sélectionner une date'),
    time: yup.string(),
  })
  .required();

function ScheduleEdit({ update, index, value, control }: any) {
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: value,
      time: '00:00',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ date, time }: FormValues) => {
    const [hours, minutes] = time.split(':');
    let selectedDate = new Date(date);
    selectedDate.setHours(Number(hours.trim()));
    selectedDate.setMinutes(Number(minutes.trim()));
    update(index, {date: selectedDate});
  };
console.log('====================================');
console.log({value});
console.log('====================================');
  return (
    <div className={classNames('grid items-end w-full gap-2', {'grid-cols-3': true})}>
      <div className="block">
        <label
          htmlFor="date"
          className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
        >
          <span className="font-semibold text-blue-800">Date</span>
        </label>
        <input
          id="date"
          type="date"
          min={getInputFormattedDate(value)}
          className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-3 shadow-sm focus:border-indigo-500"
          {...register('date')}
        />
        <p className="text-red-500">{errors?.date?.message}</p>
      </div> 
      <div className="block">
        <label
          htmlFor="time"
          className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
        >
          <span className="font-semibold text-blue-800">Heure</span>
        </label>
        <input
          type="time"
          id="time"
          className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-3 shadow-sm focus:border-indigo-500"
          {...register('time')}
        />
        <p className="text-red-500">{errors?.time?.message}</p>
      </div>
     
      <div className="text-md mb-0 flex flex-col">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="first: w-full rounded-lg bg-blue-800 py-3 font-light text-white shadow-sm hover:bg-blue-800"
          >
            Insérer dans la liste
          </button>
        </div>
    </div>
  );
}

export default ScheduleEdit;
