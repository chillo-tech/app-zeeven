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
import { useMutation } from '@tanstack/react-query';
import Message from '../../components/Message'
import { useRouter } from "next/router";
import { add } from "../../services/crud";
import { useState } from "react";
import { AxiosError } from "axios";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
const schema = yup.object({
  code: yup.string()
              .matches(/^[0-9]{6}$/, "Le code est invalide")
              .min(6, "Le code est invalide")
              .max(6, "Le code est invalide")
              .required("Le code est invalide")
}).required();

export default function Activation() {
  const [errorMessage, setErrorMessage] = useState("Une erreur est survenue, nous allons la résoudre sous peu");
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (code => add("/activation", code)),
    onError: (error) => {
      const {response} = error as AxiosError;
      const {data, status} = response as any;
      if (String(status).charAt(0) === "4") {
        let message = "La donnée que vous avez saisi est invalide";
        message = data.message ? data.message : message;
        setErrorMessage(message);
      }
    },
  });
  const {register, handleSubmit, formState: {errors}} = useForm<{code: number}>({
		mode: "onChange",
		resolver: yupResolver(schema)
	});
  const redirect = (error:any) => {
    error.preventDefault()
    router.push('/')
  }

	const onSubmit = (data: any) => {
		mutation.mutate(data);
	};
  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Activez votre compte</title>
      </Head>
      <nav className={`${styles.navigation}`}>
        <Link href={"/"} className={styles.logo}>ZEEVEN</Link>
      </nav>

      {mutation.isSuccess ? (
        <div className={styles.form__container}>
          <article className={styles.inputs__container}>
            <Message 
              type="loading" 
              firstMessage='Votre compte a bien été activé' 
              secondMessage="Vous pouvez vous connecter pour utiliser nos services"
              actionLabel="Connexion"
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
              secondMessage='Nous activons votre compte' 
            />
          </article>
        </div>
      ) : null}
      {(mutation.isIdle ||mutation.isError) ? (
        <div className={styles.form__container}>
          <h1 className={styles.form__title}>Activez votre compte</h1>
          <article className={styles.inputs__container}>
            {mutation.isError ? (
              <h2 className={`text-lg text-center text-rose-500`}>{errorMessage}</h2>
            ) 
            : null}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={formStyles.form_control}>
                  <label htmlFor="code"  className={formStyles.form_control__label}>
                    <span className={formStyles.form_control__label__first}>Votre code</span>
                  </label>
                  <input autoComplete="current-password" type="number" id="code" className={formStyles.form_control__input}
                      {...register("code")} placeholder="Code" maxLength={6}/>
                  <p className={formStyles.form_control__error}>{errors.code?.message}</p>
                </div>
                <button className={formStyles.form_control__button}>Activer mon compte</button>
            </form>
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