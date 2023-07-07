import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import { fetchData, handleError } from '@/services';
import { TARIF_FIELDS } from '@/utils';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { useQuery } from 'react-query';

function AcheterUneOffre({ option, product }: { option: string; product: string }) {
  const text =
    "La solution de ZEEVEN nous a rendu la vie beaucoup plus facile. <br/> La création de codes QR est rapide L'envoi de messages est simple.<br /> Pouvoir suivre leurs performances s'est avéré essentiel pour notre entreprise.";

  const [data, setData] = useState<any>();
  useQuery<any>({
    queryKey: [`price-${option}-${product}`],
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/page/${product}`,
        fields: TARIF_FIELDS,
        filter: { prices: { pricing_id: { id: { _eq: option } } } },
      }),
    onError: (error: any) => {setIsError(true), handleError(error)},
    onSuccess: (data) => {
      setData(data.data.data);
    },
  });
  return (
    <>
      <Metadata entry={{ title: 'Validez votre commande' }} />
      <section className="grid grid h-screen grid-cols-2 border-4 border-red-400">
        <div className="description flex flex-col justify-between bg-app-blue text-white">
          <Link href="/" className={`mx-6 mt-6 text-4xl !font-extrabold text-white`}>
            ZEEVEN
          </Link>
          <div className="px-10 text-xl font-light">
            <p className="text-xl">Adeline</p>
            <p className="mb-1 text-sm italic">CEO OLCEDEREVENTS</p>
            <RenderHtmlContent content={text} classes="text-white bg-white/20 rounded-xl p-6" />
          </div>
          <div className="flex w-full items-center justify-between bg-white/20 px-6 py-2 text-white">
            <span> &copy; Copyright {new Date().getFullYear()}</span>
            <div className="flex">
              <Link
                href="https://www.facebook.com/Chillotech-103869952427034"
                className="text-slate-300 hover:text-white"
              >
                <FaFacebookSquare className="mr-4 text-4xl" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/86905161"
                className="mr-2 text-slate-300 hover:text-white"
              >
                <FaLinkedinIn color="text-slate-300" className="text-4xl" />
              </Link>
              <Link
                target="_blank"
                href="https://wa.me/0033761705745"
                className="mr-2 text-slate-300 hover:text-white"
              >
                <FaWhatsapp color="text-slate-300" className="text-4xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="px-10 py-10 shadow-md">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const { query } = context;
  if (!query) {
    return {
      redirect: {
        permanent: true,
        destination: '/404',
      },
    };
  }
  const { product, option } = query;
  console.log('====================================');
  console.log(typeof product, product, option);
  console.log('====================================');
  if (product === 'undefined') {
    return {
      redirect: {
        permanent: true,
        destination: '/404',
      },
    };
  }

  if (option === 'undefined') {
    return {
      redirect: {
        permanent: true,
        destination: '/404',
      },
    };
  }
  return {
    props: {
      option,
      product,
    }, // will be passed to the page component as props
  };
};

export default AcheterUneOffre;
