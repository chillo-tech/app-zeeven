import {useQuery} from 'react-query'
import Head from 'next/head'
import React, { useState } from 'react'
import ProtectedLayout from '@/containers/protected';
import {fetchData, handleError} from '@/services';
import Message from '@/components/Message';
import Empty from '@/components/search/Empty';
import {useRouter} from 'next/router';
import List from '@/components/search/List';

function Compte() {
	const [isError, setIsError] = useState(false);
	const {isSuccess, isLoading, data: {data} = {}} = useQuery<any>({
		queryKey: ["user-campainnnns"],
		queryFn: () =>  fetchData({
      path: '/api/backend/event',
    }),
    onError: (error: any) => {setIsError(true), handleError(error)},
	});
	const router = useRouter();
	return (
		<ProtectedLayout>
			<Head>
				<title>Informez nos contacts de vos évènements</title>
				<meta name="description" content="Informez nos contacts de vos évènements"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<section className='shadow sm:rounded-md sm:overflow-hidden min-h-fit bg-white py-6 px-4 sm:p-6'>
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
							actionLabel="Retourner à l'accueil"
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
