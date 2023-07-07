import { NewCampainContext } from '@/context/NewCampainContext';
import { useContext, useEffect, useState } from 'react';
import BottomBar from './BottomBar';
import Preview from './Preview';

function MessageVariables() {
  const defaultMessage = "Vous n'avez aucun paramètre, vous pouvez passer à l'étape suivante.";
  const [assignments, setAssignments] = useState<string[]>([]);
  const [informations, setInformations] = useState<string[]>([]);

  const context = useContext(NewCampainContext);
  const {
    state: { stepIndex, campain },
    updateCampain,
    previousStep,
  } = context;
  const { guests, messages } = campain;

  const [messageToHandle, setmessageToHandle] = useState(messages ? messages[0] : null);
  useEffect(() => {
    const {text} = messageToHandle;    
    const informationsInMessage = messages[0].text.match(/{{\w+}}/g) || [];

    console.log('====================================');
    console.log(text);
    console.log('====================================');
  }, [messageToHandle,])
  return (
    <section className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-3 md:gap-0">
      <div className=" border-r-2 border-slate-300 p-4 md:col-span-2 md:p-5">
        {messageToHandle ? (
          <>
            <div className="block">
              <label
                htmlFor="informations"
                className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
              >
                <span className="font-semibold text-blue-800">
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
              </div>
            </div>
            <pre>{JSON.stringify(messageToHandle, null, 2)}</pre>
          </>
        ) : (
          <div className="flex h-full flex-col justify-center py-10 text-center text-xl font-extralight">
            {defaultMessage}
          </div>
        )}

        <BottomBar stepIndex={stepIndex} nextDisabled={false} previousStep={previousStep} />
      </div>
      <div className="p-4 md:p-5">
        <Preview text={messages[0].text} variables={{}} contacts={guests} />
      </div>
    </section>
  );
}

export default MessageVariables;
