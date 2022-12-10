import { GetServerSideProps } from "next"
import { Provider } from "next-auth/providers"
import { getProviders, signIn, getCsrfToken } from "next-auth/react"
import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/SignIn.module.css';
import formStyles from '../../styles/Form.module.css';
import { FcGoogle } from 'react-icons/fc';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN } from "../../utils/data";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from '../../pages/api/auth/[...nextauth]'

const schema = yup.object({
  username: yup.string()
    .email(EMAIL_ERROR_MESSAGE)
    .required(EMAIL_ERROR_MESSAGE)
    .matches(EMAIL_PATTERN, {message: EMAIL_ERROR_MESSAGE}),
  password: yup.string()
    .required("Ce champ est requis"),
  csrfToken: yup.string(),
}).required();

export default function SignIn({ providers, csrfToken }: {providers: Provider[], csrfToken: string}) {
  const {query: {error: loginErrors}} = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<{username: string, password: string, csrfToken: string}>({
		mode: "onChange",
		resolver: yupResolver(schema)
	});
	const onSubmit = async (data: any) => {  
    const result = await signIn("credentials", data);
	};
  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Connectez vous</title>
      </Head>
      <nav className={`${styles.navigation}`}>
        <Link href={"/"} className={styles.logo}>ZEEVEN</Link>
      </nav>
      <div className={styles.form__container}>
        <h1 className={styles.form__title}>Connectez vous</h1>
        <article className={styles.inputs__container}>
        {loginErrors ? (
              <h2 className={`text-lg text-center text-rose-500`}>
                Votre email ou votre mot de passe est invalide
              </h2>
            ) 
            : null}
          {Object.values(providers).filter(provider => provider.name === "Credentials").map((provider) => (
             <form onSubmit={handleSubmit(onSubmit)} key={provider.name}>
              <input type="hidden" defaultValue={csrfToken} {...register("csrfToken")}/>
              <div className={formStyles.form_control}>
                <label htmlFor="email" className={formStyles.form_control__label}>
                  <span className={formStyles.form_control__label__first}>Votre adresse email.</span>
                </label>
                <input type="text" autoComplete="current-password" id="email" className={formStyles.form_control__input}
                    {...register("username")} placeholder="Adresse email"/>
                <p className={formStyles.form_control__error}>{errors.username?.message}</p>
              </div>
              <div className={formStyles.form_control}>
                <label htmlFor="password"  className={formStyles.form_control__label}>
                  <span className={formStyles.form_control__label__first}>Votre mot de passe</span>
                </label>
                <input autoComplete="current-password" type="password" id="password" className={formStyles.form_control__input}
                    {...register("password")} placeholder="Mot de passe"/>
                <p className={formStyles.form_control__error}>{errors.password?.message}</p>
              </div>
              <button className={formStyles.form_control__button}>Connexion</button>
           </form>
          ))}
          {/* 
          <p className={styles.form__seperator}><span className="bg-white px-2">ou</span></p>
          {Object.values(providers).filter(provider => provider.name !== "Credentials").map((provider) => (
            <div key={provider.name}>
              <button type="button" onClick={() => signIn(provider.id)} className={styles.form__oauthbutton}>
                <span className="mr-2">Connectez vous avec <span className="lowercase">{provider.name}</span></span>   <FcGoogle size={20}/>
              </button>
            </div>
          ))}
          */}
        </article>
        <h2 className={styles.form__title}>Pas encore de compte ?&nbsp;
          <Link href={"/auth/register"} className="underline">Créer un compte</Link>
        </h2>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken =  await getCsrfToken(context);
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/me',
        permanent: false,
      },
    }
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
  }
}