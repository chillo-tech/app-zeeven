import Metadata from '@/components/Metadata';
import ProtectedLayout from '@/containers/protected';
import { search } from '@/services';
import { BACKEND_BASE_PATH } from '@/utils';
import { useQuery } from 'react-query';
type Params = { invitationId: number; eventId: number };
function TemplateParamaters({ invitationId, eventId }: Params) {


  const { isLoading, refetch } = useQuery<any>({
    queryKey: ['user-campains', eventId],
    queryFn: () => search(`${BACKEND_BASE_PATH}/event/${eventId}`),
    enabled: !!eventId,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      //setData(data);
      //updateData({ event: data });
    },
    onError: (error: any) => {
      //setIsError(true);
      //handleError(error);
    },
  });


  return (
    <ProtectedLayout>
      <Metadata entry={{ title: 'Paramètres évènements', description: 'Paramètres évènements' }} />
      <h1 className="text-3xl font-semibold text-app-blue">Invitations pour votre évènement</h1>
      {eventId} {invitationId}
    </ProtectedLayout>
  );
}

export default TemplateParamaters;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const slug = params['slug'];
  
  const eventId = slug.substring(slug.lastIndexOf('-') + 1);

  const invitationId = params['index'];
  return { props: { ...params, eventId, invitationId } };
}
