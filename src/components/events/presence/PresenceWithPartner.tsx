import Message from '@/components/Message';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import ImageDisplay from '@/components/image-display';
import { pattchData } from '@/services';
import { COUNTRIES, PHONE_ERROR_MESSAGE } from '@/utils';
import { RadioGroup } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
const presences = [
  {
    id: '1',
    value: 'PRESENT',
    label: 'Oui',
    sublabel: 'Avec plaisir',
  },
  {
    id: '0',
    value: 'ABSENT',
    label: 'Non',
    sublabel: 'Avec beaucoup de regrets',
  },
];
const civilites = [
  {
    id: 1,
    value: 'MR',
    label: 'Monsieur',
  },
  {
    id: 2,
    value: 'MS',
    label: 'Madame',
  },
];
export type Message = {
  civility: string;
  name: string;
  partner: string;
  phone: string;
  phoneIndex: string;
  presence: boolean;
  adults: string;
  children: string;
};
const schema = yup
  .object({
    presence: yup.string().trim().required('Serez vous présents'),
    civility: yup.string().trim().required('Votre civilité'),
    name: yup.string().trim().required('Votre nom et votre prénom'),
    partner: yup.string().when('presence', {
      is: (val: String) => val === 'PRESENT',
      then: yup.string().required('Nom et votre prénom de votre partenaire'),
    }),
    adults: yup.string().trim().required("Combien d'adultes"),
    children: yup.string().trim().required("Combien d'enfants"),
    phoneIndex: yup.string().trim().required('Sélectionner un indicatif'),
    phone: yup
      .string()
      .required(PHONE_ERROR_MESSAGE)
      .min(9, PHONE_ERROR_MESSAGE)
      .max(9, PHONE_ERROR_MESSAGE),
  })
  .required();
