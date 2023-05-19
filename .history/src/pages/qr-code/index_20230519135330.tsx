import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import OpenedLayout from '@/containers/opened';
import { add } from '@/services/crud';
import { QR_CODES_TYPES, slugify } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

export type Message = {
  type: string;
  text: string;
  email: string;
  phone: string;
  phoneIndex: string;
};
const schema = yup
  .object({
    type: yup.string().trim().required('Ce champ est requis'),
    text: yup.string().trim().required('Ce champ est requis').min(5, 'min. 5 caractères'),
  })
  .required();
function QRCode() {
  const mutation = useMutation({
    mutationFn: (applicationMessage: Message) => add('/qr-code', applicationMessage),
  });
  const router = useRouter();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Message>({
    mode: 'onChange',
    defaultValues: { type: 'LINK' },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Message) => {
    mutation.mutate(data);
  };

  const handleError = (error: any) => {
    error.preventDefault();
    router.push('/');
  };
  const type = watch('type');
  return (
    <>
      <Metadata
        entry={{
          title: 'QR codes dynamiques pour votre marque',
          description: 'Créez, suivez et gérez des codes QR dynamiques pour votre marque',
        }}
      />
      <OpenedLayout>
        <div className="container py-10 text-center font-sans">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
            QR codes dynamiques pour votre marque
          </h1>
          <h3 className="text-slate-900 sm:text-xl">
            Créez, suivez et gérez des codes <br />
            QR dynamiques pour votre marque
          </h3>
        </div>
        {mutation.isError ? (
          <Message
            type="error"
            firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
            secondMessage="N'hésitez pas à nous passer un coup de fil"
            action={handleError}
            actionLabel="Retourner à l'accueil"
          />
        ) : null}
        {mutation.isSuccess ? (
          <Message
            type="success"
            firstMessage="Votre QR CODE a bien été généré"
            secondMessage="Inscrivez vous pour recevoir des statistiques personnalisées"
            action={handleError}
            actionLabel="Retourner à l'accueil"
          />
        ) : null}
        {mutation.isIdle ? (
          <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <section className="mx-auto mb-10 rounded-lg border-2 border-blue-300 bg-white md:w-2/3 container">
              <div className="options p-5">
                <ul className="flex border-b border-gray-300 text-xl">
                  {QR_CODES_TYPES.map((item: any) => (
                    <li key={slugify(item.label)}>
                      <label
                        htmlFor={slugify(item.label)}
                        className={classNames(
                          'text-md flex items-center justify-between px-4 py-1 font-light text-black',
                          'cursor-pointer',
                          { 'border-b-2 border-blue-700': type === item.value }
                        )}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          value={item.value}
                          id={slugify(item.label)}
                          {...register('type')}
                        />
                        {item.label}
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="block py-3">
                  <input
                    type="text"
                    id="text"
                    placeholder="https://exemple.com"
                    className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 text-xl shadow-sm focus:border-indigo-500"
                    {...register('text')}
                  />
                  <p className="text-red-500">{errors.text?.message}</p>
                </div>
                <div className="mt-4 flex">
                  <button type="submit" className="yellow-button">
                    <span>Générer</span>
                  </button>
                </div>
              </div>
            </section>
          </form>
        ) : null}
      </OpenedLayout>
    </>
  );
}

export default QRCode;
