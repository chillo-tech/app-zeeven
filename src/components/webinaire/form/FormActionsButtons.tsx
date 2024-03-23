import { useContext } from 'react';
import { context } from './context';

import formStyles from '@/styles/Form.module.css';
import { Pages } from './pages';

const FormActionsButtons = () => {
  const { formPageIndex, setFormPageIndex } = useContext(context);
  const PAGE_COUNT = Pages.length;
  const handlePrev = () => {
    setFormPageIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    setFormPageIndex((prev) => prev + 1);
  };
  return (
    <div className="flex items-center gap-2">
      {formPageIndex > 0 && (
        <button
          className={`${formStyles.form_control__button} !bg-white !text-blue-900`}
          onClick={handlePrev}
          type="button"
        >
          Précédent
        </button>
      )}
      {formPageIndex < PAGE_COUNT - 1 && (
        <button onClick={handleNext} type="button" className={formStyles.form_control__button}>
          Suivant
        </button>
      )}
      {formPageIndex === PAGE_COUNT - 1 && (
        <button type="submit" className={formStyles.form_control__button}>
          Transmettre
        </button>
      )}
    </div>
  );
};

export default FormActionsButtons;
