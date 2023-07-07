import Metadata from '@/components/Metadata';
import QRCodeLink from '@/components/qr-code/QRCodeLink';
import OpenedLayout from '@/containers/opened';
import { QR_CODES_TYPES, slugify } from '@/utils';
import classNames from 'classnames';
import { useState } from 'react';
import { TfiWorld } from 'react-icons/tfi';

function QRCode() {


  const [type, setType] = useState(true);
  const [type, setType] = useState('LINK');
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
      <section className="container p-2 md:p-0 mx-auto mb-10">
        <div className="md:p-8 p-5 rounded-lg border-2 border-blue-300 bg-white">
        <ul className="flex border-b border-gray-300 text-xl">
          {QR_CODES_TYPES.map((item: any) => (
            <li key={slugify(item.label)}>
              <button type='button'
                className={classNames(
                  'text-md flex items-center justify-between pr-2 py-1 font-light text-black',
                  'cursor-pointer',
                  { 'border-b-2 border-blue-700': type === item.value }
                )}
                onClick={() => setType(item.value)}
              >
                {item.value === 'LINK' ? (<TfiWorld className='mr-1'/>) : null} 
                {item.label }
                
              </button>
            </li>
          ))}
        </ul>
        {
          {
            'LINK': <QRCodeLink type='LINK' />
          }[type]
        }
        </div>
      </section>
    </OpenedLayout>
  );
}

export default QRCode;
