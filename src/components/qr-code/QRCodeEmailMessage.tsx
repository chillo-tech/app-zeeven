import { add, handleError } from '@/services';
import {
  BLACK_COLOR,
  NONE,
  EMAIL_PATTERN,
  EMAIL_ERROR_MESSAGE,
  QRCODE_DEFAULT_TEXT,
  REQUIRED_FIELD_ERROR_MESSAGE,
  WHITE_COLOR,
} from '@/utils';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Message from '../Message';
import QRCodeSuccessMessage from './QRCodeSuccessMessage';
import QRCodeAppearance from './parameters/QRCodeAppearance';
import QRCodePrevisualisation from './QRCodePrevisualisation';

export type Message = {
  name: string;
  organisation: string;
  type: string;
  data: {
    email: string;
    text: string;
  };
  params?: {
    shape?: {
      selected: string;
      text: string;
      bgColor: string;
      textColor: string;
    };
  };
};

function QRCodeEmailMessage({ type, params }: any) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [qrCodeData, setQrCodeData] = useState({});

  const { mutate, isIdle } = useMutation({
    mutationFn: ({ temp, data }: any) => add(`/api/backend/qr-code?simulate=${temp}`, data),
    onError: (error: any) => {
      console.log({ error })
      setIsError(true), handleError(error);
    },
    onSuccess: ({ data }: any) => {
      sessionStorage.removeItem("qrcodeId");
      setIsSuccess(true);
      setQrCodeData({ path: data, title: 'QR CODE ZEEVEN' });
    }
  });
  const schema = yup
    .object({
      type: yup.string().trim().required(REQUIRED_FIELD_ERROR_MESSAGE).default(type),
      data: yup.object({
        email: yup
          .string()
          .required(EMAIL_ERROR_MESSAGE)
          .email(EMAIL_ERROR_MESSAGE)
          .matches(EMAIL_PATTERN, { excludeEmptyString: true, message: EMAIL_ERROR_MESSAGE }),
        text: yup.string(),
      }),
      params: yup
        .object({
          shape: yup.object({
            selected: yup.string().default(NONE),
            color: yup.string(),
            text: yup.string().default(QRCODE_DEFAULT_TEXT),
          }),
        })
        .default({
          shape: {
            selected: NONE,
            text: QRCODE_DEFAULT_TEXT,
            bgColor: BLACK_COLOR,
            textColor: WHITE_COLOR,
          },
        }),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<Message>({
    mode: 'onChange',
    defaultValues: {
      type: type,
      params: {
        shape: {
          selected: NONE,
          text: QRCODE_DEFAULT_TEXT,
          bgColor: BLACK_COLOR,
          textColor: WHITE_COLOR,
        },
      },
    },
    resolver: yupResolver(schema),
  });
  const formData = watch();
  const onSubmit = (data: Message) => mutate({ temp: false, data });

  return (
    <div className="grid w-full bg-slate-100 md:grid-cols-4">
      <div className="options flex flex-col justify-arround py-3 px-2 md:col-span-3 md:p-4">
        {isError ? (
          <div className="un-erreur container mx-auto mb-10 rounded-lg bg-white">
            <Message
              type="error"
              firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
              secondMessage="N'hésitez pas à nous passer un coup de fil"
              action={handleError}
              actionLabel="Retourner à l'accueil"
            />
          </div>
        ) : null}
        {isSuccess ? <QRCodeSuccessMessage /> : null}
        {(isIdle) ? (
          <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid items-center space-y-4 rounded-xl bg-white px-4 py-4">
              <div className="text-md mb-0">
                <label htmlFor="email" className="input-label">
                  Votre email
                </label>
                <div className="mt-1 flex flex-col md:flex-row">
                  <input
                    placeholder="Votre adresse mail"
                    type="email"
                    autoComplete="false"
                    className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 text-xl shadow-sm focus:border-indigo-500"
                    {...register('data.email')}
                    id="email"
                  />
                </div>
                <p className="text-red-600">{errors?.data?.email?.message}</p>
              </div>
              <div className="block">
                <label htmlFor="message" className="input-label">
                  Votre message
                </label>
                <textarea
                  placeholder="Nous sommes à votre écoute, dites nous tout."
                  id="message"
                  rows={4}
                  className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                  {...register('data.text')}
                ></textarea>
                <p className="text-red-500">{errors?.data?.text?.message}</p>
              </div>
              <div className="flex">
                <button type="submit" className="yellow-button">
                  <span>Générer le QR code</span>
                </button>
              </div>
              <small className="font-semi mt-2 text-gray-600">{params.description}</small>
            </div>
            <QRCodeAppearance register={register} setValue={setValue} data={formData} />
          </form>
        ) : null}
      </div>

      <div className="qr-code bg-white p-8 flex flex-col justify-center">
        <QRCodePrevisualisation formData={formData} qrCodeData={qrCodeData} isValid={isValid} />
      </div>
    </div>
  );
}

export default QRCodeEmailMessage;
