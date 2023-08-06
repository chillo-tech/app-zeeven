import Message from '@/components/Message';
import Statistics from '@/components/campains/Statistics';
import Guests from '@/components/guests/Guests';
import Tables from '@/components/tables/Tables';
import ProtectedLayout from '@/containers/protected';
import { handleError } from '@/services';
import { search } from '@/services/crud';
import { PROFILE_CATEGORIES } from '@/utils';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';

function CampainDetail({ id }: { id: number }) {
  const [isError, setIsError] = useState(false);
  const [contacts, setContacts] = useState([]);
  const {
    isSuccess,
    isLoading,
    data: { data } = {},
  } = useQuery<any>({
    queryKey: ['user-campains', id],
    queryFn: () => search(`/api/backend/event/${id}`),
    enabled: !!id,
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
  });
  return (
    <ProtectedLayout>
      <Head>
        <title>Informations sur votre évènement</title>
        <meta name="description" content="Informez nos contacts de vos évènements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous chargeons vos informations"
        />
      ) : null}

      {isError ? (
        <Message
          type="error"
          firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
          secondMessage="Veuillez prendre contact avec nous"
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {isSuccess && data ? (
        <section className="">
          <h1 className="mb-3 text-4xl font-semibold text-app-blue">{data.name}</h1>
          <Statistics id={id} />
          {/** 
					<Tabs.Group aria-label="Tabs with icons" style="fullWidth">
						<Tabs.Item title="Contacts">
							<Guests/>
						</Tabs.Item>
						
					</Tabs.Group>
          <Tab.Group>
          */}
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {PROFILE_CATEGORIES.map(({ label }: any) => (
                <Tab
                  key={label}
                  className={({ selected }) =>
                    classNames(
                      'text-md w-full rounded-lg py-4 font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {label}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {PROFILE_CATEGORIES.map(({ slug }: any) => (
                <Tab.Panel
                  key={slug}
                  className={classNames(
                    'rounded-xl bg-white p-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  {(()=> {
                    switch (slug) {
                      case 'contact':
                        return  <Guests handleGuests={setContacts}/>
                      case 'table':
                        return  <Tables contacts={contacts}/>
                    }
                  })()}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </section>
      ) : null}
    </ProtectedLayout>
  );
}

export default CampainDetail;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const id = params['slug'].substring(params['slug'].lastIndexOf('-') + 1);
  return { props: { ...params, id, slug: params['slug'] } };
}
