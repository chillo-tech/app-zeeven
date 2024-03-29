import formStyles from '@/styles/Form.module.css';
import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import { IQuestion } from '../../../types/Sondage';
import { formContext } from './wrapper';

const CustomSelect = ({
  question,
  name,
}: {
  question: IQuestion;
  name: `question_${string | number}`;
}) => {
  const {
    form,
    setForm,
    registerField,
    unRegisterField,
    getValues,
    setError,
    setValue,
    clearErrors,
  } = useContext(formContext);
  useEffect(() => {
    registerField(name);
    const tempValues: (string | number)[] = [];
    question.choix.forEach(({ choix_id: { id } }) => {
      if (tempValues.includes(id)) {
        throw new Error('Each values of each choices of a question should be unique', {
          cause: `value ${id}`,
        });
      }
      tempValues.push(id);
    });
    return () => {
      unRegisterField(name);
    };
  }, [name]);
  return (
    <div className={`${formStyles.form_control} space-y-2`}>
      <label className={formStyles.form_control__label}>
        <span className={formStyles.form_control__label__first}>{question.label}</span>
      </label>
      <div>
        {question.choix.map((choice) => {
          return (
            <div
              key={choice.choix_id.id}
              onClick={() => {
                if (getValues(name) !== choice.choix_id.id) {
                  setValue(name, choice.choix_id.id);
                  clearErrors(name);
                } else {
                  setValue(name, 0);
                  setError(name, { message: 'Ce champ est requis' });
                }
                setForm((prev) => ({
                  ...prev,
                  [name]: prev[name] === choice.choix_id.id ? 0 : choice.choix_id.id,
                }));
              }}
              className={` my-1 cursor-pointer items-center select-none rounded-md px-4 py-2 flex justify-between transition-all  ${classNames(
                {
                  'bg-green-500 text-white hover:!bg-green-500 hover:!text-white':
                    form[name] === choice.choix_id.id,
                  'border border-green-500 hover:bg-green-300 hover:text-black text-black': form[name] !== choice.choix_id.id,
                }
              )}`}
            >
              {choice.choix_id.intitule} <input checked={form[name] === choice.choix_id.id} type='radio'/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomSelect;
