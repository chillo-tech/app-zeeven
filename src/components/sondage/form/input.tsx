import formStyles from '@/styles/Form.module.css';
import { IQuestion } from '@/types';
import { ChangeEvent, useContext, useEffect } from 'react';
import { formContext } from './wrapper';

const Input = ({
  question,
  name,
}: {
  question: IQuestion;
  name: `question_${string | number}`;
}) => {
  const { setForm, registerField, register, unRegisterField } = useContext(formContext);
  const registredProps = register(name);
  const inputProps = {
    ...registredProps,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));
      registredProps.onChange(e);
    },
  };
  useEffect(() => {
    registerField(name);
    return () => {
      unRegisterField(name);
    };
  }, []);
  return (
    <div className={`${formStyles.form_control} space-y-2`}>
      <label className={formStyles.form_control__label}>
        <span className={formStyles.form_control__label__first}>{question.label}</span>
      </label>
      <div>
        <input
          className={formStyles.form_control__input}
          placeholder="Votre réponse"
          type="text"
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default Input;
