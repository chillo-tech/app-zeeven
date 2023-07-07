import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import OpenedLayout from '@/containers/opened';
import { fetchData, handleError } from '@/services';
import { TARIF_FIELDS } from '@/utils';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
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
      <section className="pt-16">
        {data ? (
          <Tab.Group>
            <Tab.List className="container mx-auto flex space-x-1 rounded-xl bg-app-blue/20 p-1 md:w-11/12">
              {data?.pages.map(({ related_page_id }: any) => (
                <Tab
                  key={`tarifs-${data.id}-${related_page_id.id}`}
                  className={({ selected }) =>
                    classNames(
                      'text-md w-full rounded-lg py-2 font-medium leading-5 text-app-blue md:py-4',
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
            <Tab.Panels className="mt-8">
              {data?.pages.map(({ related_page_id }: any) => (
                <Tab.Panel key={`tarifs-values-${data.id}-${related_page_id.id}`}>
                  <div className="container mx-auto pb-10 pt-6 md:w-11/12">
                    <h1 className="mb-8 mt-4 px-5 text-center text-3xl font-extrabold text-black md:px-0 md:text-4xl">
                      Notre offre de{' '}
                      <span className="uppercase text-app-blue">{related_page_id.label}</span>
                    </h1>
                    <div className="grid gap-4 md:grid-cols-3">
                      {related_page_id?.prices.map(({ pricing_id }: any) => (
                        <div
                          key={`tarifs-values-${related_page_id.id}-${pricing_id.id}`}
                          className={classNames(
                            'border border-blue-200',
                            'relative rounded-2xl rounded-xl bg-white p-8 shadow-lg',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                          )}
                        >
                          {pricing_id?.popular ? (
                            <span className="absolute top-0 -translate-y-1/2 translate-x-3/4 rounded-full bg-app-blue px-8 py-1 text-sm font-semibold text-white">
                              Populaire
                            </span>
                          ) : null}
                          <h3 className="font-dark text-center text-2xl font-semibold uppercase text-gray-600">
                            {pricing_id?.label}
                          </h3>
                          <p className="h-6 text-center text-sm text-gray-600  opacity-75">
                            {pricing_id?.sublabel}
                          </p>
                          <h2 className="mt-12 text-center text-6xl font-extrabold text-black">
                            {pricing_id?.value} {pricing_id?.unit}{' '}
                            {pricing_id?.reference ? (
                              <span className="text-sm font-normal">/{pricing_id?.reference}</span>
                            ) : null}
                          </h2>
                          <RenderHtmlContent
                            content={pricing_id?.description}
                            classes="text-center text-md text-gray-600 opacity-75 mb-4"
                          />

                          <Link
                            href="#"
                            className="yellow-button !items-center !justify-center !rounded-full !py-3 !text-center font-semibold"
                          >
                            Choisir cette offre
                          </Link>
                          {pricing_id?.items && pricing_id?.items.length ? (
                            <p className="mt-10 text-xl font-extrabold text-black">Inclus</p>
                          ) : null}
                          <ul className="text-md mb-20">
                            {pricing_id?.items.map(({ item_id }: any) => (
                              <li
                                className="flex items-center py-1"
                                key={`tarifs-values-${related_page_id.id}-${pricing_id.id}-${item_id.id}`}
                              >
                                <AiOutlineCheckCircle className="mr-2 text-app-blue" />
                                {item_id?.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 rounded-xl bg-app-light-gray py-8 text-center text-xl">
                    Besoin d&apos;aide pour choisir une offre?
                    <Link className="ml-1 text-app-blue underline" href="/contactez-nous">
                      Contactez nous
                    </Link>
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
