import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import { fetchData, handleError } from '@/services';
import { TARIF_FIELDS } from '@/utils';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { useQuery } from 'react-query';

function AcheterUneOffre({ option, product }: { option: string; product: string }) {
  const text =
    "La solution de ZEEVEN nous a rendu la vie beaucoup plus facile. <br/> La création de codes QR est rapide L'envoi de messages est simple.<br /> Pouvoir suivre leurs performances s'est avéré essentiel pour notre entreprise.";

  const [data, setData] = useState<any>();
  const [isError, setIsError] = useState(false);
  const { isLoading } = useQuery<any>({
    queryKey: [`price-${option}-${product}`],
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/page/${product}`,
        fields: TARIF_FIELDS,
        filter: { prices: { pricing_id: { id: { _eq: option } } } },
      }),
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
    onSuccess: (data) => {
      setData(data.data.data);
    },
  });
  return (
    <>
      <Metadata entry={{ title: 'Validez votre commande' }} />
      <section className="h-screen md:grid md:grid-cols-2">
        <div className="description flex flex-col justify-between bg-app-blue text-white">
          <Link href="/" className={`mx-6 mb-6 mt-6 text-4xl !font-extrabold text-white`}>
            ZEEVEN
          </Link>
          <div className="hidden px-10 text-xl font-light md:block">
            <p className="text-xl">Adeline</p>
            <p className="mb-1 text-sm italic">CEO OLCEDEREVENTS</p>
            <RenderHtmlContent content={text} classes="text-white bg-white/20 rounded-xl p-6" />
          </div>
          <div className="hidden w-full items-center justify-between bg-white/20 px-6 py-2 text-white md:flex">
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
        <article className="flex flex-col p-3">
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
            />
          ) : null}
          {data ? (
            <div className="flex h-full flex-col justify-center">
              <div className="mx-auto border border-red-300 md:w-2/3">
                {data
                .prices.filter(({ pricing_id }: any) => `${pricing_id.id}` === `${option}`)
                .map(({ pricing_id }: any) => (
                  <>
                  <div
                    key={`tarifs-values-${data.id}-${pricing_id.id}`}
                    className={classNames(
                      'border border-blue-200',
                      'relative rounded-2xl rounded-xl bg-white p-8 shadow-lg',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                  <h1 className="text-font-extrabold flex flex-col px-5 text-black">
                    <span>{data.sublabel}</span>
                    <span className="text-5xl font-extrabold text-black">
                      {pricing_id?.value} {pricing_id?.unit}{' '}
                      {pricing_id?.reference ? (
                        <span className="text-sm font-normal">/{pricing_id?.reference}</span>
                      ) : null}
                    </span>
                  </h1>
                    <h3 className="font-dark text-center text-2xl font-semibold uppercase text-gray-600">
                      {pricing_id?.label}
                    </h3>
                    <p className="h-6 text-center text-sm text-gray-600  opacity-75">
                      {pricing_id?.sublabel}
                    </p>
                    
                    <RenderHtmlContent
                      content={pricing_id?.description}
                      classes="text-center text-md text-gray-600 opacity-75 mb-4"
                    />
                  </div>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                  </>
                ))}
              </div>
              
            </div>
          ) : null}
        </article>
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
