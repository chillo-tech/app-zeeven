import Metadata from '@/components/Metadata';
import OpenedLayout from '@/containers/opened';
import { fetchData, handleError } from '@/services';
import { TARIF_FIELDS } from '@/utils';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

function Tarifs() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  useQuery<any>({
    queryKey: ['les-tarifs'],
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/page`,
        fields: TARIF_FIELDS,
        filter: { tag: 'tarifs' },
      }),
    onError: handleError,
    onSuccess: (data) => {
      setData(data.data.data[0]);
    },
  });
  return (
    <OpenedLayout>
      <Metadata entry={{ title: 'Tarifs' }} />
      <section className="mx-auto w-11/12 pb-20 pt-10 md:w-1/2">
        {data ? (
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {Object.keys(data?.pages).map(({related_page_id}: any) => (
                <Tab
                  key={page}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {page}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values([]).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                ></Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        ) : null}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </OpenedLayout>
  );
}

export default Tarifs;
