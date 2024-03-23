import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError, AxiosResponse } from 'axios';
import React, { createContext, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import { UseMutationResult, useMutation } from 'react-query';

import { axiosInstance } from '@/services/axios-instance';
import { schema } from './schama';

export const context = createContext<TDefault>({} as any);

type TDefault = {
  handleSubmitFn: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  mutation: UseMutationResult<AxiosResponse<any, any>, unknown, any, unknown>;
  //   onSubmit: (data: any) => void;
  radioSelectedValue: string;
  setRadioSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<FieldValues>;
  //   handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  formPageIndex: number;
  setFormPageIndex: React.Dispatch<React.SetStateAction<number>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState(
    'Une erreur est survenue, nous allons la résoudre sous peu'
  );

  const [formPageIndex, setFormPageIndex] = useState(0);

  const answerWebinaire = (data: any) => {
    return axiosInstance.post('/api/chillo-backoffice/items/Webinaire', data);
  };
  const mutation = useMutation({
    mutationFn: answerWebinaire,
    onError: (error) => {
      const { response } = error as AxiosError;
      const { data, status } = response as any;
      if (String(status).charAt(0) === '4' && data.message) {
        setErrorMessage(data.message);
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [radioSelectedValue, setRadioSelectedValue] = useState('');

  const onSubmit = (data: any) => {
    mutation.mutate({ ...data, date_inscription: new Date().toISOString() });
  };

  const handleSubmitFn = handleSubmit(onSubmit);

  return (
    <context.Provider
      value={{
        mutation,
        // onSubmit,
        radioSelectedValue,
        setRadioSelectedValue,
        register,
        handleSubmitFn,
        errors,
        setValue,
        formPageIndex,
        setFormPageIndex,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { Wrapper };
