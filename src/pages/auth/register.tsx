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
import { useMutation } from '@tanstack/react-query';
import Message from '../../components/Message'
import { useRouter } from "next/router";
import { add } from "../../services/crud";
import { useState } from "react";
import { AxiosError } from "axios";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
const schema = yup.object({
  firstName: yup.string()
                .required("Ce champ est requis"),
  lastName: yup.string()
                .required("Ce champ est requis"),
  email: yup.string()
              .email(EMAIL_ERROR_MESSAGE)
              .required(EMAIL_ERROR_MESSAGE)
              .matches(EMAIL_PATTERN, {message: EMAIL_ERROR_MESSAGE}),
  password: yup.string()
    .required("Ce champ est requis"),
  csrfToken: yup.string(),
}).required();

export default function SignIn({ providers, csrfToken }: {providers: Provider[], csrfToken: string}) {
  const [errorMessage, setErrorMessage] = useState("Une erreur est survenue, nous allons la résoudre sous peu");
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (profile => add("/signup", profile)),
    onError: (error) => {
      const {response} = error as AxiosError;
      const {data, status} = response as any;
      if (String(status).charAt(0) === "4" && data.message) {
        setErrorMessage(data.message);
      }
    },
  });
  const {register, handleSubmit, formState: {errors}} = useForm<{firstName: string, lastName: string, username: string, password: string, csrfToken: string}>({
		mode: "onChange",
		resolver: yupResolver(schema)
	});
  const redirect = (error:any) => {
    error.preventDefault()
    router.push('/auth/activation')
  }

	const onSubmit = (data: any) => {
		mutation.mutate(data);
	};
  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Créez votre compte</title>
      </Head>
      <nav className={`${styles.navigation}`}>
        <Link href={"/"} className={styles.logo}>ZEEVEN</Link>
      </nav>

      {mutation.isSuccess ? (
        <div className={styles.form__container}>
          <article className={styles.inputs__container}>
            <Message 
              type="loading" 
              firstMessage='Votre compte a bien été créé' 
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
              firstMessage='Un instant' 
              secondMessage='Nous enregistrons votre demande' 
            />
          </article>
        </div>
      ) : null}
      {(mutation.isIdle || mutation.isError) ? (
        <div className={styles.form__container}>
          <h1 className={styles.form__title}>Créez votre compte</h1>
          <article className={styles.inputs__container}>
            {mutation.isError ? (
              <h2 className={`text-lg text-center text-rose-500`}>{errorMessage}</h2>
            ) 
            : null}
            {Object.values(providers).filter(provider => provider.name === "Credentials").map((provider) => (
              <form onSubmit={handleSubmit(onSubmit)} key={provider.name}>
                <input type="hidden" defaultValue={csrfToken} {...register("csrfToken")}/>
                <div className={formStyles.form_control}>
                  <label htmlFor="firstName"  className={formStyles.form_control__label}>
                    <span className={formStyles.form_control__label__first}>Votre prénom</span>
                  </label>
                  <input autoComplete="current-password" type="text" id="firstName" className={formStyles.form_control__input}
                      {...register("firstName")} placeholder="Prénom"/>
                  <p className={formStyles.form_control__error}>{errors.firstName?.message}</p>
                </div>
                <div className={formStyles.form_control}>
                  <label htmlFor="lastName"  className={formStyles.form_control__label}>
                    <span className={formStyles.form_control__label__first}>Votre nom</span>
                  </label>
                  <input autoComplete="current-password" type="text" id="lastName" className={formStyles.form_control__input}
                      {...register("lastName")} placeholder="Nom"/>
                  <p className={formStyles.form_control__error}>{errors.lastName?.message}</p>
                </div>
                <div className={formStyles.form_control}>
                  <label htmlFor="email" className={formStyles.form_control__label}>
                    <span className={formStyles.form_control__label__first}>Votre adresse email.</span>
                  </label>
                  <input type="text" autoComplete="current-password" id="email" className={formStyles.form_control__input}
                      {...register("email")} placeholder="Adresse email"/>
                  <p className={formStyles.form_control__error}>{errors.email?.message}</p>
                </div>
                <div className={formStyles.form_control}>
                  <label htmlFor="password"  className={formStyles.form_control__label}>
                    <span className={formStyles.form_control__label__first}>Votre mot de passe</span>
                  </label>
                  <input autoComplete="current-password" type="password" id="password" className={formStyles.form_control__input}
                      {...register("password")} placeholder="Mot de passe"/>
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
          <h2 className={styles.form__title}>Vous avez déjà un compte ?&nbsp;
            <Link href={"/auth/signin"} className="underline">Connexion</Link>
          </h2>
        </div>
      ) : null }
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
  return {
    props: { providers, csrfToken },
  }
}