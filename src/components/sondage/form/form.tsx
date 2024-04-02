import formStyles from '@/styles/Form.module.css';
import { IQuestion } from '@/types';
import { BaseSyntheticEvent } from 'react';
import { FieldErrorsImpl, UseFormRegister, UseFormWatch } from 'react-hook-form';
import CustomSelect from './customSelect';
import Input from './input';
import Wrapper from './wrapper';

const Form = ({
  onSubmit,
  questions,
  register,
  errors,
  watch
}: {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  questions: {
    question_id: IQuestion;
  }[];
  register: UseFormRegister<{
    [key: `question_${number}`]: string | number;
    [key: `question_${string}`]: string | number;
  }>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: `question_${string}`]: NonNullable<string | number>;
      [x: `question_${number}`]: NonNullable<string | number>;
    }>
  >;
  watch: UseFormWatch<{
    [key: `question_${number}`]: string | number;
    [key: `question_${string}`]: string | number;
  }>;
}) => {
  return (
    <Wrapper register={register} watch={watch}>
      <form onSubmit={onSubmit} className="space-y-4">
        {questions.map(({ question_id }, index) => {
          return (
            <div key={`Question-${question_id.id}-${index}`}>
              {question_id.choix.length > 0 ? (
                <CustomSelect name={`question_${question_id.id}`} question={question_id} />
              ) : (
                <Input name={`question_${question_id.id}`} question={question_id} />
              )}
              <p className={formStyles.form_control__error}>
                {errors[`question_${question_id.id}`]?.message}
              </p>
            </div>
          );
        })}

        <button className={formStyles.form_control__button}>Transmettre</button>
      </form>
    </Wrapper>
  );
};

export default Form;
