import { NewCampainContext } from '@/context/NewCampainContext';
import {
  INFORMATIONS,
  isUserInformation,
  variableFieldType,
  variableWithoutTemplate,
} from '@/utils/data';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BottomBar from './BottomBar';
import Preview from './Preview';

interface FormValues {
  messages: {
    text: string;
    timezone: string;
    informations: {
      [key: string]: any;
    };
    isSent?: boolean;
  }[];
}
const informationLabel = (information: string) => {
  const vWithoutPattern = information ? variableWithoutTemplate(information) : '';
  return vWithoutPattern.length
    ? INFORMATIONS.find(({ value }) => value === vWithoutPattern)?.label
    : vWithoutPattern;
};

function Variables() {
  const defaultMessage = "Vous n'avez aucun paramètre, vous pouvez passer à l'étape suivante.";
  const [assignments, setAssignments] = useState<string[]>([]);
  const context = useContext(NewCampainContext);
  const {
    state: { stepIndex, campain },
    updateCampain,
    previousStep,
  } = context;
  const { guests, messages } = campain;
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });
  const updatedVariables = watch('messages.0.informations');
  const onSubmit = (data: any) => {
    updateCampain(data);
  };

  useEffect(() => {
    const informationsInMessage = messages[0].text.match(/{{\w+}}/g) || [];
    setAssignments(informationsInMessage);
    informationsInMessage.forEach((variable: string, index: number) => {
      const variableWithoutPattern = variableWithoutTemplate(variable);
      const variables = messages[0].informations || {};
      if (Object.keys(variables).length) {
        const variableToSet = Object.keys(variables)[index];
        setValue(`messages.0.informations.${'' + index}`, variables[variableToSet], {
          shouldDirty: true,
        });
      } else {
        setValue(
          `messages.0.informations.${'' + index}`,
          `${isUserInformation(variable) ? variable : ''}`,
          { shouldDirty: true }
        );
      }
    });
  }, [guests, messages, setValue]);
  return (
    <section className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-3 md:gap-0">
      <div className=" border-r-2 border-slate-300 p-4 md:col-span-2 md:p-5">
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden-fields hidden">
            <textarea
              className="hidden"
              defaultValue={messages[0].text}
              {...register(`messages.0.text`, {
                required: `Veuillez saisir une valeur pour le paramètre text`,
              })}
            />
          </div>
          <div className="hidden-fields hidden">
            <textarea
              className="hidden"
              defaultValue={messages[0].schedules}
              {...register(`messages.0.text`, {
                required: `Veuillez saisir une valeur pour le paramètre text`,
              })}
            />
          </div>
          {assignments.length ? (
            <div className="block">
              <label
                htmlFor="informations"
                className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
              >
                <span className="font-semibold text-app-blue">
                  Veuillez personnaliser votre message
                </span>
                <span className="text-sm text-gray-500">
                  Les informations permettront de construire le message final
                </span>
              </label>
              <div
                className={`grid grid-rows-${assignments.length}`}
                aria-describedby="informations"
              >
                <div
                  className={`grid grid-cols-3 gap-6 border-b border-t border-slate-200 py-1 text-lg`}
                >
                  <span className="">L&apos;information</span>
                  <span className="col-span-2 flex flex-col">
                    <span>a la valeur</span>
                    <span className="text-sm text-gray-500">Vous pouvez saisir une valeur</span>
                  </span>
                </div>
                {assignments.map((information: string, index: number) => (
                  <div
                    key={`var-${index}`}
                    className={`grid grid-cols-3 items-center gap-4 border-b border-slate-200 py-3 pr-3 text-center ${
                      index % 2 === 0 ? 'bg-slate-100' : ''
                    }`}
                  >
                    <label htmlFor={`information-${index}-${variableWithoutTemplate(information)}`}>
                      {informationLabel(information)}( {information} )
                    </label>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        {isUserInformation(information) ? (
                          <>
                            <p className="mr-1 block w-full rounded-lg bg-gray-300 px-2 py-2 text-left shadow-sm disabled:opacity-50">
                              {informationLabel(information)} du destinataire
                            </p>
                            <input
                              {...register(`messages.0.informations.${index}`, {
                                required: `Veuillez saisir une valeur pour le paramètre ${variableWithoutTemplate(
                                  information
                                )}`,
                              })}
                              value={information}
                              type={variableFieldType(information)}
                              disabled={
                                Object.keys(guests[0]).indexOf(
                                  variableWithoutTemplate(information)
                                ) > -1
                              }
                              placeholder={informationLabel(information)}
                              id={`information-${index}-${variableWithoutTemplate(information)}`}
                              className={`hidden`}
                            />
                          </>
                        ) : (
                          <input
                            {...register(`messages.0.informations.${index}`, {
                              required: `Veuillez saisir une valeur pour le paramètre ${variableWithoutTemplate(
                                information
                              )}`,
                            })}
                            defaultValue={
                              messages[0].informations
                                ? messages[0].informations[variableWithoutTemplate(information)]
                                : ''
                            }
                            type={variableFieldType(information)}
                            disabled={
                              Object.keys(guests[0]).indexOf(variableWithoutTemplate(information)) >
                              -1
                            }
                            placeholder={informationLabel(information)}
                            id={`information-${index}-${variableWithoutTemplate(information)}`}
                            className={`${
                              Object.keys(guests[0]).indexOf(variableWithoutTemplate(information)) >
                              -1
                                ? 'bg-gray-300 disabled:opacity-75'
                                : null
                            } focus:ring-indigo-5000 col-span-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500`}
                          />
                        )}
                      </div>
                      <p className="text-red-500">
                        {errors?.messages
                          ? (errors?.messages[0]?.informations?.[index]?.message as string)
                          : null}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center py-10 text-center text-xl font-extralight">
              {defaultMessage}
            </div>
          )}
          <BottomBar stepIndex={stepIndex} nextDisabled={false} previousStep={previousStep} />
        </form>
      </div>
      <div className="p-4 md:p-5">
        <Preview text={messages[0].text} variables={updatedVariables} contacts={guests} />
      </div>
    </section>
  );
}

export default Variables;
