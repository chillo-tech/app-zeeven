import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import { add, fetchData, handleError } from '@/services';
import { TARIF_FIELDS } from '@/utils';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
export type Offer = {
  productId: string;
  productName: string;
  optionId: string;
  optionName: string;
  amountHT: string;
  type: string;
};

function AcheterUneOffre({ option, product }: { option: string; product: string }) {
  const text =
    "La solution de ZEEVEN nous a rendu la vie beaucoup plus facile. <br/> La création de codes QR est rapide L'envoi de messages est simple.<br /> Pouvoir suivre leurs performances s'est avéré essentiel pour notre entreprise.";

  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<any>();
  const [queryError, setQueryError] = useState(false);
  const [mutationError, setMutationError] = useState(false);
  const tva = (value: number) => {
    return value * 0.2;
  };
  const total = (value: number) => {
    return Number(tva(value)) + Number(value);
  };

  const { isLoading } = useQuery<any>({
    queryKey: [`price-${option}-${product}`],
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/page/${product}`,
        fields: TARIF_FIELDS,
        filter: { prices: { pricing_id: { id: { _eq: option } } } },
      }),
    onError: (error: any) => {
      setQueryError(true), handleError(error);
    },
    onSuccess: (data) => {
      setData(data.data.data);
    },
  });
  const schema = yup
    .object({
      productId: yup.string().trim().required("Le produit n'est pas défini"),
      productName: yup.string().trim().required("Le produit n'est pas défini"),
      optionId: yup.string().trim().required("Aucune option n'a été choisie"),
      optionName: yup.string().trim().required("Aucune option n'a été choisie"),
      amountHT: yup.string().trim().required("Le montant n'est pas défini"),
      type: yup.string().trim().required("Le type n'est pas défini"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Offer>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const mutation = useMutation({
    mutationFn: (applicationMessage: Offer) => add('/api/backend/payment', applicationMessage),
    onError: (error: any) => {
      setMutationError(true), handleError(error);
    },
    onSuccess: (data : any) => {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      setIsSuccess(true);
    },
  });
  const onSubmit = (data: Offer) => mutation.mutate(data);
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
        <article className="flex flex-col justify-center p-3">
          {isLoading ? (
            <Message
              type="loading"
              firstMessage="Un instant"
              secondMessage="Nous chargeons vos informations"
            />
          ) : null}
          {queryError ? (
            <Message
              type="error"
              firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
              secondMessage="Veuillez prendre contact avec nous"
            />
          ) : null}
          {data ? (
            <div className="py-3">
              {mutationError ? (
                <div className="container mx-auto mb-10 rounded-lg border-2 border-blue-300 bg-white md:w-2/3">
                  <Message
                    type="error"
                    firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
                    secondMessage="N'hésitez pas à nous passer un coup de fil"
                    action={handleError}
                    actionLabel="Retourner à l'accueil"
                  />
                </div>
              ) : null}
              {isSuccess ? (
                <div className="container mx-auto mb-10 overflow-hidden rounded-lg md:w-2/3">
                  <Message
                    type="success"
                    firstMessage="Votre QR CODE a bien été généré"
                    secondMessage="Inscrivez vous pour recevoir des statistiques personnalisées"
                    action={() => router.push('/')}
                    actionLabel="Retourner à l'accueil"
                  />
                </div>
              ) : null}
              {mutation.isIdle ? (
                <div className="flex h-full flex-col justify-center">
                  <div className="mx-auto md:w-4/5">
                   
                  </div>
                </div>
              ) : null}
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
