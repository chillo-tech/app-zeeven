import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import QRCodeLink from '@/components/qr-code/QRCodeLink';
import QRCodeVCARD from '@/components/qr-code/QRCodeVCARD';
import QRCodeWifi from '@/components/qr-code/QRCodeWifi';
import Debug from '@/components/shared/Debug';
import OpenedLayout from '@/containers/opened';
import { fetchData, handleError } from '@/services';
import { PAGE_FIELDS, QR_CODES_TYPES, slugify } from '@/utils';
import {  Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useState } from 'react';
import { BsPersonVcard, BsWifi } from 'react-icons/bs';
import { TfiWorld } from 'react-icons/tfi';
import { useQuery } from 'react-query';

function QRCode() {
  const [displayMenu, setDisplayMenu] = useState(true);
  const [data, setData] = useState<any>({});
  useQuery<any>({
    queryKey: ['les-QRCode'],
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/page/8`,
        fields: PAGE_FIELDS
      }),
    onError: handleError,
    onSuccess: (data) => {
      setData(data.data.data);
    },
  });
  return (
    <OpenedLayout>
      <Metadata
        entry={{
          title: 'QR codes dynamiques pour votre marque',
          description: 'Créez, suivez et gérez des codes QR dynamiques pour votre marque',
        }}
      />
      <div className="container py-10 text-center font-sans">
        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          QR codes dynamiques pour votre marque
        </h1>
        <h3 className="text-slate-900 sm:text-xl">
         <RenderHtmlContent content={data?.sublabel}/>
        </h3>
      </div>
      <section className="container mx-auto mb-10 md:p-0">
        <div className="rounded-lg border-2 border-blue-300 bg-white p-5 md:p-8">
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex flex-col md:flex-row space-x-1 rounded-xl bg-blue-700/80 p-1">
                {QR_CODES_TYPES.map((item: any) => (
                  <Tab
                    key={`label-${slugify(item.label)}`}
                    className={({ selected }) =>
                      classNames(
                        'flex items-center justify-center',
                        'text-md md:w-full rounded-lg py-2.5 font-medium leading-5 text-app-blue',
                        'ring-white ring-opacity-60 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow mr-2'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {item.value === 'LINK' ? <TfiWorld className="mr-4" /> : null}
                    {item.value === 'WIFI' ? <BsWifi className="mr-4" /> : null}
                    {item.value === 'VCARD' ? <BsPersonVcard className="mr-4" /> : null}
                    {item.label}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {QR_CODES_TYPES.map(({ label, value }: { label: string; value: string }) => (
                  <Tab.Panel
                    key={`value-${slugify(label)}`}
                    className={classNames(
                      'rounded-xl bg-white px-4',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    {
                      {
                        LINK: <QRCodeLink type="LINK" handleMenu={setDisplayMenu} />,
                        WIFI: <QRCodeWifi type="WIFI" handleMenu={setDisplayMenu} />,
                        VCARD: <QRCodeVCARD type="VCARD" handleMenu={setDisplayMenu} />,
                      }[value]
                    }
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </section>
      <section className="container mx-auto mb-10 md:p-0">
         <RenderHtmlContent content={data?.abstract} classes="text-center py-10"/>
         {data?.articles.map(({ article_id }: any) => (
                <Tab.Panel key={`tarifs-values-${data.id}-${article_id.id}`}>
                  <div className="container mx-auto md:w-11/12">
                    <h1 className="mb-8 mt-4 px-5 text-center text-3xl font-extrabold text-black md:px-0 md:text-4xl">
                      Notre offre de{' '}
                      <span className="uppercase text-app-blue">{article_id.label}</span>
                    </h1>
                    <div className="grid gap-4 md:grid-cols-3">
                      {article_id?.prices.map(({ pricing_id }: any) => (
                        <div
                          key={`tarifs-values-${article_id.id}-${pricing_id.id}`}
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
                          <h2 className="mt-12 text-center text-5xl font-extrabold text-black">
                            {pricing_id?.value} {pricing_id?.unit}{' '}
                            {pricing_id?.frequence ? (
                              <span className="text-sm font-normal">/{frequenceLabel(pricing_id?.frequence)}</span>
                            ) : null}
                          </h2>
                          <RenderHtmlContent
                            content={pricing_id?.description}
                            classes="text-center text-md text-gray-600 opacity-75 mb-4"
                          />

                          <Link
                            href={`/me/acheter-une-offre?product=${article_id.id}&option=${pricing_id.id}`}
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
                                key={`tarifs-values-${article_id.id}-${pricing_id.id}-${item_id.id}`}
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
                  <div className="mt-6 bg-app-yellow py-12 text-center text-2xl mb-3">
                    Besoin d&apos;aide pour choisir une offre?
                    <Link className="ml-2 text-app-blue underline" href="/contactez-nous">
                      Contactez nous
                    </Link>
                  </div>
                </Tab.Panel>
              ))}
        <Debug data={data}/>             
      </section>
    </OpenedLayout>
  );
}

export default QRCode;
