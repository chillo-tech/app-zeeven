import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import Statistics from '@/components/campains/Statistics';
import Guests from '@/components/guests/Guests';
import Tables from '@/components/tables/Tables';
import ProtectedLayout from '@/containers/protected';
import { handleError } from '@/services';
import { search } from '@/services/crud';
import { PROFILE_CATEGORIES } from '@/utils';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

function CampainDetail({ id }: { id: number }) {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>();

  const {
    isSuccess,
    isLoading,

    refetch,
  } = useQuery<any>({
    queryKey: ['user-campains', id],
    queryFn: () => search(`/api/backend/event/${id}`),
    enabled: !!id,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setData(data);
    },
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
  });

  const handleItemEdit = () => {
    refetch();
  };
  return (
    <ProtectedLayout>
      <Metadata
        entry={{
          title: 'Informations sur votre évènement',
          description: 'Informez nos contacts de vos évènements',
        }}
      />
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
      {(data && Object.keys(data).length)? (
        <section className="">
          <h1 className="mb-3 text-4xl font-semibold text-app-blue">{data.name}</h1>
          <Statistics id={id} />
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
                  {(() => {
                    switch (slug) {
                      case 'contact':
                        return <Guests event={data} handleItemEdit={handleItemEdit} />;
                      case 'table':
                        return <Tables event={data} handleItemEdit={handleItemEdit} />;
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
