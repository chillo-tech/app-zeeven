import {GetServerSideProps} from "next"
import {Provider} from "next-auth/providers"
import {getCsrfToken, getProviders, signIn} from "next-auth/react"
import Head from "next/head";
import Link from "next/link";
import styles from '@/styles/SignIn.module.css';
import formStyles from '@/styles/Form.module.css';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {EMAIL_ERROR_MESSAGE, EMAIL_PATTERN} from "@/utils/data";
import {useRouter} from "next/router";
import {getServerSession} from "next-auth";
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import Metadata from "@/components/Metadata";

const schema = yup.object({
	username: yup.string()
		.email(EMAIL_ERROR_MESSAGE)
		.required(EMAIL_ERROR_MESSAGE)
		.matches(EMAIL_PATTERN, {message: EMAIL_ERROR_MESSAGE}),
	password: yup.string()
		.required("Ce champ est requis"),
	csrfToken: yup.string(),
}).required();

export default function SignIn({providers, csrfToken}: { providers: Provider[], csrfToken: string }) {
	const {query} = useRouter();
	const {error: loginErrors, push, callbackUrl} = query;

	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<{ username: string, password: string, csrfToken: string }>({
		mode: "onChange",
		resolver: yupResolver(schema)
	});
	const onSubmit = async (data: any) => {
		await signIn("credentials", {...data, callbackUrl: callbackUrl ? callbackUrl : '/me'});
	};
	return (
		<section className={styles.wrapper}>
      <Metadata entry={{title: 'Connectez vous', description: 'Informez nos contacts de vos évènements'}}/>

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
								<input type="text" autoComplete="current-password" id="email"
									   className={formStyles.form_control__input}
									   {...register("username")} placeholder="Adresse email"/>
								<p className={formStyles.form_control__error}>{errors.username?.message}</p>
							</div>
							<div className={formStyles.form_control}>
								<label htmlFor="password" className={formStyles.form_control__label}>
									<span className={formStyles.form_control__label__first}>Votre mot de passe</span>
								</label>
								<input autoComplete="current-password" type="password" id="password"
									   className={formStyles.form_control__input}
									   {...register("password")} placeholder="Mot de passe"/>
								<p className={formStyles.form_control__error}>{errors.password?.message}</p>
							</div>
							<div className="flex justify-between items-center">
                <button className="bg-app-blue text-white rounded-md px-6 py-1 font-thin">Connexion</button>
                <Link href='/password/forgoten' className="text-app-blue border-b border-app-blue">
                  Mot de passe oublié ? 
                </Link>
              </div>
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
				<h2 className={`${styles.form_control__label} text-center py-2 font-light`}>Pas encore de compte ?&nbsp;
					<Link href={"/auth/register"} className="underline">Créer un compte</Link>
				</h2>
			</div>
		</section>
	)
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
		props: {providers, csrfToken},
	}
}
