import { handleError } from '@/services';
import { add } from '@/services/crud';
import { Profile } from '@/types/Profile';
import {
  BACKEND_BASE_PATH,
  COUNTRIES,
  EMAIL_ERROR_MESSAGE,
  PHONE_ERROR_MESSAGE,
  slugify,
} from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import Message from '../Message';
import GoogleGuests from './GoogleGuests';

type FormValues = {
  profile: Profile;
};

const schema = yup
  .object({
    id: yup.string(),
    civility: yup.string().required('Ce champ est requis'),
    firstName: yup.string().trim().required('Ce champ est requis'),
    lastName: yup.string().trim().required('Ce champ est requis'),
    email: yup.string().trim().email(EMAIL_ERROR_MESSAGE),
    phoneIndex: yup.string().trim().required('Sélectionner un indicatif'),
    phone: yup
      .string()
      .required('Ce champ est requis')
      .min(9, PHONE_ERROR_MESSAGE)
      .max(10, PHONE_ERROR_MESSAGE),
  })
  .required();

function GuestEdit({ handleSubmit, addPath }: { handleSubmit: Function; addPath: string }) {
  const [showSeparator, setShowSeparator] = useState(false);
  const [error, setError] = useState<any>();
  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(schema),
    defaultValues: { id: '', civility: '', firstName: '', lastName: '', email: '', phone: '' },
  });

  const addMutation = useMutation({
    mutationKey: [slugify(addPath), 'add-guest'],
    mutationFn: (item: Profile) => add(`${BACKEND_BASE_PATH}/${addPath}`, item),
    onError: (error: AxiosError) => {
      setError(error);
      handleError(error);
    },
    onSuccess: () => {
      handleSubmit();
      reset();
    },
  });

  const onSubmit = async (item: Profile) => {
    addMutation.mutate(item);
  };

  return (
    <div className="rounded-md bg-white px-4 py-6 shadow">
      <GoogleGuests reset={reset} handleSubmit={handleSubmit} showSeparator={setShowSeparator} />

      {showSeparator ? (
        <p className="relative my-6 flex h-px items-center justify-center bg-app-blue">
          <span className="absolute bg-white px-6 font-bold text-app-blue">
            OU REMPLIR LE FORMULAIRE
          </span>
        </p>
      ) : null}
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <div className="grid gap-4 sm:overflow-hidden md:grid-cols-3">
          <div className="text-md mb-0">
            <label htmlFor="civility" className="text-md mb-2 flex w-full flex-col justify-between">
              Civilité
            </label>
            <div className="mt-1">
              <select
                className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                {...register('civility')}
                id="civility"
              >
                <option value="">Sélectionner</option>
                <option value="MR">Monsieur</option>
                <option value="MLLE">Mademoiselle</option>
                <option value="MRS">Madame</option>
                <option value="MR_MRS">Monsieur & Madame</option>
              </select>
            </div>
            <p className="text-red-600">{errors?.civility?.message}</p>
          </div>
          <div className="text-md mb-0">
            <label
              htmlFor="firstName"
              className="text-md mb-2 flex w-full flex-col justify-between"
            >
              Prénom
            </label>
            <div className="mt-1">
              <input
                autoComplete="false"
                className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                {...register('firstName')}
                type="text"
                id="firstName"
              />
            </div>
            <p className="text-red-600">{errors?.firstName?.message}</p>
          </div>
          <div className="text-md mb-0">
            <label htmlFor="lastName" className="text-md mb-2 flex w-full flex-col justify-between">
              Nom
            </label>
            <div className="mt-1">
              <input
                autoComplete="false"
                className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                {...register('lastName')}
                type="text"
                id="lastName"
              />
            </div>
            <p className="text-red-600">{errors?.lastName?.message}</p>
          </div>
          <div className="text-md mb-0">
            <label htmlFor="phone" className="text-md mb-2 flex w-full flex-col justify-between">
              Téléphone
            </label>
            <div className="mt-1 flex flex-col md:flex-row">
              <select
                {...register('phoneIndex')}
                className="w-full rounded-tl-lg rounded-tr-lg border-gray-300 shadow-sm md:w-1/3 md:rounded-bl-lg md:rounded-tr-none"
              >
                <option data-countrycode="FR" value="">
                  Votre pays
                </option>

                {COUNTRIES.sort((countryA: any, countryB: any) =>
                  countryA.label.localeCompare(countryB.label)
                ).map((country: any) => (
                  <option key={country.code} data-countrycode={country.code} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              <input
                autoComplete="false"
                className="focus:ring-indigo-5000 rounded-bl-lg rounded-br-lg  border-gray-300 py-2 shadow-sm focus:border-indigo-500 md:w-2/3 md:rounded-bl-none md:rounded-br-lg md:rounded-tr-lg"
                {...register('phone')}
                type="number"
                id="phone"
              />
            </div>
            <p className="text-red-600">{errors?.phoneIndex?.message}</p>
            <p className="text-red-600">{errors?.phone?.message}</p>
          </div>
          <div className="text-md mb-0">
            <label htmlFor="email" className="text-md mb-2 flex w-full flex-col justify-between">
              E-mail
            </label>
            <div className="mt-1">
              <input
                autoComplete="false"
                className="focus:ring-indigo-5000 w-full rounded-lg border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                {...register('email')}
                type="email"
                id="email"
              />
            </div>
            <p className="text-red-600">{errors?.email?.message}</p>
          </div>
          <div className="text-md mb-0 flex flex-col pt-2 md:pt-8">
            <button
              type="submit"
              className="first: w-full rounded-lg bg-blue-800 py-2 font-light text-white shadow-sm hover:bg-blue-800"
            >
              Insérer dans la liste
            </button>
          </div>
        </div>
      </form>
      {addMutation.isLoading ? (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous enregistrons vos informations"
        />
      ) : null}
      <p className="text-red-600">{error?.response?.data?.message}</p>
    </div>
  );
}

export default GuestEdit;
