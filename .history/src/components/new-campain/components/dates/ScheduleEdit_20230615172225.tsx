import { getInputFormattedDate } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
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
  const { control, handleSubmit } = useForm();
  const { fields, append, update } = useFieldArray({
    control,
    name: 'array'
  });
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
    {fields.map((field, index) => (
      <Edit
        key={field.id}
        control={control}
        update={update}
        index={index}
        value={field}
      />
    ))}

    <button
      type="button"
      onClick={() => {
        append({ firstName: "" });
      }}
    >
      append
    </button>
    <input type="submit" />
  </form>
  );
}

export default ScheduleEdit;
