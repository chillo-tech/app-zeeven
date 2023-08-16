import { add, handleError } from '@/services';
import {
  INVALID_ERROR_MESSAGE,
  QR_CODES_TYPES,
  REQUIRED_FIELD_ERROR_MESSAGE,
  URL_PATTERN,
} from '@/utils';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Message from '../Message';
import QRCodeSuccessMessage from './QRCodeSuccessMessage';
import QRCodePrevisualisation from './QRCodePrevisualisation';

export type Message = {
  name: string;
  organisation: string;
  type: string;
  text: string;
  data: {
    text: string;
  };
};

function QRCodeText({ type, handleMenu }: any) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState({});
  const mutation = useMutation({
    mutationFn: (applicationMessage: Message) => add('/api/backend/qr-code', applicationMessage),
    onError: (error: any) => {
      handleMenu(false);
      setIsError(true), handleError(error);
    },
    onSuccess: ({ data }: any) => {
      handleMenu(false);
      setIsSuccess(true);
      setData(data);
    },
  });
  const router = useRouter();
  const schema = yup
    .object({
      type: yup.string().trim().required(REQUIRED_FIELD_ERROR_MESSAGE).default(type),
      text: yup
        .string()
        .required(REQUIRED_FIELD_ERROR_MESSAGE)
        .when('type', {
          is: (val: any) => val === 'LINK',
          then: (schema) =>
            schema.matches(URL_PATTERN, {
              message: INVALID_ERROR_MESSAGE,
              excludeEmptyString: true,
            }),
        }),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Message>({
    mode: 'onChange',
    defaultValues: { type },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Message) => mutation.mutate(data);
  const getParams = (field: String) => {
    const params = QR_CODES_TYPES.filter(({ value }: any) => value === type).map(
      ({ placeholder }: any) => ({ placeholder })
    );
    const param = params[0];
    return (param as any)[field];
  };
  return (
    <div className="py-3">
      {isError ? (
        <div className="container mx-auto mb-10 rounded-lg border-2 border-blue-300 bg-white md:w-2/3">
          <Message
            type="error"
            firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
            secondMessage="N'hésitez pas à nous passer un coup de fil"
            action={handleError}
            actionLabel="Retourner à l'accueil"
          />
        </div>
      ) : null}
      {isSuccess ? <QRCodeSuccessMessage data={data} /> : null}
      {mutation.isIdle ? (
        <div className="grid md:grid-cols-6 gap-4 items-center">
          <form noValidate className="block space-y-6 md:col-span-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="block">
              <input
                type="text"
                id="text"
                placeholder={`${getParams('placeholder')}`}
                className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 text-xl shadow-sm focus:border-indigo-500"
                {...register('text')}
              />
              <p className="text-red-500">{errors?.text?.message}</p>
            </div>
            <div className="flex">
              <button type="submit" className="yellow-button">
                <span>Générer le QR code</span>
              </button>
            </div>
          </form>
          <QRCodePrevisualisation data={data} classes="md:col-span-2 border border-gray-200 p-4 rounded-md"/>
        </div>
      ) : null}
    </div>
  );
}

export default QRCodeText;
