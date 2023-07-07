import Head from 'next/head'
import React from 'react'
import ProtectedLayout from '@/containers/protected'
import {useQuery} from 'react-query';
import {fetchData} from '@/services';
import Message from '@/components/Message';
import ProfileEdit from '@/components/profile/ProfileEdit';

function Compte() {
	const {isLoading, isError, data: {data} = {}} = useQuery<any>({
		queryKey: ["user-profile"],
    queryFn: () =>  fetchData({
      path: '/api/backend/profile',
    }),
	});
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
				{data ? (<ProfileEdit redirectUrl="/me" endpoint={`profile/${data.id}`} data={data}
									  method="PATCH"/>) : null}
			</section>
		</ProtectedLayout>
	)
}

export default Compte
