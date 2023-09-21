import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import QRCodeItem from '@/components/qr-code/display/QRCodeItem';
import QRcodeStatistics from '@/components/qr-code/display/QRCodeStatistics';
import DeletetableItem from '@/components/shared/DeletetableItem';
import ProtectedLayout from '@/containers/protected';
import { handleError, search } from '@/services';
import { capitalize } from '@/utils';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';

function QRcodeDetail({ id }: { id: number }) {
  const [isError, setIsError] = useState(false);
  const {
    isSuccess,
    isLoading,
    data: { data } = {},
  } = useQuery<any>({
    queryKey: ['user-qr-code', id],
    queryFn: () => search(`/api/backend/qr-code/private/${id}`),
    enabled: !!id,
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
  });
  return (
    <ProtectedLayout>
      <Metadata entry={{title: 'Informations sur votre évènement', description: 'Informez nos contacts de vos évènements'}}/>

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
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {isSuccess && data ? (
        <section className="">
          <div
            className="p-4 border-b border-slate-100 bg-white !items-stretch"
         
          >
            <QRCodeItem entry={data} withDetail={false} />
          </div>
          <QRcodeStatistics id={id}/>
        </section>
      ) : null}
    </ProtectedLayout>
  );
}
export default QRcodeDetail;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const id = params['slug'].substring(params['slug'].lastIndexOf('-') + 1);
  return { props: { ...params, id, slug: params['slug'] } };
}