function PresenceWithPartner({ data }: any) {
  const [presence, setPresence] = useState();
  const [civility, setCivility] = useState();
  const handleSuccess = (error: any) => {
    error.preventDefault();
    mutation.reset();
    router.push('/');
  };
  const mutation = useMutation({
    mutationFn: (message: any) => pattchData(`/api/backoffice/Event/${data.id}`, message),
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Message>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Message) => {
    const guestQuery: any = { guests: { create: [{ guest_id: data }] } };
    mutation.mutate(guestQuery);
  };
  const handleRadioButton = (name: 'presence' | 'civility', value: any) => {
    setValue(name, value);
    trigger(name);

    if (name === 'presence' && value === 'ABSENT') {
      setValue('children', '0');
      trigger('children');
      setValue('adults', '0');
      trigger('adults');
    }

    if (name === 'presence' && value === 'PRESENT') {
      setValue('children', '0');
      setValue('adults', '2');
    }
  };
  const [selectedRadioButn, setSelectedRadioBtn] = React.useState('M');
  const isRadioSelected = (value: string): boolean => true;

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);

  return (
    <section
      className={classNames(
        'mx-auto mb-8 mt-10 grid w-11/12 rounded-md border border-slate-200 shadow-sm md:w-3/4 md:grid-cols-7'
      )}
      style={{ backgroundColor: data['backgroundcolor'] ? data['backgroundcolor'] : '#ffffff' }}
    >
      <div className={classNames('md:col-span-5')}>
        <article className="md:p-5">
          {mutation.isLoading ? (
            <Message
              type="loading"
              firstMessage="Un instant"
              secondMessage="Nous enregistrons vos informations"
            />
          ) : null}
          {mutation.isError ? (
            <Message
              type="error"
              firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
              secondMessage="Nous résolvons le problème"
              action={handleSuccess}
              actionLabel="Aller à l'accueil"
            />
          ) : null}
          {mutation.isSuccess ? (
            <Message
              type="success"
              firstMessage="Nous avons reçu vos informations."
              secondMessage="Votre billet vous sera envoyé sous peu avec les informations relatives à votre installation pour la soirée."
              action={handleSuccess}
              actionLabel="Aller à l'accueil"
            />
          ) : null}
          {mutation.isIdle ? (
            <form
              noValidate
              className="flex flex-col space-y-4 p-2 md:p-0"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <RadioGroup
                  value={presence}
                  onChange={(value) => handleRadioButton('presence', value)}
                  name="presence"
                  className=""
                >
                  <RadioGroup.Label className="text-md">Votre pr&eacute;sence</RadioGroup.Label>
                  <div className="grid items-center gap-4 md:grid-cols-2">
                    {presences.map((presence) => (
                      <RadioGroup.Option
                        key={presence.value}
                        value={presence.value}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                              : ''
                          }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
                    relative cursor-pointer rounded-md border border-gray-300 px-5 py-4 text-center shadow-sm focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`text-3xl font-medium ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {presence.label}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`text-md inline ${
                                  checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <span>{presence.sublabel}</span>
                              </RadioGroup.Description>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <p className="text-red-500">{errors.presence?.message}</p>
              </div>
              <div>
                <RadioGroup
                  value={civility}
                  onChange={(value) => {
                    handleRadioButton('civility', value);
                  }}
                  name="civility"
                >
                  <RadioGroup.Label>Votre civilité</RadioGroup.Label>
                  <div className="grid items-center gap-4 md:grid-cols-2">
                    {civilites.map((civilite) => (
                      <RadioGroup.Option
                        key={civilite.value}
                        value={civilite.value}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                              : ''
                          }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
                    relative cursor-pointer rounded-md border border-gray-300  py-4 text-center shadow-sm focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`text-md ${checked ? 'text-white' : 'text-gray-900'}`}
                              >
                                {civilite.label}
                              </RadioGroup.Label>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <p className="text-red-500">{errors.civility?.message}</p>
              </div>
              <div className="block">
                <label htmlFor="name" className="flex w-full flex-col justify-between">
                  Votre nom
                </label>
                <input
                  type="text"
                  id="name"
                  title="Veuillez préciser votre nom de famille(couple) si vous serez à deux ou en famille !"
                  placeholder="Votre nom et votre prénom"
                  className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                  {...register('name')}
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div className="text-md mb-0">
                <label htmlFor="phone" className="flex w-full flex-col justify-between">
                  <span>Votre téléphone</span>
                  <span className="text-xs text-gray-500">
                    Nous vous enverrons votre invitation sur votre téléphone
                  </span>
                </label>
                <div className="mt-1 flex flex-col md:flex-row">
                  <select
                    {...register('phoneIndex')}
                    className="rounded-tl-md rounded-tr-md border-gray-300 border-gray-300 shadow-sm shadow-sm md:w-1/3 md:rounded-bl-md md:rounded-tr-none"
                    title="Votre numéro Whatsapp de préférence!"
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
                    placeholder="Votre numéro de téléphone"
                    type="number"
                    title="Votre numéro Whatsapp de préférence!"
                    autoComplete="false"
                    className="focus:ring-indigo-5000 rounded-bl-md rounded-br-md  border-gray-300 py-2 shadow-sm focus:border-indigo-500 md:w-2/3 md:rounded-bl-none md:rounded-br-md md:rounded-tr-md"
                    {...register('phone')}
                    id="phone"
                  />
                </div>
                <p className="text-red-600">{errors?.phoneIndex?.message}</p>
                <p className="text-red-600">{errors?.phone?.message}</p>
              </div>
              <div className="block">
                <label htmlFor="partner" className="flex w-full flex-col justify-between">
                  Votre partenaire
                </label>
                <input
                  type="text"
                  id="partner"
                  placeholder="Nom et prénom de votre partenaire"
                  className="focus:ring-indigo-5000 w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500"
                  {...register('partner')}
                />
                <p className="text-red-500">{errors.partner?.message}</p>
              </div>
              <button
                type="submit"
                className="w-full rounded-md border-app-yellow bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-800  px-4 py-2 shadow-md"
              >
                Enregistrer
              </button>

              <RenderHtmlContent
                content={data.message}
                classes="text-center text-2xl font-extralight"
              />
            </form>
          ) : null}
        </article>
      </div>
      <div
        className={classNames(
          'flex flex-col justify-between md:col-span-2 md:border-l md:border-gray-200',
          'order-first md:order-last'
        )}
      >
        <div className="pt-2">
          <div className="px-2">
            <p className="flex items-center justify-center md:items-end md:justify-end">
              <ImageDisplay
                wrapperClasses="h-20 w-32 relative overflow-hidden"
                imageClasses="object-contain "
                image={data.icon}
              />
            </p>
            <h3 className={classNames('text-center text-2xl font-extrabold md:text-right')}>
              {data.name}
            </h3>
            <RenderHtmlContent content={data.address} classes="text-center md:text-right" />
          </div>
        </div>
        <ImageDisplay
          wrapperClasses="w-full h-96 relative overflow-hidden"
          imageClasses="object-cover"
          image={data.image}
        />
      </div>
    </section>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const id = params['slug'].substring(params['slug'].lastIndexOf('-') + 1);
  return { props: { ...params, id, slug: params['slug'] } };
}

export default PresenceWithPartner;
