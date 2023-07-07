import { add, handleError } from '@/services';
import { URL_PATTERN, isValidUrl } from '@/utils';
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
    url: string;
  };
};

function QRCodeLink({ type,handleMenu }: any) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState({});
  const mutation = useMutation({
    mutationFn: (applicationMessage: Message) => add('/api/backend/qr-code', applicationMessage),
    onError: (error: any) => {
      handleMenu(false);
      setIsError(true), handleError(error);
    },
    onSuccess: ({data}: any) => {
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
      url: yup
        .string()
        .trim()
        .test('is-url-valid', 'Url invalide', (value) => isValidUrl(value|| ''))
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
                action={handleError}
                actionLabel="Retourner à l'accueil"
              />
            </div>
            <ImageDisplay
              base64={true}
              image={{ path: mutation.data.data }}
              wrapperClasses="relative w-full md:h-full h-52"
              imageClasses="object-contain"
            />
          </div>
        </div>
      ) : null}
      {mutation.isIdle ? (
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="block py-3">
            <input
              type="text"
              id="text"
              placeholder="https://exemple.com"
              className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 text-xl shadow-sm focus:border-indigo-500"
              {...register('data.url')}
            />
            <p className="text-red-500">{errors?.data?.url?.message}</p>
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

export default QRCodeLink;
