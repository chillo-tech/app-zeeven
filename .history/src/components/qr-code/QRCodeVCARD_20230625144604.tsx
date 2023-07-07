import { add, handleError } from '@/services';
import { WIFI_ENCODAGE, slugify } from '@/utils';
import { RadioGroup, Switch } from '@headlessui/react';
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
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 block flex items-center">
            <label htmlFor="name" className="input-label w-36 flex-none">
              Civilité
            </label>
            <div className="grow" aria-labelledby="name">
              <input
                type="text"
                id="text"
                placeholder="Home wifi"
                className="input-form"
                {...register('data.civility')}
              />
              <p className="text-red-500">{errors?.data?.name?.message}</p>
            </div>
          </div>
          <div className="mb-2 block flex items-center">
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
          <div className="mb-2 block flex items-center">
            <label htmlFor="Encodage" className="input-label w-36 flex-none">
              Encodage
            </label>
            <div className="mx-auto flex w-full" aria-labelledby="Encodage">
              <RadioGroup
                value={encodage}
                onChange={handleEncodage}
                name="encodage"
                defaultValue={''}
              >
                <div className="flex w-full gap-2 rounded-md bg-white">
                  {WIFI_ENCODAGE.map(({ label, value }: { label: string; value: string }) => (
                    <RadioGroup.Option
                      key={`encodage-${slugify(label)}`}
                      value={value}
                      className={({ checked }) => `
                      ${
                        checked
                          ? 'border-indigo-200 bg-blue-900 text-white'
                          : 'border-blue-900 bg-white text-blue-900'
                      }
                      justitfy-center relative flex cursor-pointer items-center rounded-lg border px-6 py-2
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
