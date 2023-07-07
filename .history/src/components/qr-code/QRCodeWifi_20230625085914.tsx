import { add, handleError } from '@/services';
import { WIFI_ENCODAGE, isValidUrl, slugify } from '@/utils';
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
    hidden?: string;
    name: string;
    password?: string;
    encodage?: string;
  };
}

function QRCodeWifi({ type, handleMenu }: any) {
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
        hidden: yup
          .boolean(),
          name: yup
          .string()
          .trim()
          .required('Ce champ est requis'),
          password: yup
          .string(),
          name: yup
          .string()
          .trim()
          .required('Ce champ est requis'),
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
  const [enabled, setEnabled] = useState(false);
  const [encodage, setEncodage] = useState('');
  const handleEncodage = (entry: any) => {
    setEncodage(entry);
  }
  const onSubmit = (data: Message) => mutation.mutate(data);
  
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
              image={{ path: data }}
              wrapperClasses="relative w-full md:h-full h-52"
              imageClasses="object-contain"
            />
          </div>
        </div>
      ) : null}
      {mutation.isIdle ? (
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Switch.Group>
            <div className="mt-4 flex items-center">
              <Switch.Label className="w-36 text-xl">Wifi masqué ?</Switch.Label>
              <Switch
                checked={enabled}
                onChange={setEnabled}
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
          <div className="mb-2 block flex items-center">
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
              <p className="text-red-500">{errors?.data?.name?.message}</p>
            </div>
          </div>
          <div className="mb-2 block flex items-center">
            <label htmlFor="Encodage" className="input-label w-36 flex-none">
              Encodage
            </label>
            <div className="mx-auto flex w-full" aria-labelledby="Encodage">
              <RadioGroup value={encodage} onChange={handleEncodage} name="encodage" defaultValue={''}>
                <div className="flex w-full rounded-md bg-white gap-2">
                  {WIFI_ENCODAGE.map(({ label, value }: { label: string; value: string }) => (
                    <RadioGroup.Option
                      key={`encodage-${slugify(label)}`}
                      value={value}
                      className={({ checked }) => `
                      ${checked ? 'border-indigo-200 bg-blue-900 text-white' : 'text-blue-900 border-blue-900 bg-white'}
                      relative flex items-center justitfy-center cursor-pointer rounded-lg px-6 py-2 border
                    `}
                    >
                      {label}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <p className="text-red-500">{errors?.data?.name?.message}</p>
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

export default QRCodeWifi;
