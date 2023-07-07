import { add, handleError } from '@/services';
import { WIFI_ENCODAGE, slugify } from '@/utils';
import { RadioGroup } from '@headlessui/react';
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
        civility: yup.string().trim().required('Ce champ est requis'),
        firstName: yup.string().trim().required('Ce champ est requis'),
        lastName: yup.string().trim().required('Ce champ est requis'),
        mobile: yup.string(),
        fax: yup.string(),
        phone: yup.string(),
        email: yup.string().trim().required('Ce champ est requis'),
        company: yup.string(),
        job: yup.string(),
        street: yup.string(),
        city: yup.string(),
        zipcode: yup.string(),
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
  const currentData = watch('data');
  const [enabled, setEnabled] = useState(false);
  const [encodage, setEncodage] = useState('');
  const handleEncodage = (encodage: string) => {
    setEncodage(encodage);
    setValue('data', { ...currentData, encodage });
  };
  const handleEnabled = (hidden: boolean) => {
    setEnabled(hidden);
    setValue('data', { ...currentData, hidden });
  };
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
            <div className="md:col-span-2">
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
          <div className="mb-2 block flex items-center">
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
          <div className="mb-2 block flex items-center">
            <label htmlFor="name" className="input-label w-36 flex-none">
              Nom
            </label>
            <div className="grow" aria-labelledby="name">
              <div className="flex gap-3">
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
          <div className="mb-2 block flex">
            <label htmlFor="numeros" className="input-label w-36 flex-none">
              Numéros
            </label>
            <div className="grow" aria-labelledby="numeros">
              <input
                type="text"
                id="phone"
                placeholder="Mobile"
                className="input-form"
                {...register('data.phone')}
              />
              <div className="flex gap-3 mt-3">
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
          <div className="mb-2 block flex items-center">
            <label htmlFor="email" className="input-label w-36 flex-none">
              Email
            </label>
            <div className="grow" aria-labelledby="email">
              <input
                type="text"
                id="text"
                placeholder="Votre mail"
                className="input-form"
                {...register('data.email')}
              />
              <p className="text-red-500">{errors?.data?.email?.message}</p>
            </div>
          </div>
          <div className="mb-2 block flex items-center">
            <label htmlFor="name" className="input-label w-36 flex-none">
              Emploi
            </label>
            <div className="grow" aria-labelledby="name">
              <div className="flex gap-3">
                <input
                  type="text"
                  id="company"
                  placeholder="Prénom"
                  className="input-form"
                  {...register('data.company')}
                />
                <input
                  type="text"
                  id="job"
                  placeholder="Nom"
                  className="input-form"
                  {...register('data.job')}
                />
              </div>
              <p className="text-red-500">{errors?.data?.firstName?.message}</p>
              <p className="text-red-500">{errors?.data?.lastName?.message}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="yellow-button">
              <span>Générer le QR code</span>
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default QRCodeVCARD;
