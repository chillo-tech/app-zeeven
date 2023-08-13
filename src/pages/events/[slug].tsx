import Metadata from '@/components/Metadata';
import PresenceClassic from '@/components/events/presence/PresenceClassic';
import PresenceWithPartner from '@/components/events/presence/PresenceWithPartner';
import Layout from '@/containers/opened';
import { fetchData, handleError } from '@/services';
import { EVENT_FIELDS } from '@/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

function EventGuests({ id }: any) {
  const [data, setData] = useState<any>();
  useQuery<any>({
    queryKey: ['event-guests'],
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/Event/${id}`,
        fields: EVENT_FIELDS,
      }),
    onError: handleError,
    onSuccess: (data) => {
      setData(data.data.data);
    },
  });
  const router = useRouter();

  return (
    <>
      {data ? (
        <Layout>
          <Metadata entry={{ title: data?.name, description: 'Soyez des notres' }} />
          {
            (() => {
              switch (data.form) {
                case "GUIDED":
                  return <PresenceWithPartner data={data}/>              
                default:
                  return <PresenceClassic data={data}/>
              }
            })()
          }
        </Layout>
      ) : null}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const id = params['slug'].substring(params['slug'].lastIndexOf('-') + 1);
  return { props: { ...params, id, slug: params['slug'] } };
}

export default EventGuests;
