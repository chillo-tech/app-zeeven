import Message from '@/components/Message';
import Debug from '@/components/shared/Debug';
import { NewCampainContext } from '@/context/NewCampainContext';
import { add, handleError } from '@/services';
import { slugify } from '@/utils';
import { getDisplayedDate, getFormattedTime } from '@/utils/DateFormat';
import { AxiosError } from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import BottomBar from './BottomBar';
import Preview from './Preview';

function Recap() {
  const context = useContext(NewCampainContext);
  const {
    state: { stepIndex, campain },
    previousStep,
    reset,
  } = context;
  const { data: sessionData } = useSession();
  const [isError, setIsError] = useState(false);

  const mutation = useMutation({
    mutationFn: (campain) => add('/api/backend/event', campain),
    //mutationFn: ((campain: any) => add("/api/backend/event", campain)),
    onError: (error: AxiosError) => {
      setIsError(true), handleError(error);
    },
  });
  const router = useRouter();
  const pageError = (error: any) => {
    setIsError(false);
    error.preventDefault();
    mutation.reset();
    //router.push('/');
  };
  const handleSuccess = (error: any) => {
    error.preventDefault();
    mutation.reset();
    reset();
    router.push('/');
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!sessionData) {
      signIn(undefined, {
        callbackUrl: `${window.location.origin}/nouvelle-campagne`,
      });
    } else {
      mutation.mutate(campain);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      {mutation.isLoading ? (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous enregistrons votre demande"
        />
      ) : null}
      {isError ? (
        <Message
          type="error"
          firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
          secondMessage="Veuillez prendre contact avec nous"
          action={pageError}
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {mutation.isSuccess ? (
        <Message
          type="success"
          firstMessage="Nous avons enregistré votre demande."
          secondMessage="Vous allez recevoir sous peu les informations sur votre demande"
          action={handleSuccess}
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {mutation.isIdle ? (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-0">
          <div className=" border-r-2 border-slate-300 p-4 md:p-5">
            <div className="block">
              <label
                htmlFor="recap"
                className="text-md mb-2 flex w-full flex-col justify-between font-light lg:text-xl"
              >
                <span className="font-semibold text-app-blue">Validez tout</span>
                <span className="text-sm text-gray-500">
                  Votre message et ceux à qui il sera transmis
                </span>
              </label>
              <div aria-describedby="recap">
                <div className="py-5">
                  <p>
                    Merci pour votre confiance{' '}
                    <span className="font-bold">{campain?.utilisateur?.name}</span>
                  </p>
                  <div className='my-5'>
                    Votre message sera transmis
                    <ul className='ml-5'>
                      {campain.messages[0].schedules.map((schedule: any, index: number) => (
                        <li key={`${slugify(schedule.date)}-${index}`}>
                          Le {getDisplayedDate(schedule.date)} à {getFormattedTime(new Date(schedule.date))}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p>Votre message sera transmis à {campain?.guests?.length} personne(s)</p>
                </div>
              </div>
            </div>
            <form onSubmit={onSubmit}>
              <BottomBar
                stepIndex={stepIndex}
                nextDisabled={false}
                previousStep={previousStep}
                nextLabel="Tout est ok pour moi"
              />
            </form>
          </div>
          <div className="p-4 md:p-5">
            <Preview
              text={campain.messages[0].text}
              guests={campain?.guests || []}
              variables={campain.messages[0].informations}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Recap;
