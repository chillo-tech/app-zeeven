import { add, handleError } from '@/services';
import {
  BLACK_COLOR,
  EMAIL_ERROR_MESSAGE,
  EMAIL_PATTERN,
  NONE,
  QRCODE_DEFAULT_TEXT,
  WHITE_COLOR,
} from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import Message from '../Message';
import QRCodePrevisualisation from './QRCodePrevisualisation';
import QRCodeSuccessMessage from './QRCodeSuccessMessage';
import QRCodeAppearance from './parameters/QRCodeAppearance';

export type Message = {
  name: string;
  organisation: string;
  type: string;
  data: {
    civility?: string;
    firstName: string;
    lastName: string;
    mobile?: string;
    fax?: string;
    phone?: string;
    email: string;
    company?: string;
    job?: string;
    street?: string;
    city?: string;
    zipcode?: string;
    state?: string;
    country?: string;
    website?: string;
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

function QRCodeVCARD({ type, params }: any) {
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
      sessionStorage.removeItem("qrcodeId");
      setIsSuccess(true);
      setQrCodeData({ path: data, title: 'QR CODE ZEEVEN' });
    },
  });
  const router = useRouter();
  const schema = yup
    .object({
      type: yup.string().trim().required('Ce champ est requis').default(type),
      data: yup.object({
        civility: yup.string().trim().required('Le champ civilité est requis'),
        firstName: yup.string().trim().required('Le champ prénom est requis'),
        lastName: yup.string().trim().required('Le champ est nom requis'),
        mobile: yup.string(),
        fax: yup.string(),
        phone: yup.string(),
        email: yup
          .string()
          .email(EMAIL_ERROR_MESSAGE)
          .required(EMAIL_ERROR_MESSAGE)
          .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE }),
        company: yup.string(),
        job: yup.string(),
        street: yup.string(),
        city: yup.string(),
        zipcode: yup.number(),
        state: yup.string(),
        country: yup.string(),
        website: yup.string(),
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
      <div className="options justify-arround flex flex-col px-2 py-3 md:col-span-3 md:p-4">
        {isError ? (
          <div className="container mx-auto mb-10 rounded-lg border-2 border-blue-300 bg-white md:w-2/3">
            <Message
              type="error"
              firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
              secondMessage="N'hésitez pas à nous passer un coup de fil"
              action={() => router.push('/')}
              actionLabel="Retourner à l'accueil"
            />
          </div>
        ) : null}
        {isSuccess ? <QRCodeSuccessMessage /> : null}
        {isIdle ? (
          <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid items-center space-y-4 rounded-xl bg-white px-4 py-4">
              <div className="mb-2 block flex w-full flex-col md:flex-row md:items-center">
                <label htmlFor="name" className="input-label w-36 flex-none">
                  Civilité
                </label>
                <div className="grow" aria-labelledby="name">
                  <input
                    type="text"
                    id="text"
                    placeholder="Votre civilité"
                    className="input-form"
                    {...register('data.civility')}
                  />
                  <p className="text-red-500">{errors?.data?.civility?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex w-full flex-col md:flex-row md:items-center">
                <label htmlFor="name" className="input-label w-36 flex-none">
                  Nom
                </label>
                <div className="grow" aria-labelledby="name">
                  <div className="flex w-full flex-col gap-3 md:flex-row">
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Prénom"
                      className="input-form"
                      {...register('data.firstName')}
                    />
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Nom"
                      className="input-form"
                      {...register('data.lastName')}
                    />
                  </div>
                  <p className="text-red-500">{errors?.data?.firstName?.message}</p>
                  <p className="text-red-500">{errors?.data?.lastName?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex w-full flex-col md:flex-row ">
                <label htmlFor="numeros" className="input-label w-36 flex-none">
                  Numéros
                </label>
                <div className="grow" aria-labelledby="numeros">
                  <input
                    type="text"
                    id="phone"
                    placeholder="Mobile"
                    className="input-form"
                    {...register('data.mobile')}
                  />
                  <div className="mt-3 flex w-full flex-col gap-2 md:flex-row">
                    <input
                      type="text"
                      id="phone"
                      placeholder="Fixe"
                      className="input-form"
                      {...register('data.phone')}
                    />
                    <input
                      type="text"
                      id="fax"
                      placeholder="Fax"
                      className="input-form"
                      {...register('data.fax')}
                    />
                  </div>
                  <p className="text-red-500">{errors?.data?.fax?.message}</p>
                  <p className="text-red-500">{errors?.data?.phone?.message}</p>
                  <p className="text-red-500">{errors?.data?.mobile?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex w-full flex-col md:flex-row md:items-center">
                <label htmlFor="email" className="input-label w-36 flex-none">
                  Email
                </label>
                <div className="grow" aria-labelledby="email">
                  <input
                    type="email"
                    id="text"
                    placeholder="Votre mail"
                    className="input-form"
                    {...register('data.email')}
                  />
                  <p className="text-red-500">{errors?.data?.email?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex w-full flex-col md:flex-row md:items-center">
                <label htmlFor="name" className="input-label w-36 flex-none">
                  Emploi
                </label>
                <div
                  className="mt-3 grow gap-2 sm:flex-col md:flex md:gap-0"
                  aria-labelledby="name"
                >
                  <div className="flex flex-col gap-3 md:flex-row">
                    <input
                      type="text"
                      id="company"
                      placeholder="Société"
                      className="input-form"
                      {...register('data.company')}
                    />
                    <input
                      type="text"
                      id="job"
                      placeholder="Profession"
                      className="input-form"
                      {...register('data.job')}
                    />
                  </div>
                  <p className="text-red-500">{errors?.data?.company?.message}</p>
                  <p className="text-red-500">{errors?.data?.job?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex flex-col md:flex-row">
                <label htmlFor="street" className="input-label w-36 flex-none">
                  Adresse
                </label>
                <div className="grow" aria-labelledby="street">
                  <input
                    type="text"
                    id="text"
                    placeholder="Votre rue"
                    className="input-form"
                    {...register('data.street')}
                  />
                  <div className="mt-3 flex flex-col gap-3 md:flex-row">
                    <input
                      type="number"
                      id="zip"
                      placeholder="Code postal"
                      className="input-form"
                      {...register('data.zipcode')}
                    />
                    <input
                      type="text"
                      id="city"
                      placeholder="Ville"
                      className="input-form"
                      {...register('data.city')}
                    />
                  </div>
                  <p className="text-red-500">{errors?.data?.street?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex w-full flex-col md:flex-row md:items-center">
                <label htmlFor="state" className="input-label w-36 flex-none">
                  Etat/région
                </label>
                <div className="grow" aria-labelledby="state">
                  <input
                    type="text"
                    id="text"
                    placeholder="Votre région"
                    className="input-form"
                    {...register('data.state')}
                  />
                  <p className="text-red-500">{errors?.data?.state?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex w-full flex-col md:flex-row md:items-center">
                <label htmlFor="country" className="input-label w-36 flex-none">
                  Pays
                </label>
                <div className="grow" aria-labelledby="country">
                  <input
                    type="text"
                    id="text"
                    placeholder="Votre pays"
                    className="input-form"
                    {...register('data.country')}
                  />
                  <p className="text-red-500">{errors?.data?.country?.message}</p>
                </div>
              </div>
              <div className="mb-2 block flex w-full flex-col md:flex-row md:items-center">
                <label htmlFor="website" className="input-label w-36 flex-none">
                  Site WEB
                </label>
                <div className="grow" aria-labelledby="website">
                  <input
                    type="text"
                    id="text"
                    placeholder="Votre site web"
                    className="input-form"
                    {...register('data.website')}
                  />
                  <p className="text-red-500">{errors?.data?.website?.message}</p>
                </div>
              </div>
              <div className="flex">
                <button type="submit" className="yellow-button">
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

export default QRCodeVCARD;
