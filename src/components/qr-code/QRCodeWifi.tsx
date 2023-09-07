import { add, handleError } from '@/services';
import {
  BLACK_COLOR,
  NONE,
  QRCODE_DEFAULT_TEXT,
  REQUIRED_FIELD_ERROR_MESSAGE,
  WHITE_COLOR,
  WIFI_ENCODAGE,
  slugify,
} from '@/utils';
import { RadioGroup, Switch } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import Message from '../Message';
import QRCodeSuccessMessage from './QRCodeSuccessMessage';
import QRCodePrevisualisation from './QRCodePrevisualisation';
import QRCodeAppearance from './parameters/QRCodeAppearance';

export type Message = {
  name: string;
  organisation: string;
  type: string;
  data: {
    hidden?: boolean;
    name: string;
    password?: string;
    encodage?: string;
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

function QRCodeWifi({ type, params }: any) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [qrCodeData, setQrCodeData] = useState({});

  const { mutate, isIdle } = useMutation({
    mutationFn: ({ temp, data }: any) => add(`/api/backend/qr-code?simulate=${temp}`, data),
    onError: (error: any) => {
      console.log({ error });
      setIsError(true), handleError(error);
    },
    onSuccess: ({ data }: any) => {
      setIsSuccess(true);
      setQrCodeData({ path: data, title: 'QR CODE ZEEVEN' });
    },
  });
  const schema = yup
    .object({
      type: yup.string().trim().required(REQUIRED_FIELD_ERROR_MESSAGE).default(type),
      data: yup.object({
        hidden: yup.boolean().default(false),
        name: yup.string().trim().required(REQUIRED_FIELD_ERROR_MESSAGE),
        password: yup.string().default(''),
        encodage: yup.string().default(''),
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
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
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
  const [enabled, setEnabled] = useState(false);
  const [encodage, setEncodage] = useState('');
  const handleEncodage = (encodage: string) => {
    const {data} = formData;
    setEncodage(encodage);
    setValue('data', { ...data, encodage });
  };
  const handleEnabled = (hidden: boolean) => {
    const {data} = formData;
    setEnabled(hidden);
    setValue('data', { ...data, hidden });
  };
  const onSubmit = (data: Message) => mutate({ temp: false, data });

  return (
    <div className="grid w-full bg-slate-100 md:grid-cols-4">
      <div className="options justify-arround flex flex-col px-2 py-3 md:col-span-3 md:p-4">
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
        {isIdle ? (
          <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid items-center space-y-4 rounded-xl bg-white px-4 py-4">
              <Switch.Group>
                <div className="mt-4 flex items-center">
                  <Switch.Label className="w-36 text-xl">Wifi masqué ?</Switch.Label>
                  <Switch
                    checked={enabled}
                    onChange={handleEnabled}
                    className={`${
                      enabled ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </Switch.Group>
              <div className="mb-2 block flex flex-col md:flex-row md:items-center">
                <label htmlFor="name" className="input-label w-36 flex-none">
                  Nom
                </label>
                <div className="grow" aria-labelledby="name">
                  <input
                    type="text"
                    id="text"
                    placeholder="Home wifi"
                    className="input-form"
                    {...register('data.name')}
                  />
                  <p className="text-red-500">{errors?.data?.name?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex flex-col  md:flex-row md:items-center">
                <label htmlFor="password" className="input-label w-36 flex-none">
                  Mot de passe
                </label>
                <div className="grow" aria-labelledby="password">
                  <input
                    type="password"
                    id="text"
                    placeholder="Mot de passe"
                    className="input-form"
                    {...register('data.password')}
                  />
                  <p className="text-red-500">{errors?.data?.password?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex flex-col md:flex-row md:items-center">
                <label htmlFor="Encodage" className="input-label w-36 flex-none">
                  Encodage
                </label>
                <div className="md:mx-auto md:flex md:w-full" aria-labelledby="Encodage">
                  <RadioGroup
                    value={encodage}
                    onChange={handleEncodage}
                    name="encodage"
                    defaultValue={''}
                  >
                    <div className="flex w-full flex-col gap-2 rounded-md bg-white md:flex-row">
                      {WIFI_ENCODAGE.map(({ label, value }: { label: string; value: string }) => (
                        <RadioGroup.Option
                          key={`encodage-${slugify(label)}`}
                          value={value}
                          className={({ checked }) => `
                      ${
                        checked
                          ? 'border-indigo-200 bg-app-blue text-white'
                          : 'border-blue-900 bg-white text-app-blue'
                      }
                      justitfy-center relative cursor-pointer rounded-lg border px-6 py-2 md:flex md:items-center
                    `}
                        >
                          {label}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                  <p className="text-red-500">{errors?.data?.encodage?.message}</p>
                </div>
              </div>
              <div className="flex">
                <button type="submit" className="yellow-button !text-center">
                  Générer le QR code
                </button>
              </div>
              <small className="font-semi mt-2 text-gray-500">{params.description}</small>
            </div>
            <QRCodeAppearance register={register} setValue={setValue} data={formData} />
          </form>
        ) : null}
      </div>
      <div className="qr-code flex flex-col justify-center bg-white p-8">
        <QRCodePrevisualisation formData={formData} qrCodeData={qrCodeData} isValid={isValid} />
      </div>
    </div>
  );
}

export default QRCodeWifi;
