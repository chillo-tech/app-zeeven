import { useFieldArray, useForm } from 'react-hook-form';
import ScheduleEdit from './ScheduleEdit';
import { BiPlusCircle } from 'react-icons/bi';

function Schedules() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { schedules: [{ date: '' }] },
  });
  const schedules = watch('schedules');
  const { fields, append, update } = useFieldArray({
    control,
    name: 'schedules',
  });
  console.log('====================================');
  console.log(schedules);
  console.log('====================================');
  return (
    <div className="mt-10 rounded-lg bg-white p-4 md:p-10">
      <h2 className="mb-2 mb-2 flex w-full flex-col justify-between text-lg font-light lg:text-xl">
        <span className="font-semibold text-blue-800">Quand voulez vous envoyer message</span>
        <span className="text-sm text-gray-500">
          Le message sera envoyé en fonction de votre fuseau horaire
        </span>
      </h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          {fields.map((field, index) => (
            <ScheduleEdit
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
              append({ date: '' });
            }}
          >
            append
          </button>
          <input type="submit" />
        </form>
        <ul>
          <li> 
              <button type="button" className="add-date_button" onClick={() =>append({ date: '' });}>
                Ajouter une date <BiPlusCircle className='ml-2'/> 
              </button> 
            </li>
        </ul>
        {
          schedules.map(
            (item, index) => ()
          )
        }
      </div>
    </div>
  );
}

export default Schedules;
