import { getInputFormattedDate } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
type FormValues = {
  date: string;
  time: string;
};
const schema = yup
  .object({
    date: yup.string().required('Merci de sélectionner une date'),
    time: yup.string(),
  })
  .required();

function ScheduleEdit({ update }: any) {
  const now = new Date();
  now.setDate(now.getDate() + 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: getInputFormattedDate(now),
      time: '00:00',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ date, time }: FormValues) => {
    const [hours, seconds] = time.split(':');
    let selectedDate = new Date(date);
    selectedDate.setHours(Number(hours.trim()));
    selectedDate.setMinutes(Number(seconds.trim()));
    update({ date: selectedDate, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  };

  return (
    <form noValidate className="grid md:grid-cols-3 items-end gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="block">
        <label
          htmlFor="date"
          className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
        >
          <span className="font-semibold text-app-blue">Date</span>
        </label>
        <input
          id="date"
          type="date"
          min={getInputFormattedDate(new Date())}
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
          <span className="font-semibold text-app-blue">Heure</span>
        </label>
        <input
          type="time"
          id="time"
          className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-3 shadow-sm focus:border-indigo-500"
          {...register('time')}
        />
        <p className="text-red-500">{errors?.time?.message}</p>
      </div>
      <div className="text-md mb-0 flex flex-col pt-2 md:pt-8">
        <button
          type="submit"
          className="first: w-full rounded-lg bg-blue-800 py-3 font-light text-white shadow-sm hover:bg-blue-800"
        >
          Enregistrer la date
        </button>
      </div>
    </form>
  );
}

export default ScheduleEdit;