import formStyles from '@/styles/Form.module.css';
import classNames from 'classnames';
import { useContext } from 'react';
import { IQuestion } from '../../../types/Sondage';
import { formContext } from './wrapper';

const CustomSelect = ({
  question,
  name,
}: {
  question: IQuestion;
  name: `question_${string | number}`;
}) => {
  const { register, watch } = useContext(formContext);
  const selected = watch(name);
  return (
    <div className={`${formStyles.form_control} space-y-2`}>
      <label className={formStyles.form_control__label}>
        <span className={formStyles.form_control__label__first}>{question.label}</span>
      </label>
      <div className="space-y-2">
        {question.choix
          .sort((a, b) => a.choix_id.id - b.choix_id.id)
          .map((choice) => {
            const note = parseInt(choice.choix_id.valeur);
            const checked = Number(selected) === choice.choix_id.id;

            return (
              <div key={choice.choix_id.id}>
                <label
                  htmlFor={`${choice.choix_id.id}`}
                  className={classNames(
                    'relative flex cursor-pointer rounded-lg px-5 py-3 shadow-md focus:outline-none',
                    {
                      'text-white': checked,
                      'bg-red-400': checked && note === 1,
                      'bg-yellow-400': checked && note === 2,
                      'bg-sky-400': checked && note === 3,
                      'bg-blue-700': checked && note === 4,
                      'bg-green-900': checked && note === 5,
                      'bg-white': !checked,
                    }
                  )}
                >
                  {choice.choix_id.intitule}{' '}
                  <input
                    id={`${choice.choix_id.id}`}
                    type="radio"
                    className="hidden"
                    {...register(name)}
                    value={choice.choix_id.id}
                  />
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CustomSelect;
