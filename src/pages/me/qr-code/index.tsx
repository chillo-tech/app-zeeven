import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import QRCodeItem from '@/components/qr-code/display/QRCodeItem';
import ProtectedLayout from '@/containers/protected';
import { handleError, search } from '@/services';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';

function QrCode() {
  const [isError, setIsError] = useState(false);
  const { isLoading, refetch, data } = useQuery<any>({
    queryKey: ['user-qr-code'],
    queryFn: () => search('/api/backend/qr-code'),
    onError: (error: any) => {
      setIsError(true);
      handleError(error);
    },
    refetchOnWindowFocus: false,
  });
  return (
    <ProtectedLayout>
      <Metadata entry={{ title: 'Vos QR codes', description: 'Vos QR codes' }} />
      <section className="min-h-fit bg-white px-4 py-6 shadow sm:overflow-hidden sm:rounded-md sm:p-6">
        <p className="flex items-center justify-end">
          <Link href="/qr-code" className="blue-link underline">
            Créer un QR CODE
          </Link>
        </p>
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
        {data && data.data && data.data.length ? (
          <>
            {data.data.map((entry: any, index: number) => (
              <QRCodeItem
                refetch={refetch}
                entry={entry}
                key={`qr-code-item-${index}`}
                index={index}
              />
            ))}
          </>
        ) : null}
      </section>
    </ProtectedLayout>
  );
}

export default QrCode;
