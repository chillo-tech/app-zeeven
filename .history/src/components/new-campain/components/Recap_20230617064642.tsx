import React, {useContext, useState} from 'react'
import BottomBar from './BottomBar'
import {NewCampainContext} from '@/context/NewCampainContext';
import {getDisplayedDate} from '@/utils/DateFormat';
import Preview from './Preview';
import {useMutation} from 'react-query';
import {add, handleError} from '@/services';
import Message from '@/components/Message';
import {useRouter} from 'next/router'
import {signIn, useSession} from 'next-auth/react';
import { AxiosError } from 'axios';

function Recap() {
	const context = useContext(NewCampainContext);
	const {state: {stepIndex, campain}, previousStep, reset} = context;
	const {data: sessionData} = useSession();
	const [isError, setIsError] = useState(false);

	const mutation = useMutation({
    mutationFn: ((campain) => add("/api/backend/event", campain)),
		//mutationFn: ((campain: any) => add("/api/backend/event", campain)),
    onError: (error: AxiosError) => {setIsError(true), handleError(error)}
	});
	const router = useRouter()
	const pageError = (error: any) => {
    setIsError(false);
		error.preventDefault();
		mutation.reset();
		//router.push('/');
	}
	const handleSuccess = (error: any) => {
		error.preventDefault();
		mutation.reset();
		reset();
		router.push('/');
	}

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
		<section className='rounded-lg bg-white border border-slate-200 shadow-sm'>
			{mutation.isLoading ? (
				<Message
					type="loading"
					firstMessage='Un instant'
					secondMessage='Nous enregistrons votre demande'
				/>) : null}
			{isError ? (
				<Message
					type="error"
					firstMessage='Une erreur est survenue, nous allons la résoudre sous peu'
					secondMessage='Veuillez prendre contact avec nous'
					action={pageError}
					actionLabel="Retourner à l'accueil"
				/>) : null}
			{mutation.isSuccess ? (
				<Message
					type="success"
					firstMessage='Nous avons enregistré votre demande.'
					secondMessage='Vous allez recevoir sous peu les informations sur votre demande'
					action={handleSuccess}
					actionLabel="Retourner à l'accueil"
				/>) : null}
			{mutation.isIdle ? (
				<div className='grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-2'>
					<div className=" md:p-5 p-4 border-r-2 border-slate-300">
						<div className="block">
							<label htmlFor="recap"
								   className="w-full flex flex-col justify-between mb-2 text-md lg:text-xl font-light">
								<span className='text-blue-800 font-semibold'>Validez tout</span>
								<span
									className="text-gray-500 text-sm">Votre message et ceux à qui il sera transmis</span>
							</label>
							<div aria-describedby='recap'>
								<div className="py-5">
									<p>Merci pour votre confiance <span
										className="font-bold">{campain?.utilisateur?.name}</span></p>
									<p>Votre message sera transmis
										le {getDisplayedDate(campain.messages[0].date)} à {campain.messages[0].time}</p>
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
					<div className='md:p-5 p-4'>
						<Preview 
              text={campain.messages[0].text} 
              contacts={campain.messages[0].guests} 
              variables={campain.messages[0].informations}
            />
					</div>
				</div>
			) : null}
		</section>
	)
}

export default Recap
