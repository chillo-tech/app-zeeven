import Metadata from '@/components/Metadata';
import QRCodeLink from '@/components/qr-code/QRCodeLink';
import QRCodeWifi from '@/components/qr-code/QRCodeWifi';
import OpenedLayout from '@/containers/opened';
import { QR_CODES_TYPES, slugify } from '@/utils';
import classNames from 'classnames';
import { useState } from 'react';
import { BsWifi } from 'react-icons/bs';
import { TfiWorld } from 'react-icons/tfi';

function QRCode() {
  const [displayMenu, setDisplayMenu] = useState(true);
  const [type, setType] = useState('LINK');
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  })
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
          Créez, suivez et gérez des codes <br />
          QR dynamiques pour votre marque
        </h3>
      </div>

          


      <section className="container mx-auto mb-10 p-2 md:p-0">
        <div className="rounded-lg border-2 border-blue-300 bg-white p-5 md:p-8">
          {displayMenu ? (
            <ul className="flex border-b border-gray-300 text-xl">
              {QR_CODES_TYPES.map((item: any) => (
                <li key={slugify(item.label)}>
                  <button
                    type="button"
                    className={classNames(
                      'text-md flex items-center justify-center py-1 px-3 font-light text-black',
                      'cursor-pointer',
                      { 'border-b-4 border-blue-700': type === item.value }
                    )}
                    onClick={() => setType(item.value)}
                  >
                    {item.value === 'LINK' ? <TfiWorld className="mr-4" /> : null}
                    {item.value === 'WIFI' ? <BsWifi className="mr-4" /> : null}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {
            {
              LINK: <QRCodeLink type="LINK" handleMenu={setDisplayMenu} />,
              WIFI: <QRCodeWifi type="WIFI" handleMenu={setDisplayMenu} />,
            }[type]
          }
        </div>
      </section>
    </OpenedLayout>
  );
}

export default QRCode;
