import { add, handleError } from '@/services';
import { URL_PATTERN, isValidUrl } from '@/utils';import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Message from '../Message';
import ImageDisplay from '../image-display';
import QRCodeSuccessMessage from './QRCodeSuccessMessage';
import { downloadBase64File } from '@/utils';
import OutlineLink from '../shared/OutlineLink';

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
    watch,
    formState: { errors },
  } = useForm<Message>({
    mode: 'onChange',
    defaultValues: { type },
    resolver: yupResolver(schema),
  });
  const watchMessage = watch("data.url");
  const onChange=(event) => {
        if(watchMessage.match(/https?:\/\/[^\s]+/){
        mutation.mutate(data);
        }

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
        <QRCodeSuccessMessage data={data}/> 
      ) : null}
      {mutation.isIdle ? (
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="block">
            <input
              type="text"
              id="text"
              placeholder="https://exemple.com"
              className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 text-xl shadow-sm focus:border-indigo-500"
              {...register('data.url')}
              onChange={handleSubmit(onChange)}

            />
            <p className="text-red-500">{errors?.data?.url?.message}</p>
          </div>
          {watchMessage &&(
          <>
          <div className='flex flex-col'>
                              <ImageDisplay
                                base64={true}
                                image={{ path: data, title: 'zeeven qr code' }}
                                wrapperClasses="relative w-full md:h-full h-52"
                                imageClasses="object-contain"
                              />
                              <OutlineLink
                                button={true}
                                action={() => downloadBase64File(data, 'image/png', `qr-code.png`)}
                                label="Télécharger"
                                classes="w-full justify-center mt-4"
                              />
          </div>
          </>
          )}
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
