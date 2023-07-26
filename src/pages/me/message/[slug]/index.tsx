import Message from '@/components/Message';
import Statistics from '@/components/campains/Statistics';
import Guests from '@/components/guests/Guests';
import ProtectedLayout from '@/containers/protected';
import { handleError } from '@/services';
import { slugify } from '@/utils';
import { search } from '@/services/crud';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Invitations from '@/components/invitations';

function CampainDetail({ id }: { id: number }) {
  const [isError, setIsError] = useState(false);
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
          <Tab.Group>
          <Tab.List className="flex space-x-1 bg-blue-900/20 p-1 mt-2">
          {['Contacts', 'Invitations'].map((category) => (
            <Tab
              key={slugify(category)}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
            <Tab.Panels>
            {['Contacts', 'Invitations'].map((category) => (
            <Tab.Panel
              key={slugify(category)}
              className={classNames(
                'bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {(category === 'Contacts') ? (<Guests />) :null}
              {(category === 'Invitations') ? (<Invitations />) :null}
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
