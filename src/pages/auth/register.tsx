import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import { add } from '@/services/crud';
import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { COUNTRIES } from '@/utils';
import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN, PHONE_ERROR_MESSAGE } from '@/utils/data';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { Provider } from 'next-auth/providers';
import { getCsrfToken, getProviders } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { authOptions } from '../api/auth/[...nextauth]';

const schema = yup
  .object({
    firstName: yup.string().required('Ce champ est requis'),
    lastName: yup.string().required('Ce champ est requis'),
    email: yup
      .string()
      .email(EMAIL_ERROR_MESSAGE)
      .required(EMAIL_ERROR_MESSAGE)
      .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE }),
    phoneIndex: yup.string().trim().required('Sélectionner un indicatif'),
    phone: yup
      .string()
      .required(PHONE_ERROR_MESSAGE)
      .min(9, PHONE_ERROR_MESSAGE)
      .max(10, PHONE_ERROR_MESSAGE),
    password: yup.string().required('Ce champ est requis'),
    csrfToken: yup.string(),
  })
  .required();

type Profile = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneIndex: string;
  phone: string;
  csrfToken: string;
};

export default function SignIn({
  providers,
  csrfToken,
}: {
  providers: Provider[];
  csrfToken: string;
}) {
  const [errorMessage, setErrorMessage] = useState(
    'Une erreur est survenue, nous allons la résoudre sous peu'
  );
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (profile) => add('/api/backend/signup', profile),
    onError: (error) => {
      const { response } = error as AxiosError;
      const { data, status } = response as any;
      if (String(status).charAt(0) === '4' && data.message) {
        setErrorMessage(data.message);
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const redirect = (error: any) => {
    error.preventDefault();
    router.push('/auth/activation');
  };

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  return (
    <section className={styles.wrapper}>
      <Metadata entry={{ title: 'Créez votre compte', description: 'Créez votre compte' }} />

      <nav className={`${styles.navigation}`}>
        <Link href={'/'} className={styles.logo}>
          ZEEVEN
        </Link>
      </nav>

      {mutation.isSuccess ? (
        <div className={styles.form__container}>
          <article className={styles.inputs__container}>
            <Message
              type="loading"
              firstMessage="Votre compte a bien été créé"
              secondMessage="Vous avez reçu un code pour l'activer par mail"
              actionLabel="Activer mon compte"
              action={redirect}
            />
          </article>
        </div>
      ) : null}
      {mutation.isLoading ? (
        <div className={styles.form__container}>
          <article className={styles.inputs__container}>
            <Message
              type="loading"
              firstMessage="Un instant"
              secondMessage="Nous enregistrons votre demande"
            />
          </article>
        </div>
      ) : null}
      {mutation.isIdle || mutation.isError ? (
        <div className={styles.form__container}>
          <h1 className={styles.form__title}>Créez votre compte</h1>
          <article className={styles.inputs__container}>
            {mutation.isError ? (
              <h2 className={`text-center text-lg text-rose-500`}>{errorMessage}</h2>
            ) : null}
            {Object.values(providers)
              .filter((provider) => provider.name === 'Credentials')
              .map((provider) => (
                <form onSubmit={handleSubmit(onSubmit)} key={provider.name}>
                  <input type="hidden" defaultValue={csrfToken} {...register('csrfToken')} />
                  <div className={formStyles.form_control}>
                    <label htmlFor="firstName" className={formStyles.form_control__label}>
                      <span className={formStyles.form_control__label__first}>Votre prénom</span>
                    </label>
                    <input
                      autoComplete="current-password"
                      type="text"
                      id="firstName"
                      className={formStyles.form_control__input}
                      {...register('firstName')}
                      placeholder="Prénom"
                    />
                    <p className={formStyles.form_control__error}>{errors.firstName?.message}</p>
                  </div>
                  <div className={formStyles.form_control}>
                    <label htmlFor="lastName" className={formStyles.form_control__label}>
                      <span className={formStyles.form_control__label__first}>Votre nom</span>
                    </label>
                    <input
                      autoComplete="current-password"
                      type="text"
                      id="lastName"
                      className={formStyles.form_control__input}
                      {...register('lastName')}
                      placeholder="Nom"
                    />
                    <p className={formStyles.form_control__error}>{errors.lastName?.message}</p>
                  </div>
                  <div className={formStyles.form_control}>
                    <label htmlFor="email" className={formStyles.form_control__label}>
                      <span className={formStyles.form_control__label__first}>
                        Votre adresse email.
                      </span>
                    </label>
                    <input
                      type="text"
                      autoComplete="current-password"
                      id="email"
                      className={formStyles.form_control__input}
                      {...register('email')}
                      placeholder="Adresse email"
                    />
                    <p className={formStyles.form_control__error}>{errors.email?.message}</p>
                  </div>
                  <div className="text-md mb-0 mb-3">
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
                  <div className={formStyles.form_control}>
                    <label htmlFor="password" className={formStyles.form_control__label}>
                      <span className={formStyles.form_control__label__first}>
                        Votre mot de passe
                      </span>
                    </label>
                    <input
                      autoComplete="current-password"
                      type="password"
                      id="password"
                      className={formStyles.form_control__input}
                      {...register('password')}
                      placeholder="Mot de passe"
                    />
                    <p className={formStyles.form_control__error}>{errors.password?.message}</p>
                  </div>
                  <button className={formStyles.form_control__button}>Inscription</button>
                </form>
              ))}
            {/*
            <p className={styles.form__seperator}><span className="bg-white px-2">ou</span></p>
            {Object.values(providers).filter(provider => provider.name !== "Credentials").map((provider) => (
              <div key={provider.name}>
                <button type="button" onClick={() => signIn(provider.id)} className={styles.form__oauthbutton}>
                  <span className="mr-2">Inscrivez vous avec <span className="lowercase">{provider.name}</span></span>   <FcGoogle size={20}/>
                </button>
              </div>
            ))}
          */}
          </article>
          <h2 className={`${styles.form_control__label} pb-6 pt-2 text-center font-light`}>
            Vous avez déjà un compte ?&nbsp;
            <Link href={'/auth/signin'} className="underline">
              Connexion
            </Link>
          </h2>
        </div>
      ) : null}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/me',
        permanent: false,
      },
    };
  }
  return {
    props: { providers, csrfToken },
  };
};
