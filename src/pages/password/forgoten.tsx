import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import ImageDisplay from '@/components/image-display';
import { add } from '@/services';
import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { BACKEND_BASE_PATH, EMAIL_ERROR_MESSAGE, EMAIL_PATTERN } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup
      .string()
      .email(EMAIL_ERROR_MESSAGE)
      .required(EMAIL_ERROR_MESSAGE)
      .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE }),
  })
  .required();

function Forgoten() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (item: any) => add(`${BACKEND_BASE_PATH}/reset-password-link`, item),
  });
  const onSubmit = async (data: any) => {
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
          <span />
          <>
            {mutation.isSuccess ? (
              <div className={styles.form__container}>
                <article className={styles.inputs__container}>
                  <Link href={'/'} className="text-4xl font-extrabold md:text-app-blue">
                    ZEEVEN
                  </Link>
                  <Message
                    type="loading"
                    firstMessage="Nous avons pris en compte votre demande"
                    secondMessage="Vous avez reçu un code pour modifier votre mot de passe"
                    actionLabel="Modifier mon mot de passe"
                    action={() => router.push('/password/activate')}
                  />
                </article>
              </div>
            ) : null}
            {mutation.isError ? (
              <>
                <Link href={'/'} className="text-4xl font-extrabold md:text-app-blue">
                  ZEEVEN
                </Link>
                <Message
                  type="error"
                  firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
                  secondMessage="N'hésitez pas à nous passer un coup de fil"
                  action={() => router.push('/auth/signin')}
                  actionLabel="Retourner à l'accueil"
                />
              </>
            ) : null}
            {mutation.isLoading ? (
              <div className={styles.form__container}>
                <article className={styles.inputs__container}>
                  <Link href={'/'} className="text-4xl font-extrabold md:text-app-blue">
                    ZEEVEN
                  </Link>
                  <Message
                    type="loading"
                    firstMessage="Un instant"
                    secondMessage="Nous enregistrons votre demande"
                  />
                </article>
              </div>
            ) : null}
            {mutation.isIdle ? (
              <>
                <div>
                  <Link href={'/'} className="text-4xl font-extrabold md:text-app-blue">
                    ZEEVEN
                  </Link>
                  <div className="mb-2 mt-8 text-2xl font-bold">Modifiez votre mot de passe</div>
                  <p>Vous avez oublié votre mot de passe ?</p>
                  <p>
                    Saisissez l&apos;adresse e-mail que vous utilisez habituellement pour vous
                    connecter à zeeven.
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} className="py-8">
                    <div className={formStyles.form_control}>
                      <label htmlFor="email" className="text-white md:text-app-blue">
                        Votre adresse email.
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

                    <div className="flex items-center justify-between">
                      <button className="w-full rounded-md border border-white bg-white px-6 py-2 font-thin text-app-blue md:border-app-blue md:bg-app-blue md:text-white">
                        Modifier mon mot de passe
                      </button>
                      <span />
                    </div>
                  </form>
                </div>
              </>
            ) : null}
          </>
          <h2
            className={`${styles.form_control__label} border-t border-app-blue pb-6 pt-2 font-light`}
          >
            Vous avez déjà un compte ? &nbsp;
            <Link href={'/auth/signin'} className="text-white underline md:text-app-blue">
              Connectez vous
            </Link>
          </h2>
        </div>
      </section>
    </>
  );
}

export default Forgoten;
