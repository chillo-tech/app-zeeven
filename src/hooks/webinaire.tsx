import { fetchDataClient } from '@/services';
import { IWebinaireView } from '@/types/WebinaireFields';
import { useQuery } from 'react-query';

const useWebinaire = ({ webinaire_id }: { webinaire_id: string }) => {
  const fetchView = async () => {
    const {
      data: { data: view },
    } = await fetchDataClient({
      path: `/api/chillo-backoffice/items/Description_Webinaire/${webinaire_id}/`,
      fields: '*,image_webinaire.*,formulaire.*',
    });

    return view as IWebinaireView;
  };

  const viewQuery = useQuery({
    queryKey: ['vue-webinaire', 1],
    queryFn: fetchView,
    retry: 10,
    refetchOnWindowFocus: false,
  });
  return { viewQuery };
};

export { useWebinaire };
