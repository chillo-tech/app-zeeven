import { add } from '@/services/crud';
import formStyles from '@/styles/Form.module.css';
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
    stock: yup.object({
      email: yup
        .number()
        .typeError('Saisir un entier')
        .transform((currentValue, originalValue) => {
          return originalValue === '' ? null : currentValue;
        })
        .min(0, 'Saisir un entier')
        .max(999, 'Saisir un entier')
        .nullable(true),
      sms: yup
        .number()
        .typeError('Saisir un entier')
        .transform((currentValue, originalValue) => {
          return originalValue === '' ? null : currentValue;
        })
        .min(0, 'Saisir un entier')
        .max(999, 'Saisir un entier')
        .nullable(true),
      whatsapp: yup
        .number()
        .typeError('Saisir un entier')
        .transform((currentValue, originalValue) => {
          return originalValue === '' ? null : currentValue;
        })
        .min(0, 'Saisir un entier')
        .max(999, 'Saisir un entier')
        .nullable(true),
      qrcode: yup
        .number()
        .typeError('Saisir un entier')
        .transform((currentValue, originalValue) => {
          return originalValue === '' ? null : currentValue;
        })
        .min(0, 'Saisir un entier')
        .max(999, 'Saisir un entier')
        .nullable(true),
    }),
  })
  .required();
function CreditsUtilisateurs() {
  const [errorMessage, setErrorMessage] = useState(
    'Une erreur est survenue, nous allons la résoudre sous peu'
  );
  const mutation = useMutation({
    mutationFn: (data) => add('/api/backend/user-stock', data),
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
  } = useForm<{
    email: string;
    stock: { email: number; sms: number; whatsapp: number; qrcode: number };
  }>({
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
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="text-md mb-3 flex-1 flex-grow">
              <label htmlFor="stock_email" className={formStyles.form_control__label}>
                <span className={formStyles.form_control__label__first}>EMAIL</span>
              </label>
              <div className="mt-1 flex">
                <input
                  autoComplete="current-password"
                  type="number"
                  id="stock_email"
                  className={formStyles.form_control__input}
                  {...register('stock.email')}
                  placeholder="Credits EMAIL"
                />
              </div>
              <p className="text-red-600">{errors?.stock?.email?.message}</p>
            </div>
            <div className="text-md mb-3 flex-1 flex-grow">
              <label htmlFor="stock_sms" className={formStyles.form_control__label}>
                <span className={formStyles.form_control__label__first}>SMS</span>
              </label>
              <div className="mt-1 flex">
                <input
                  autoComplete="current-password"
                  type="number"
                  id="stock_sms"
                  className={formStyles.form_control__input}
                  {...register('stock.sms')}
                  placeholder="Credits SMS"
                />
              </div>
              <p className="text-red-600">{errors?.stock?.sms?.message}</p>
            </div>
            <div className="text-md mb-3 flex-1 flex-grow">
              <label htmlFor="stock_whatsapp" className={formStyles.form_control__label}>
                <span className={formStyles.form_control__label__first}>WHATSAPP</span>
              </label>
              <div className="mt-1 flex">
                <input
                  autoComplete="current-password"
                  type="number"
                  id="stock_whatsapp"
                  className={formStyles.form_control__input}
                  {...register('stock.whatsapp')}
                  placeholder="Credits WHATSAPP"
                />
              </div>
              <p className="text-red-600">{errors?.stock?.whatsapp?.message}</p>
            </div>
            <div className="text-md mb-3 flex-1 flex-grow">
              <label htmlFor="stock_qrcode" className={formStyles.form_control__label}>
                <span className={formStyles.form_control__label__first}>QRCODE</span>
              </label>
              <div className="mt-1 flex">
                <input
                  autoComplete="current-password"
                  type="number"
                  id="stock_qrcode"
                  className={formStyles.form_control__input}
                  {...register('stock.qrcode')}
                  placeholder="Credits QRCODE"
                />
              </div>
              <p className="text-red-600">{errors?.stock?.qrcode?.message}</p>
            </div>
          </div>
          <button className={formStyles.form_control__button}>Enregister</button>
        </form>
      ) : null}
    </article>
  );
}

export default CreditsUtilisateurs;
