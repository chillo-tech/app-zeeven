import { useFieldArray, useForm } from 'react-hook-form';
import { BiPlusCircle } from 'react-icons/bi';
import BottomBar from '../BottomBar';
import ScheduleEdit from './ScheduleEdit';
import { tomorrow } from '@/utils';

function Schedules() {
  const { control, handleSubmit } = useForm();
  const { fields, append, update } = useFieldArray({
    control,
    name: 'array',
  });
  return (
    <div className="mt-10 rounded-lg bg-white p-4 md:p-10">
      <h2 className="mb-2 mb-2 mb-4 flex w-full flex-col justify-between text-lg font-light lg:text-xl">
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
            className="add-date_button"
            onClick={() => {
              append({ date: tomorrow() });
            }}
          >
            Ajouter une date <BiPlusCircle className="ml-2" />
          </button>

          <BottomBar stepIndex={0} nextDisabled={false} previousStep={() => null} />
        </form>
      </div>
    </div>
  );
}

export default Schedules;
