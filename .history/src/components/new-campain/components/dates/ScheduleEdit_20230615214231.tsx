import { getInputFormattedDate } from '@/utils';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ScheduleDisplay from './ScheduleDisplay';
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

function ScheduleEdit({ update, index, value, control, displayForm }: any) {
  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: value,
  });
  return (
    <div>
      <ScheduleDisplay control={control} index={index} />
      <div className="grid grid-cols-3">
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
            {...register('date', {required: true})}
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
      </div>

      <button type="button" onClick={handleSubmit((data) => update(index, data))}>
        Submit
      </button>
    </div>
  );
}

export default ScheduleEdit;
