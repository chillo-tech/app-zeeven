import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import ImageDisplay from '@/components/image-display';
import { add } from '@/services/crud';
import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
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
    code: yup
      .string()
      .matches(/^[0-9]{6}$/, 'Le code est invalide')
      .min(6, 'Le code est invalide')
      .max(6, 'Le code est invalide')
      .required('Le code est invalide'),
  })
  .required();

export default function Activation() {
  const [errorMessage, setErrorMessage] = useState(
    'Une erreur est survenue, nous allons la résoudre sous peu'
  );
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (code) => add('/api/backend/activation', code),
    onError: (error) => {
      const { response } = error as AxiosError;
      const { data, status } = response as any;
      if (String(status).charAt(0) === '4') {
        let message = 'La donnée que vous avez saisi est invalide';
        message = data.message ? data.message : message;
        setErrorMessage(message);
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: number }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const redirect = (error: any) => {
    error.preventDefault();
    router.push('/auth/signin');
  };

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  return (
    <>
      <Metadata
        entry={{
          title: 'Reinitialisez votre mot de passe',
          description: 'Informez nos contacts de vos évènements',
        }}
      />

      <section className="grid h-screen w-full md:grid-cols-2">
        <div className="hidden flex-col items-center justify-center bg-app-blue md:flex">
          <div className="relative h-72 w-72 md:h-96 md:w-full">
            <ImageDisplay
              wrapperClasses="h-full relative border-8 border-app-blue overflow-hidden"
              local={true}
              imageClasses="object-contain shadow-md"
              image={{ path: '/images/zeeven.png', title: 'Entammez vos échanges>avec ZEEVEN' }}
            />
          </div>
        </div>
        <div
          className={classNames(
            'flex flex-col justify-center justify-between px-5 py-10 md:px-32',
            'bg-app-blue text-white md:bg-white md:text-black'
          )}
        >
          <>
            {mutation.isSuccess ? (
              <>
                <Link href={'/'} className="text-4xl font-extrabold md:text-app-blue">
                  ZEEVEN
                </Link>
                <Message
                  type="loading"
                  firstMessage="Votre compte a bien été activé"
                  secondMessage="Vous pouvez vous connecter pour utiliser nos services"
                  actionLabel="Connexion"
                  action={redirect}
                />
                <span />
              </>
            ) : null}
            {mutation.isLoading ? (
              <>
                <Link href={'/'} className="text-4xl font-extrabold md:text-app-blue">
                  ZEEVEN
                </Link>
                <Message
                  type="loading"
                  firstMessage="Un instant"
                  secondMessage="Nous activons votre compte"
                />
                <span />
              </>
            ) : null}
            {(mutation.isError || mutation.isIdle) ? (
              <>
                <div>
                  <Link href={'/'} className="text-4xl font-extrabold md:text-app-blue">
                    ZEEVEN
                  </Link>
                  <div className="text-2xl font-bold md:text-app-blue">Activez votre compte</div>
                </div>
                <article>
                  {mutation.isError ? (
                    <h2 className={`text-center text-lg text-rose-500`}>{errorMessage}</h2>
                  ) : null}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={formStyles.form_control}>
                      <label htmlFor="code" className={formStyles.form_control__label}>
                        <span className={formStyles.form_control__label__first}>Votre code</span>
                      </label>
                      <input
                        autoComplete="current-password"
                        type="number"
                        id="code"
                        className={formStyles.form_control__input}
                        {...register('code')}
                        placeholder="Code"
                        maxLength={6}
                      />
                      <p className={formStyles.form_control__error}>{errors.code?.message}</p>
                    </div>
                    <button className={formStyles.form_control__button}>Activer mon compte</button>
                  </form>
                </article>

                <h2
                  className={`${styles.form_control__label} border-t border-app-blue pb-6 pt-2 font-light`}
                >
                  Vous avez déjà un compte ? &nbsp;
                  <Link href={'/auth/signin'} className="text-white underline md:text-app-blue">
                    Connectez vous
                  </Link>
                </h2>
              </>
            ) : null}
          </>
        </div>
      </section>
    </>
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
