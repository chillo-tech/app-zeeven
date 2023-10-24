import Message from '@/components/Message';
import { add, patch } from '@/services/crud';
import formStyles from '@/styles//Form.module.css';
import styles from '@/styles//SignIn.module.css';
import { COUNTRIES } from '@/utils';
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_PATTERN,
  PHONE_ERROR_MESSAGE,
  REQUIRED_FIELD_ERROR_MESSAGE,
} from '@/utils/data';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

const schema = yup
  .object({
    civility: yup.string().trim().required(REQUIRED_FIELD_ERROR_MESSAGE),
    firstName: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
    lastName: yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
    email: yup
      .string()
      .email(EMAIL_ERROR_MESSAGE)
      .required(EMAIL_ERROR_MESSAGE)
      .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE }),
    phoneIndex: yup.string().required(PHONE_ERROR_MESSAGE),
    phone: yup
      .string()
      .trim()
      .required(PHONE_ERROR_MESSAGE)
      .min(9, PHONE_ERROR_MESSAGE)
      .max(10, PHONE_ERROR_MESSAGE),
    /*password: yup.string()
		.required(REQUIRED_FIELD_ERROR_MESSAGE),*/
    csrfToken: yup.string(),
  })
  .required();

type Profile = {
  civility: string;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  email: string;
  phoneIndex: string;
  phone: string;
  csrfToken: string;
};
const ProfileEdit = ({ endpoint, redirectUrl, data, method, buttonLabel = 'Enregistrer' }: any) => {
  const [errorMessage, setErrorMessage] = useState('Vos données semblent invalide');
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (profile) => {
      if (method === 'PATCH') {
        return patch(`/api/backend/${endpoint}`, profile);
      } else {
        return add(`/api/backend/${endpoint}`, profile);
      }
    },
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
    setValue,
    formState: { errors },
  } = useForm<Profile>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const redirect = (error: any) => {
    error.preventDefault();
    router.push(redirectUrl);
  };

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  useEffect(() => {
    if (data) {
      setValue('firstName', data?.firstName || '');
      setValue('lastName', data?.lastName || '');
      setValue('email', data?.email || '');
      setValue('phone', data?.phone || '');
      setValue('phoneIndex', data?.phoneIndex || '');
      setValue('civility', data?.civility || '');
    }
  }, [data, setValue]);
  return (
    <article>
      {mutation.isSuccess ? (
        <div className={styles.form__container}>
          <article className={styles.inputs__container}>
            <Message
              type="loading"
              firstMessage="Votre compte a bien été mis à jour"
              secondMessage=""
              actionLabel="Retourner à l'accueil"
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
          <article className={styles.inputs__container}>
            {mutation.isError ? (
              <h2 className={`text-center text-lg text-rose-500`}>{errorMessage}</h2>
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={formStyles.form_control}>
                <label htmlFor="civility" className={formStyles.form_control__label}>
                  <span className={formStyles.form_control__label__first}>Votre civilité</span>
                </label>
                <select
                  {...register('civility')}
                  id={'civility'}
                  className={formStyles.form_control__input}
                >
                  <option value="">Votre civilité</option>
                  <option value="MR">Mr</option>
                  <option value="MRS">Mme</option>
                  <option value="MLLE">Mlle</option>
                  <option value="MR_MRS">Me & Mme</option>
                </select>
                <p className={formStyles.form_control__error}>{errors.civility?.message}</p>
              </div>
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
                  aria-autocomplete="none"
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
              {/**
							<div className={formStyles.form_control}>
								<label htmlFor="password" className={formStyles.form_control__label}>
										<span
											className={formStyles.form_control__label__first}>Votre mot de passe</span>
								</label>
								<input autoComplete="current-password" type="password" id="password"
									   className={formStyles.form_control__input}
									   {...register("password")} placeholder="Mot de passe"/>
								<p className={formStyles.form_control__error}>{errors.password?.message}</p>
							</div>
               */}
              <button className={formStyles.form_control__button}>{buttonLabel}</button>
            </form>
          </article>
        </div>
      ) : null}
    </article>
  );
};

export default ProfileEdit;
