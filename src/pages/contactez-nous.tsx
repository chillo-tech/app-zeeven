import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import Layout from '@/containers/opened';
import { sendData } from '@/services';
import { COUNTRIES, EMAIL_ERROR_MESSAGE, EMAIL_PATTERN, PHONE_ERROR_MESSAGE } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

export type Message = {
  name: string;
  message: string;
  email: string;
  phone: string;
  phoneIndex: string;
};
const schema = yup
  .object({
    name: yup.string().trim().required('Ce champ est requis'),
    phoneIndex: yup.string().trim().required('Sélectionner un indicatif'),
    phone: yup
      .string()
      .required(PHONE_ERROR_MESSAGE)
      .min(9, PHONE_ERROR_MESSAGE)
      .max(9, PHONE_ERROR_MESSAGE),
    email: yup
      .string()
      .email(EMAIL_ERROR_MESSAGE)
      .required(EMAIL_ERROR_MESSAGE)
      .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE }),
    message: yup
      .string()
      .trim()
      .required('Ce champ est requis')
      .min(30, "Dites nous en un peu plus s'il vous plait(min. 30)"),
  })
  .required();
function ContactUs() {
  const mutation = useMutation({
    mutationFn: (message: Message) => sendData('/api/backoffice/message', message),
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Message>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Message) => {
    mutation.mutate(data);
  };

  const handleError = (error: any) => {
    error.preventDefault();
    router.push('/');
  };
  return (
    <Layout>
      <Metadata
        entry={{ title: 'description', description: 'Une question, un feedback, contactez nous' }}
      />
      <section className="mx-auto w-11/12 pb-20 pt-10 md:w-1/2">
        <h1 className="mb-2 text-center text-4xl font-extrabold text-app-blue">
          N&apos;hésitez pas écrivez nous
        </h1>
        <h3 className="text-center text-lg text-app-blue">
          Si vous avez des questions ou des commentaires sur ZEEVEN, veuillez nous contacter.
          <br />
          Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.
        </h3>
        <article className="mt-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          {mutation.isLoading ? (
            <Message
              type="loading"
              firstMessage="Un instant"
              secondMessage="Nous enregistrons votre demande"
            />
          ) : null}
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
              firstMessage="Nous avons reçu votre message."
              secondMessage="Une réponse personnalisée vous sera apportée dans les meilleurs délais."
              action={handleError}
              actionLabel="Retourner à l'accueil"
            />
          ) : null}
          {mutation.isIdle ? (
            <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="block">
                <label
                  htmlFor="name"
                  className="text-md mb-2 flex w-full flex-col justify-between font-light"
                >
                  <span className="text-app-blue">Votre nom</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Votre nom"
                  className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                  {...register('name')}
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div className="text-md mb-0">
                <label
                  htmlFor="phone"
                  className="text-md mb-2 flex w-full flex-col justify-between text-app-blue"
                >
                  Votre téléphone
                </label>
                <div className="mt-1 flex flex-col md:flex-row">
                  <select
                    {...register('phoneIndex')}
                    className="rounded-tl-lg rounded-tr-lg border-gray-300 shadow-sm md:w-1/3 md:rounded-bl-lg md:rounded-tr-none"
                  >
                    <option data-countrycode="FR" value="">
                      Votre pays
                    </option>

                    {COUNTRIES.sort((countryA: any, countryB: any) =>
                      countryA.label.localeCompare(countryB.label)
                    ).map((country: any) => (
                      <option
                        key={country.code}
                        data-countrycode={country.code}
                        value={country.value}
                      >
                        {country.label}
                      </option>
                    ))}
                  </select>
                  <input
                    placeholder="Votre téléphone"
                    type="number"
                    autoComplete="false"
                    className="focus:ring-indigo-5000 rounded-bl-lg rounded-br-lg  border-gray-300 py-2 shadow-sm focus:border-indigo-500 md:w-2/3 md:rounded-bl-none md:rounded-br-lg md:rounded-tr-lg"
                    {...register('phone')}
                    id="phone"
                  />
                </div>
                <p className="text-red-600">{errors?.phoneIndex?.message}</p>
                <p className="text-red-600">{errors?.phone?.message}</p>
              </div>
              <div className="block">
                <label
                  htmlFor="email"
                  className="text-md mb-2 flex w-full flex-col justify-between font-light"
                >
                  <span className="text-app-blue">Votre email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Votre email"
                  className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                  {...register('email')}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div className="block">
                <label
                  htmlFor="message"
                  className="text-md mb-2 flex w-full flex-col justify-between font-light"
                >
                  <span className="text-app-blue">Votre message</span>
                </label>
                <textarea
                  placeholder="Nous sommes à votre écoute, dites nous tout."
                  id="message"
                  className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                  {...register('message')}
                ></textarea>
                <p className="text-red-500">{errors.message?.message}</p>
              </div>

              <button
                type="submit"
                className="w-full rounded-md border-app-yellow bg-app-yellow px-4 py-2 text-app-blue"
              >
                <span>Envoyer</span>
              </button>
            </form>
          ) : null}
        </article>
      </section>
    </Layout>
  );
}

export default ContactUs;
