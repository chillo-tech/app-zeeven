import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
type TFormData = { [key: string]: any };
export const formContext = createContext<{
  form: TFormData;
  setForm: Dispatch<SetStateAction<TFormData>>;
  registerField: (name: string) => void;
  unRegisterField: (name: string) => void;
  register: UseFormRegister<{
    [key: `question_${number}`]: string | number;
    [key: `question_${string}`]: string | number;
  }>;
  setValue: UseFormSetValue<{
    [key: `question_${string}`]: string | number;
    [key: `question_${number}`]: string | number;
  }>;
  getValues: UseFormGetValues<{
    [key: `question_${string}`]: string | number;
    [key: `question_${number}`]: string | number;
  }>;
  setError: UseFormSetError<{
    [key: `question_${string}`]: string | number;
    [key: `question_${number}`]: string | number;
  }>;

  clearErrors: UseFormClearErrors<{
    [key: `question_${string}`]: string | number;
    [key: `question_${number}`]: string | number;
  }>;
}>({} as any);

const Wrapper = ({
  children,
  register,
  setError,
  setValue,
  getValues,
  clearErrors,
}: {
  children: ReactNode;
  register: UseFormRegister<{
    [key: `question_${number}`]: string | number;
    [key: `question_${string}`]: string | number;
  }>;
  setValue: UseFormSetValue<{
    [key: `question_${string}`]: string | number;
    [key: `question_${number}`]: string | number;
  }>;
  getValues: UseFormGetValues<{
    [key: `question_${string}`]: string | number;
    [key: `question_${number}`]: string | number;
  }>;
  setError: UseFormSetError<{
    [key: `question_${string}`]: string | number;
    [key: `question_${number}`]: string | number;
  }>;

  clearErrors: UseFormClearErrors<{
    [key: `question_${string}`]: string | number;
    [key: `question_${number}`]: string | number;
  }>;
}) => {
  const [form, setForm] = useState<TFormData>({});
  const registerField = (name: string) => {
    if (form[name]) {
      throw new Error(`A field with the name ${name} already exist`);
    }
    setForm((prev) => ({ ...prev, [name]: '' }));
  };
  const unRegisterField = (name: string) => {
    setForm((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
    form[name];
  };
  return (
    <formContext.Provider
      value={{
        form,
        setForm,
        registerField,
        unRegisterField,
        register,
        setError,
        setValue,
        getValues,
        clearErrors,
      }}
    >
      {children}
    </formContext.Provider>
  );
};

export default Wrapper;
