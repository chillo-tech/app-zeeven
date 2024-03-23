import formStyles from '@/styles/Form.module.css';
import { useContext } from 'react';
import { context } from '../context';
const UserInfoForm = () => {
  const { register, errors } = useContext(context);
  return (
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
  );
};

export { UserInfoForm };
