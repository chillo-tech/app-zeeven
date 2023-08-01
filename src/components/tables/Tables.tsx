import Message from '@/components/Message';
import { handleError } from '@/services';
import { add, deleteItem, search } from '@/services/crud';
import { Table } from '@/types/Table';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TableEdit from './TableEdit';
import TableList from './TableList';

function Tables() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const {
    query: { id = '', slug },
  } = router;

  const [items, setItems] = useState([]);
  const [eventId, setEventId] = useState<String>((slug as string).substring((slug as string)?.lastIndexOf('-') + 1));
  const [formVisible, setFormVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    isSuccess,
    isLoading,
    data: { data } = [],
    refetch,
  } = useQuery<any>({
    queryKey: ['user-campains', slug, 'tables'],
    queryFn: () => search(`/api/backend/event/${(slug as string).substring((slug as string)?.lastIndexOf('-') + 1)}/table`),
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
    refetchOnWindowFocus: false,
  });
  const deleteMutation = useMutation({
    mutationKey: ['user-campains', slug, 'delete-table'],
    mutationFn: (itemId: String) => deleteItem(`/api/backend/event/${eventId}/table/${itemId}`),
    onSuccess: () => refetch(),
    onError: (error: any) => {
      setIsError(true), handleError(error);
    }
  });
  const addMutation = useMutation({
    mutationKey: ['user-campains', slug, 'add-table'],
    mutationFn: (item: Table) => add(`/api/backend/event/${eventId}/table`, item),
    onError: (error: AxiosError) => {
      setIsError(true), handleError(error);
    },
    onSuccess: () => queryClient.invalidateQueries(['user-campains', slug, 'tables']),
  });
  const onSubmit = async (item: Table) => {
    setFormVisible(false);
    try {
      addMutation.mutate(item);
    } catch (error) {}
  };
  const deleteItemFromList =  (itemToDeleteId: string) => {
    deleteMutation.mutate(itemToDeleteId)
  };

  return (
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
      {isSuccess ? (
        <>
          <div className="flex items-center justify-between border-b-2 border-blue-500">
            <span className="text-app-blue">Vos tables ({data.length})</span>
            <button type="button" onClick={() => setFormVisible(!formVisible)}>
              <AiOutlinePlusCircle className="text-2xl text-app-blue" />
            </button>
          </div>
          {formVisible ? <TableEdit handleSubmit={onSubmit} /> : null}
          {data.length ? <TableList items={data} deleteItem={deleteItemFromList} /> : null}
        </>
      ) : null}
    </article>
  );
}

export default Tables;
