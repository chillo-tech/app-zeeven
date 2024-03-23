import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { IWebinaireFormulaire } from '@/types/WebinaireFields';
import Link from 'next/link';
import { useContext } from 'react';
import FormActionsButtons from './FormActionsButtons';
import { context } from './context';
import { Pages } from './pages';

const WebinaireForm = ({ formView }: { formView: IWebinaireFormulaire }) => {
  const { mutation, handleSubmitFn, errorMessage, formPageIndex } = useContext(context);

  return (
    <article
      className={`${styles.inputs__container} !sticky top-0 !h-fit !w-full !overflow-y-hidden`}
    >
      {mutation.isError ? (
        <h2 className={`text-center text-lg text-rose-500`}>{errorMessage}</h2>
      ) : null}
      {mutation.isSuccess ? (
        <>
          <p className="text-light text-center text-2xl text-blue-900">
            Nous sommes heureux de pouvoir compter sur votre présence à notre webinaire!
          </p>
          <p className="p-4 text-center text-lg">A très vite | Chillo tech</p>
          <button type="button" className={formStyles.form_control__button}>
            <Link href="/">Retourner à l'acceuil</Link>
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmitFn} className="">
          <header className="mb-4 space-y-2">
            <h3 className="text-center text-xl lg:text-left">{formView.titre}</h3>
            <h4 className="text-center font-light lg:text-left">{formView.description}</h4>
          </header>
          {Pages[formPageIndex]()}

          <FormActionsButtons />
          <footer className="my-3">
            <p className="text-center text-sm ">{formView.pied_de_page}</p>
          </footer>
        </form>
      )}
    </article>
  );
};

export default WebinaireForm;
