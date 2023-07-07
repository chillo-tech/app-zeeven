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

function ScheduleEdit({ update, index, value, control }: any) {
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
    selectedDate.setSeconds(Number(seconds.trim()));
    update(index, selectedDate);
  };

  return (
    <form noValidate className="grid grid-cols-3 gap-4 items-end" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 block">
        <label
          htmlFor="date"
          className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
        >
          <span className="font-semibold text-blue-800">Date</span>
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
      <div className="mb-0 text-md pt-2 flex flex-col md:pt-8">
        <button type="submit"
            className="py-3 w-full first: bg-blue-800 hover:bg-blue-800 text-white font-light rounded-lg shadow-sm">
          Insérer dans la liste
        </button>
      </div>
    </form>
  );
}

export default ScheduleEdit;
