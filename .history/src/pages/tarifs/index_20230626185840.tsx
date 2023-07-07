import Metadata from '@/components/Metadata';
import OpenedLayout from '@/containers/opened';
import { fetchData } from 'next-auth/client/_utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

function Tarifs() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  useQuery<any>({
    queryKey: ['les-tarifs'],
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/pages?tags=tarifs`,
        fields: MENUFULL,
      }),
    onError: handleError,
    onSuccess: (data) => {
      setData(data.data.data);
      updateData({
        pageHeader: { images: data.data.data.images, titre: data.data.data.sous_libelle },
      });
    },
  });
  return (
    <OpenedLayout>
      <Metadata entry={{ title: 'Tarifs' }} />
      <section className="mx-auto w-11/12 pb-20 pt-10 md:w-1/2"></section>
    </OpenedLayout>
  );
}

export default Tarifs;
