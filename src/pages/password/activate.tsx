import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import ImageDisplay from '@/components/image-display';
import { add } from '@/services';
import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { BACKEND_BASE_PATH } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

const schema = yup
  .object({
    code: yup
      .string()
      .matches(/^[0-9]{6}$/, 'Le code est invalide')
      .min(6, 'Le code est invalide')
      .max(6, 'Le code est invalide')
      .required('Le code est invalide'),
    password: yup.string().required('Ce champ est requis'),
  })
  .required();

function Activate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string; code: string }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (item: any) => add(`${BACKEND_BASE_PATH}/update-password`, item),
  });
  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };
  return (
    <>
      <Metadata
        entry={{
          title: 'Modifiez votre mot de passe',
          description: 'Informez nos contacts de vos évènements',
        }}
      />

      <section className="grid h-screen w-full md:grid-cols-2">
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
                    firstMessage="Votre mot de passe a bien été enregistré"
                    secondMessage="Vous pouvez vous connecter avec votre mot de passe"
                    actionLabel="connexion"
                    action={() => router.push('/auth/signin')}
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
                  action={() => router.push('/a')}
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
                  <div className="mb-2 mt-8 text-2xl font-bold">
                    Choisissez un nouveau mot de passe
                  </div>
                  <p>
                    Votre nouveau mot de passe doit être suffisamment sécurisé et facile à retenir.
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} className="py-8">
                    <div className={formStyles.form_control}>
                      <label htmlFor="code" className="text-white md:text-app-blue">
                        Votre code reçu par mail
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
                    <div className={formStyles.form_control}>
                      <label htmlFor="password" className="text-white md:text-app-blue">
                          Votre nouveau mot de passe
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
                      <button className="w-full rounded-md border border-white bg-white px-6 py-2 font-thin text-app-blue md:border-app-blue md:bg-app-blue md:text-white">
                        Enregistrer
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
      </section>
    </>
  );
}

export default Activate;
