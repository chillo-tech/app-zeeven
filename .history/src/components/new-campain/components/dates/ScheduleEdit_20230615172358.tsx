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
  const data = useWatch({
    control,
    name: `array.${index}`
  });
  return <p>{data?.firstName}</p>;
};


  return (
    <div>
      <ScheduleDisplay control={control} index={index} />
      
      <input
        placeholder="first name"
        {...register(`firstName`, { required: true })}
      />

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
