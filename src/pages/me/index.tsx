import {useQuery} from 'react-query'
import Head from 'next/head'
import React, { useState } from 'react'
import ProtectedLayout from '@/containers/protected';
import {fetchData, handleError} from '@/services';
import Message from '@/components/Message';
import Empty from '@/components/search/Empty';
import {useRouter} from 'next/router';
import List from '@/components/search/List';
import Metadata from '@/components/Metadata';

function Compte() {
	const [isError, setIsError] = useState(false);
	const {isSuccess, isLoading, data: {data} = {}} = useQuery<any>({
		queryKey: ["user-campains"],
		queryFn: () =>  fetchData({
      path: '/api/backend/event',
    }),
    onError: (error: any) => {handleError(error);setIsError(true)},
	});
	const router = useRouter();
	return (
		<ProtectedLayout>
      <Metadata entry={{title: "Informez nos contacts de vos évènements", description: "Informez nos contacts de vos évènements"}}
      />
			<section className='shadow sm:rounded-md sm:overflow-hidden min-h-fit md:bg-white md:py-6 md:px-4 sm:p-6'>
				{isLoading ? (
						<Message
							type="loading"
							firstMessage='Un instant'
							secondMessage='Nous chargeons vos informations'
						/>)
					: null
				}
				{isError ? (
						<Message
							type="error"
							firstMessage='Une erreur est survenue, nous allons la résoudre sous peu'
							secondMessage='Veuillez prendre contact avec nous'
							actionLabel="Revenir à l'accueil"
						/>)
					: null
				}
				{isSuccess && data && !data.length ? (
					<Empty
						firstMessage='Pas de messages'
						secondMessage="Vous n'avez aucun applicationMessage pour le moment. Pourquoi ne pas en créer une ?"
						button={{label: 'Envoyer des messages', action: () => router.push('/nouvelle-campagne')}}
					/>) : null}

				{isSuccess && data && data.length ? (
					<List data={data}/>
				) : null}
			</section>
		</ProtectedLayout>
	)
}

export default Compte
