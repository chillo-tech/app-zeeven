import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import QRCodeLink from '@/components/qr-code/QRCodeLink';
import QRCodeVCARD from '@/components/qr-code/QRCodeVCARD';
import QRCodeWifi from '@/components/qr-code/QRCodeWifi';
import Debug from '@/components/shared/Debug';
import OpenedLayout from '@/containers/opened';
import { fetchData, handleError } from '@/services';
import { PAGE_FIELDS, QR_CODES_TYPES, slugify } from '@/utils';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
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
        fields: PAGE_FIELDS,
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
          <RenderHtmlContent content={data?.sublabel} />
        </h3>
      </div>
      <section className="container mx-auto mb-10 md:p-0">
        <div className="rounded-lg border-2 border-blue-300 bg-white p-5 md:p-8">
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex flex-col space-x-1 rounded-xl bg-blue-700/80 p-1 md:flex-row">
                {QR_CODES_TYPES.map((item: any) => (
                  <Tab
                    key={`label-${slugify(item.label)}`}
                    className={({ selected }) =>
                      classNames(
                        'flex items-center justify-center',
                        'text-md rounded-lg py-2.5 font-medium leading-5 text-app-blue md:w-full',
                        'ring-white ring-opacity-60 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'mr-2 bg-white shadow'
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
      <section className="bg-app-light-gray mx-auto mb-10 md:p-0">
        <div className="container">
          <RenderHtmlContent content={data?.abstract} classes="text-center py-10" />
          {data?.articles?.map(({ article_id }: any) => (
            <div
              className="container mx-auto md:w-11/12"
              key={`article-${data.id}-${article_id.id}`}
            >
              <h3 className="mb-8 mt-4 px-5 text-xl font-extrabold text-black md:px-0 md:text-4xl">
                <span className="uppercase text-app-blue">{article_id.label}</span>
              </h3>
              <Link className="ml-2 text-app-blue underline" href="/contactez-nous">
                Contactez nous
              </Link>
            </div>
          ))}
          <Debug data={data} />
        </div>
      </section>
    </OpenedLayout>
  );
}

export default QRCode;
