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
    date: yup.string().required('Merci de sélectionner une date'),
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
      date: '2000-10-30',
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
      
    </div>
  );
}

export default ScheduleEdit;
