import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { axiosInstance } from '@/services/axios-instance';
import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { IWebinaireFormulaire } from '@/types/WebinaireFields';
import classNames from 'classnames';

const CONNAISSANCE_WEBINAIRE_CHOIX = [
  {
    value: 'social_networks',
    label: 'Les réseaux sociaux',
  },
  {
    value: 'newsletter',
    label: 'Par newsletter',
  },
  {
    value: 'search_engine',
    label: 'Via un moteur de recherche',
  },
  {
    value: 'website-blog',
    label: 'Via un site web ou un blog',
  },
  {
    value: 'friends-collegues_pov',
    label: "Par recommandation d'un ami ou d'un collegure",
  },
  {
    value: 'web_ads',
    label: 'Dans publicité en ligne',
  },
  {
    value: 'event-webinar',
    label: 'Durant un évènement ou le précédent webinaire',
  },
  {
    value: 'other',
    label: 'Autre',
  },
] as const;

const schema = yup.object({
  nom: yup.string(),
  prenom: yup.string(),
  email: yup
    .string()
    .email(EMAIL_ERROR_MESSAGE)
    .required(EMAIL_ERROR_MESSAGE)
    .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE }),
  numero_telephone: yup.string(),
  consentement_marketing: yup.boolean(),
  connaissance_webinaire: yup.string(),
});

const WebinaireForm = ({ formView }: { formView: IWebinaireFormulaire }) => {
  const [errorMessage, setErrorMessage] = useState(
    'Une erreur est survenue, nous allons la résoudre sous peu'
  );

  const PAGE_COUNT = 2;

  const [formPageIndex, setFormPageIndex] = useState(0);

  const answerWebinaire = (data: any) => {
    return axiosInstance.post('/api/chillo-backoffice/items/Webinaire', data);
  };
  const mutation = useMutation({
    mutationFn: answerWebinaire,
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
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [radioSelectedValue, setRadioSelectedValue] = useState('');

  const onSubmit = (data: any) => {
    console.log('data', data);
    mutation.mutate({ ...data, date_inscription: new Date().toISOString() });
  };

  return (
    <article
      className={`${styles.inputs__container} !sticky top-0 !h-fit !w-full !overflow-y-hidden`}
    >
      {mutation.isError ? (
        <h2 className={`text-center text-lg text-rose-500`}>{errorMessage}</h2>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <header className="mb-4 space-y-2">
          <h3 className="text-xl text-center lg:text-left">{formView.titre}</h3>
          <h4 className="font-light text-center lg:text-left">{formView.description}</h4>
        </header>
        {/* Partie une du formulaire */}
        {formPageIndex === 0 && (
          <>
            {/* nom */}
            <div className={formStyles.form_control}>
              <label htmlFor={`nom`} className={formStyles.form_control__label}>
                <span className={formStyles.form_control__label__first}>Votre nom</span>
              </label>
              <input
                type="text"
                id={`nom`}
                className={formStyles.form_control__input}
                placeholder={'Veuillez entrer votre nom'}
                {...register('nom')}
              />
              {errors.nom && (
                <p className={formStyles.form_control__error}>Veuillez indiquer votre nom </p>
              )}
            </div>

            {/* prenom */}
            <div className={formStyles.form_control}>
              <label htmlFor={`prenom`} className={formStyles.form_control__label}>
                <span className={formStyles.form_control__label__first}>Votre prénom</span>
              </label>
              <input
                type="text"
                id={`prenom`}
                className={formStyles.form_control__input}
                placeholder={'Veuillez entrer votre prénom'}
                {...register('prenom')}
              />
              {errors.prenom && (
                <p className={formStyles.form_control__error}>Veuillez indiquer votre prénom </p>
              )}
            </div>

            {/* email */}
            <div className={formStyles.form_control}>
              <label htmlFor={`email`} className={formStyles.form_control__label}>
                <span className={formStyles.form_control__label__first}>Votre email</span>
              </label>
              <input
                type="text"
                id={`email`}
                className={formStyles.form_control__input}
                placeholder={'Veuillez entrer votre email'}
                {...register('email')}
              />
              {errors.email && (
                <p className={formStyles.form_control__error}>Veuillez indiquer votre email </p>
              )}
            </div>

            {/* Consentement marketing */}
            <div className={`${formStyles.form_control}`}>
              <input
                type="checkbox"
                id={`consentement_marketing`}
                {...register('consentement_marketing')}
              />{' '}
              <label
                className="leading-0 relative top-[2px] cursor-pointer font-light"
                htmlFor={`consentement_marketing`}
              >
                Rejoignez notre communauté et soyez à jour sur toutes les nouveautés
              </label>
            </div>
          </>
        )}

        {/* partie 2 du formulaire */}
        {formPageIndex === 1 && (
          <>
            {/* connaissance webinaire */}
            <fieldset className={formStyles.form_control}>
              <label className={formStyles.form_control__label} htmlFor={`consentement_marketing`}>
                <span className={formStyles.form_control__label__first}>
                  Comment avez vous pris connaissance de ce webinaire
                </span>
              </label>
              <div className="space-y-1">
                {CONNAISSANCE_WEBINAIRE_CHOIX.map((choice, index) => {
                  return (
                    <div className="space-y-3" key={`${choice.value}-${index}`}>
                      <p
                        className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-200 shadow-sm  transition-all hover:bg-blue-400 hover:text-white ${classNames(
                          {
                            'bg-blue-400 text-white': choice.value === radioSelectedValue,
                          }
                        )}`}
                        onClick={() => {
                          setValue('connaissance_webinaire', choice.value);
                          if (choice.value === 'other') {
                            setValue('connaissance_webinaire', '');
                          }
                          setRadioSelectedValue(choice.value);
                        }}
                      >
                        <label
                          className="leading-0 relative top-[2px] cursor-pointer p-2"
                          htmlFor={`${choice.value}-${index}`}
                        >
                          {choice.label}
                        </label>
                      </p>
                      {choice.value === 'other' && radioSelectedValue === 'other' && (
                        <>
                          <input
                            className={formStyles.form_control__input}
                            placeholder="Veuillez preciser"
                            {...register('connaissance_webinaire')}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}

        <div className="flex items-center gap-2">
          {formPageIndex > 0 && (
            <button
              className={`${formStyles.form_control__button} !bg-white !text-blue-900`}
              onClick={() => {
                setFormPageIndex((prev) => prev - 1);
              }}
              type="button"
            >
              Précédent
            </button>
          )}
          {formPageIndex < PAGE_COUNT - 1 && (
            <button
              onClick={() => {
                setFormPageIndex((prev) => prev + 1);
              }}
              type="button"
              className={formStyles.form_control__button}
            >
              Suivant
            </button>
          )}
          {formPageIndex === PAGE_COUNT - 1 && (
            <button type="submit" className={formStyles.form_control__button}>
              Transmettre
            </button>
          )}
        </div>
        <footer className="my-3">
          <p className="text-center text-sm ">{formView.pied_de_page}</p>
        </footer>
      </form>
    </article>
  );
};

export default WebinaireForm;
