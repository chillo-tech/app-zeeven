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
      <section className="container mx-auto w-11/12 pb-20 pt-10">
        {data ? (
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {data?.pages.map(({ related_page_id }: any) => (
                <Tab
                  key={`tarifs-${data.id}-${related_page_id.id}`}
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
                  {related_page_id.sublabel}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {data?.pages.map(({ related_page_id }: any) => (
                <Tab.Panel key={`tarifs-values-${data.id}-${related_page_id.id}`}>
                  <div className="grid grid-cols-3 gap-4">
                    {related_page_id?.prices.map(({ pricing_id }: any) => (
                      <div
                        key={`tarifs-values-${related_page_id.id}-${pricing_id.id}`}
                        className={classNames(
                          'border border-blue-200',
                          'relative rounded-2xl rounded-xl bg-white p-3 p-8 shadow-lg',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                        )}
                      >
                        <h3 className="text-center text-xl font-semibold uppercase text-gray-600">
                          {pricing_id?.label}
                        </h3>
                        <p className="py-1 text-center text-sm text-gray-600">
                          {pricing_id?.sublabel}
                        </p>
                        <h2 className="py-1 text-center text-3xl text-black">
                          {pricing_id?.value} {pricing_id?.unit}
                        </h2>
                        <p className="text-center opacity-75 text-sm text-gray-200">
                            {pricing_id?.description}
                        </p>
                        <p className="pt-1text-center mb-0">
                          <span
                            className="plan-pricing dynamic-pricing fs-1 lh-sm fw-normal text-dark"
                            data-plan="lite"
                            data-price="15"
                          ></span>

                          <br />
                         
                        </p>
                        <pre>{JSON.stringify(pricing_id, null, 2)}</pre>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        ) : null}
      </section>
    </OpenedLayout>
  );
}

export default Tarifs;
