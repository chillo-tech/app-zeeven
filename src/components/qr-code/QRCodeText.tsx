import { add, handleError } from '@/services';
import {
  BLACK_COLOR,
  INVALID_ERROR_MESSAGE,
  NONE,
  QRCODE_DEFAULT_TEXT,
  QR_CODES_TYPES,
  REQUIRED_FIELD_ERROR_MESSAGE,
  URL_PATTERN,
  WHITE_COLOR,
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
import QRCodeAppearance from './parameters/QRCodeAppearance';

export type Message = {
  name: string;
  organisation: string;
  type: string;
  text: string;
  data: {
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

function QRCodeText({ type, params, placeholder }: any) {
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
        text: yup.string()
          .required(REQUIRED_FIELD_ERROR_MESSAGE)
          .test("validate-text", "Le format de données sasi est invalide", (value = "", context) => {
            const type = context.parent.type;
            if (type === 'LINK') {
              const re = new RegExp(URL_PATTERN);
              return re.test(value.trim());
            }
            if (type === 'PHONE') {
              const re = new RegExp(URL_PATTERN);
              return re.test(value.trim());
            }
            return value.trim().length > 0;
          })
          .when('$other', {
            is: (val: any) => { return val === 'LINK' },
            then: (schema) =>
              schema.matches(URL_PATTERN, {
                message: INVALID_ERROR_MESSAGE,
                excludeEmptyString: true,
              }),
          }),
        type: yup.string().trim().required(REQUIRED_FIELD_ERROR_MESSAGE).default(type),
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
          <div className="container mx-auto mb-10 rounded-lg bg-white md:w-2/3">
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
        {isIdle ? (
          <div className="grid items-center gap-4">
            <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid space-y-4 items-center rounded-xl bg-white py-4 px-4">
                <div className="block">
                  <input
                    type="text"
                    id="text"
                    placeholder={placeholder}
                    className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 text-xl shadow-sm focus:border-indigo-500"
                    {...register('data.text')}
                  />
                  <p className="text-red-500">{errors?.data?.text?.message}</p>
                </div>
                <div className="flex">
                  <button type="submit" className="yellow-button">
                    <span>Générer le QR code</span>
                  </button>
                </div>
                <small className="font-semi mt-2 text-gray-500">{params.description}</small>
              </div>
              <QRCodeAppearance register={register} setValue={setValue} data={formData} />
            </form>
          </div>
        ) : null}
      </div>

      <div className="qr-code bg-white p-8 flex flex-col justify-center">
        <QRCodePrevisualisation formData={formData} qrCodeData={qrCodeData} isValid={isValid} />
      </div>
    </div>
  );
}

export default QRCodeText;
