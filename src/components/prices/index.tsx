import RenderHtmlContent from '@/components/RenderHtmlContent';
import { sendData } from '@/services';
import { frequenceLabel } from '@/utils';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { useMutation } from 'react-query';
import Debug from '../shared/Debug';

function Prices({ data: prices }: { data: any }) {
  const mutation = useMutation({
    mutationFn: (payment: any) => sendData('/api/bakckend/payment', payment),
  });

  return (
    <>
      {prices ? (
        <section className="pt-16">
          <Tab.Group>
            <Tab.List className="container flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {prices.map(({ pricing_id: price }: any) => (
                <Tab
                  key={`tarifs-${price.id}-${price.label}`}
                  className={(price) =>
                    classNames(
                      'ext-md w-full rounded-lg py-2 font-medium leading-5 md:py-4',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      price.selected
                        ? 'bg-white text-app-blue shadow'
                        : 'over:bg-white/[0.12] text-app-blue hover:text-white'
                    )
                  }
                >
                  {price.label}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-8">
              {prices.map(({ pricing_id: price }: any) => (
                <Tab.Panel key={`tarifs-values-${price.id}-${price.label.id}`}>
                  <div className="container mx-auto md:w-11/12">
                    <h2 className="mb-8 mt-4 px-5 text-3xl font-extrabold text-black md:px-0 md:text-4xl">
                      Notre offre de
                      <span className="ml-1 uppercase text-app-blue">Tairfs {price.label}</span>
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                      {price?.plans?.map(({ price_plan_id: plan }: any) => (
                        <div
                          key={`tarifs-values-${price?.id}-${plan?.id}`}
                          className={classNames(
                            'text-center',
                            'border border-blue-200',
                            'relative rounded-2xl rounded-xl p-8',
                            'ring-offset-blue-100 focus:outline-none focus:ring-2',
                            {
                              'bg-app-blue text-white shadow-lg': plan?.popular,
                              'bg-white text-gray-600 ring-white ring-opacity-60 ring-offset-2':
                                !plan?.popular,
                            }
                          )}
                        >
                          <h2 className="font-dark text-center text-2xl font-semibold uppercase">
                            {plan?.label}
                          </h2>
                          <p className="h-6 text-center text-sm opacity-75">
                            {plan?.sublabel}
                          </p>
                          <h3 className="my-6 text-center text-5xl font-extrabold">
                            {plan?.value} {plan?.unit}{' '}
                            {plan?.frequence ? (
                              <span className="text-sm font-normal">
                                /{frequenceLabel(plan?.frequence)}
                              </span>
                            ) : null}
                          </h3>
                          <RenderHtmlContent
                            content={plan?.description}
                            classes="text-center text-md opacity-75 mb-4"
                          />

                          <Link
                            href={`/me/acheter-une-offre?product=${price?.id}&option=${plan?.id}`}
                            className="yellow-button !items-center !justify-center !rounded-full !py-3 !text-center font-semibold"
                          >
                            Choisir cette offre
                          </Link>
                          {plan?.items && plan?.items.length ? (
                            <div className='text-left'>
                              <p className="mt-10 text-xl font-extrabold">Inclus</p>
                              <ul className="text-md">
                              {plan?.items.map(({ price_plan_item_id: item }: any) => (
                                  <li
                                    className="py-1 flex gap-2 items-center"
                                    key={`tarifs-values-${price.id}-${plan.id}-${item.id}`}
                                  >
                                    <span className='text-xl'>&#8729;</span><span>{item?.label}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3 mt-6 bg-app-yellow py-12 text-center text-2xl">
                    Besoin d&apos;aide pour choisir une offre?
                    <Link className="ml-2 text-app-blue underline" href="/contactez-nous">
                      Contactez nous
                    </Link>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </section>
      ) : null}
    </>
  );
}

export default Prices;
