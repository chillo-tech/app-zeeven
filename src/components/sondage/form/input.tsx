import formStyles from '@/styles/Form.module.css';
import { IQuestion } from '@/types';
import { useContext } from 'react';
import { formContext } from './wrapper';

const Input = ({
  question,
  name,
}: {
  question: IQuestion;
  name: `question_${string | number}`;
}) => {
  const { register } = useContext(formContext);
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
          {...register(name)}
        />
      </div>
    </div>
  );
};

export default Input;
