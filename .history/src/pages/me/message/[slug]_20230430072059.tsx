import {useQuery} from 'react-query';
import Guests from '@/components/guests/Guests';
import Message from '@/components/Message';
import {Tabs} from '@/components/Tabs/Index';
import ProtectedLayout from 'containers/protected';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react'
import {search} from '@/services/crud';

function CampainDetail({id}:{id: number}) {
	const {isSuccess, isLoading, isError, data: {data} = {}} = useQuery<any>({
		queryKey: ["user-campains", id],
		queryFn: () => search(`/event/${id}`),
		refetchOnWindowFocus: false,
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
					<h1 className='text-blue-900 font-semibold text-4xl mb-3'>{data.name}</h1>
				
					<Tabs.Group aria-label="Tabs with icons" style="fullWidth">
						<Tabs.Item title="Contacts">
							<Guests/>
						</Tabs.Item>
						<Tabs.Item title="Programme">

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

