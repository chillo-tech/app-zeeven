import { add, handleError } from '@/services';
import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import Message from '../Message';
import ImageDisplay from '../image-display';

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
};

function QRCodeVCARD({ type, handleMenu }: any) {
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
    })
    .required();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Message>({
    mode: 'onChange',
    defaultValues: { type },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Message) => mutation.mutate(data);

  return (
    <div className="py-3">
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
      {isSuccess ? (
        <div className="container mx-auto mb-10 overflow-hidden rounded-lg md:w-2/3">
          <div className="grid md:grid-cols-3">
            <div className="px-4 md:col-span-2">
              <Message
                type="success"
                firstMessage="Votre QR CODE a bien été généré"
                secondMessage="Inscrivez vous pour recevoir des statistiques personnalisées"
                action={() => router.push('/')}
                actionLabel="Retourner à l'accueil"
              />
            </div>
            <ImageDisplay
              base64={true}
              image={{ path: data, title: 'zeeven qr code' }}
              wrapperClasses="relative w-full md:h-full h-52"
              imageClasses="object-contain"
            />
          </div>
        </div>
      ) : null}
      {mutation.isIdle ? (
        <form noValidate className="block space-y-6 py-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 block flex flex-col md:flex-row w-full md:items-center">
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
          <div className="mb-2 block flex flex-col md:flex-row w-full md:items-center">
            <label htmlFor="name" className="input-label w-36 flex-none">
              Nom
            </label>
            <div className="grow" aria-labelledby="name">
              <div className="flex gap-3 flex-col md:flex-row w-full">
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
          <div className="mb-2 block flex flex-col md:flex-row w-full ">
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
              <div className="mt-3 flex flex-col md:flex-row w-full gap-2">
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
          <div className="mb-2 block flex flex-col md:flex-row w-full md:items-center">
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
          <div className="mb-2 block flex flex-col md:flex-row w-full md:items-center">
            <label htmlFor="name" className="input-label w-36 flex-none">
              Emploi
            </label>
            <div className="grow mt-3 md:flex sm:flex-col gap-2 md:gap-0" aria-labelledby="name">
              <div className="flex flex-col md:flex-row gap-3">
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
              <div className="mt-3 flex flex-col md:flex-row gap-3">
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
          <div className="mb-2 block flex flex-col md:flex-row w-full md:items-center">
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
          <div className="mb-2 block flex flex-col md:flex-row w-full md:items-center">
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
          <div className="mb-2 block flex flex-col md:flex-row w-full md:items-center">
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
          <div className="flex justify-end">
            <button type="submit" className="yellow-button !block w-full !text-center">
              Générer le QR code
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default QRCodeVCARD;
