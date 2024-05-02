import Metadata from '@/components/Metadata';
import ImageDisplay from '@/components/image-display';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN } from '@/utils/data';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { Provider } from 'next-auth/providers';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    username: yup
      .string()
      .email(EMAIL_ERROR_MESSAGE)
      .required(EMAIL_ERROR_MESSAGE)
      .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE }),
    password: yup.string().required('Ce champ est requis'),
    csrfToken: yup.string(),
  })
  .required();

export default function SignIn({
  providers,
  csrfToken,
}: {
  providers: Provider[];
  csrfToken: string;
}) {
  const { query } = useRouter();
  const { error: loginErrors, push, callbackUrl } = query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string; csrfToken: string }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    await signIn('credentials', { ...data, callbackUrl: callbackUrl ? callbackUrl : '/me' });
  };
  return (
    <>
      <>
        <Metadata
          entry={{
            title: 'Connectez vous',
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
            <Link href={'/'} className={classNames(styles.logo, 'md:text-app-blue')}>
              ZEEVEN
            </Link>
            <>
              {loginErrors ? (
                <h2 className={`text-center text-lg text-rose-500`}>
                  Votre email ou votre mot de passe est invalide
                </h2>
              ) : null}

              {Object.values(providers)
                .filter((provider) => provider.name === 'Credentials')
                .map((provider) => (
                  <form onSubmit={handleSubmit(onSubmit)} key={provider.name}>
                    <input type="hidden" defaultValue={csrfToken} {...register('csrfToken')} />
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
                        {...register('username')}
                        placeholder="Adresse email"
                      />
                      <p className={formStyles.form_control__error}>{errors.username?.message}</p>
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
                    <div className="flex items-center justify-between">
                      <button className="rounded-md bg-green-700 md:bg-app-blue px-6 py-1 font-thin text-white">
                        Connexion
                      </button>
                      <Link
                        href="/password/forgoten"
                        className="border-b text-white border-white md:border-app-blue md:text-app-blue"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                  </form>
                ))}
            </>
            <h2
              className={`${styles.form_control__label} border-t border-app-blue pb-6 pt-2 font-light`}
            >
              Vous avez déjà un compte ? &nbsp;
              <Link href={'/auth/register'} className="text-white underline md:text-app-blue">
                Créer un compte
              </Link>
            </h2>
          </div>
        </section>
      </>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/me',
        permanent: false,
      },
    };
  }
  /*
	return {
	  props: {
		session,
	  },
	}
	*/
  return {
    props: { providers, csrfToken },
  };
};
