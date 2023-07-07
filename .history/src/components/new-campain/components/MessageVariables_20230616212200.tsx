import { useContext, useState } from 'react';
import Preview from './Preview';
import { NewCampainContext } from '@/context/NewCampainContext';
import BottomBar from './BottomBar';

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
  return (
    <section className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-3 md:gap-0">
      <div className=" border-r-2 border-slate-300 p-4 md:col-span-2 md:p-5">
      <BottomBar stepIndex={stepIndex} nextDisabled={false} previousStep={previousStep} />

      </div>
      <div className="p-4 md:p-5">
        <Preview text={messages[0].text} variables={{}} contacts={guests} />
      </div>
    </section>
  );
}

export default MessageVariables;
