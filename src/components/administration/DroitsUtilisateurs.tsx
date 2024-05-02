import { add } from '@/services/crud';
import formStyles from '@/styles/Form.module.css';
import { ROLES } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import Message from '../Message';

const schema = yup
  .object({
    email: yup.string().email('Email est invalide').required('Email est requis'),
    role: yup.string().trim().required('Role est requis'),
  })
  .required();
function DroitsUtilisateurs() {
  const [errorMessage, setErrorMessage] = useState(
    'Une erreur est survenue, nous allons la résoudre sous peu'
  );
  const mutation = useMutation({
    mutationFn: (code) => add('/api/backend/user-role', code),
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
  } = useForm<{ email: string; role: string }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  return (
    <article>
      {mutation.isSuccess ? (
        <Message
          type="loading"
          firstMessage="Votre compte a bien été mis à jour"
          secondMessage=""
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {mutation.isLoading ? (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous enregistrons votre demande"
        />
      ) : null}
      {mutation.isIdle || mutation.isError ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {mutation.isError ? (
            <h2 className={`text-center text-lg text-rose-500`}>{errorMessage}</h2>
          ) : null}
          <div className={formStyles.form_control}>
            <label htmlFor="email" className={formStyles.form_control__label}>
              <span className={formStyles.form_control__label__first}>
                Email de l&apos;utilisateur
              </span>
            </label>
            <input
              autoComplete="current-password"
              type="email"
              id="email"
              className={formStyles.form_control__input}
              {...register('email')}
              placeholder="Email de l'utilisateur"
            />
            <p className={formStyles.form_control__error}>{errors.email?.message}</p>
          </div>
          <div className="text-md mb-0 mb-3">
            <label htmlFor="email" className={formStyles.form_control__label}>
              <span className={formStyles.form_control__label__first}>Role utlisateur</span>
            </label>
            <div className="mt-1 flex">
              <select {...register('role')} className={formStyles.form_control__input}>
                <option data-countrycode="FR" value="">
                  Sélectionner
                </option>

                {ROLES.map((role: any) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-red-600">{errors?.role?.message}</p>
          </div>
          <button className={formStyles.form_control__button}>Enregister</button>
        </form>
      ) : null}
    </article>
  );
}

export default DroitsUtilisateurs;
