import { NewCampainContext } from '@/context/NewCampainContext';
import { FunctionComponent, useContext, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import BottomBar from '../BottomBar';
import Preview from '../Preview';
import CampainMessageEdit from './CampainMessageEdit';
import { FormValues } from './types';

interface CampainMessagesProps {}

const CampainMessages: FunctionComponent<CampainMessagesProps> = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const context = useContext(NewCampainContext);
  const {
    state: {
      stepIndex,
      campain: { messages = [{ text: '', date: '', time: '', order: 0 }] },
    },
    updateCampain,
    previousStep,
  } = context;
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      messages,
    },
  });
  const { fields, append, update } = useFieldArray({
    control,
    name: 'messages',
  });

  const onSubmit = (data: FormValues) => {
    let messages = data.messages.map((message) => ({
      ...message,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }));
    data['messages'] = messages;
    updateCampain(data);
  };
  return (
    <section className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-3 md:gap-0">
      <div className="border-r-2 border-slate-300 p-4 md:col-span-2 md:p-5">
        <form noValidate className="block space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <CampainMessageEdit
              key={field.id}
              control={control}
              update={update}
              index={index}
              value={field}
              stepIndex={stepIndex}
              previousStep={previousStep}
              setCurrentMessage={setCurrentMessage}
            />
          ))}
          <input type="submit" className='hidden'/>
        </form>
      </div>

      <div className="p-4 md:p-5">
        <Preview text={currentMessage} />
      </div>
    </section>
  );
};

export default CampainMessages;
