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
