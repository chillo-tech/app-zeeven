import { getInputFormattedDate } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useForm, useWatch } from 'react-hook-form';
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
  const { register, handleSubmit } = useForm({
    defaultValues: value
  });
  return (
    <div>
      <ScheduleDisplay control={control} index={index} />
      <div className="grid grid-cols-3">
      <div className="block mb-2">
            <label htmlFor="date" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
              <span className='text-blue-800 font-semibold'>Date</span>
            </label>
            <input id="date" type="date" min={getInputFormattedDate(new Date())}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
                {...register("date")}/>
            <p className="text-red-500">{errors?.date?.message}</p>
          </div>
          <div className="block">
            <label htmlFor="time" className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
              <span className='text-blue-800 font-semibold'>Heure</span>
            </label>
            <input type="time" id="time"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-5000 py-3"
                {...register("time")}/>
            <p className="text-red-500">{errors?.time?.message}</p>
          </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit((data) => update(index, data))}
      >
        Submit
      </button>
    </div>
  );
}

export default ScheduleEdit;
