import formStyles from '@/styles/Form.module.css';
import { CONNAISSANCE_WEBINAIRE_CHOIX } from '@/utils';
import classNames from 'classnames';
import { useContext } from 'react';
import { context } from '../context';
const OtherDataForm = () => {
  const { setValue, radioSelectedValue, setRadioSelectedValue, register } = useContext(context);
  return (
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
                      className={`${formStyles.form_control__input} shrink-0 !p-[8px] !py-[12px] focus:border-indigo-500 focus-visible:outline-indigo-500`}
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
  );
};

export { OtherDataForm };
