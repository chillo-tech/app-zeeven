import {useQuery} from 'react-query';
import Statistics from '@/components/campains/Statistics';
import Guests from '@/components/guests/Guests';
import Tables from '@/components/tables/Tables';
import Message from '@/components/Message';
import {Tabs} from '@/components/Tabs/Index';
import ProtectedLayout from '@/containers/protected';
import Head from 'next/head';
import React, { useState } from 'react'
import {search} from '@/services/crud';
import { handleError } from '@/services';

function CampainDetail({id}:{id: number}) {
	const [isError, setIsError] = useState(false);
	const {isSuccess, isLoading, data: {data} = {}} = useQuery<any>({
		queryKey: ["user-campains", id],
		queryFn: () => search(`/api/backend/event/${id}`),
    enabled: !!id,
		refetchOnWindowFocus: false,
    onError: (error: any) => {setIsError(true), handleError(error)},
	});
	return (
		<ProtectedLayout>
			<Head>
				<title>Informations sur votre évènement</title>
				<meta name="description" content="Informez nos contacts de vos évènements"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

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
			{isSuccess && data ? (
				<section className=''>
					<h1 className='text-app-blue font-semibold text-4xl mb-3'>{data.name}</h1>
          <Statistics id={id}/>
					<Tabs.Group aria-label="Tabs with icons" style="fullWidth">
						<Tabs.Item title="Contacts">
							<Guests/>
						</Tabs.Item>
						<Tabs.Item title="Tables">
							<Tables/>
						</Tabs.Item>
						
					</Tabs.Group>
				</section>
			) : null}
		</ProtectedLayout>
	)
}

export default CampainDetail;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const id = params['slug'].substring(
    params['slug'].lastIndexOf('-') + 1
  );
  return { props: { ...params, id, slug: params['slug'] } };
}

