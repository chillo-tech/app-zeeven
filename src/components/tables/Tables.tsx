import Message from '@/components/Message';
import { handleError } from '@/services';
import { add, deleteItem, search } from '@/services/crud';
import { Table } from '@/types/Table';
import { RadioGroup } from '@headlessui/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiFillCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TableEdit from './TableEdit';
import TableList from './TableList';

const vues = ['Tables', 'Plan de table'];

function Tables() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const {
    query: { id = '', slug },
  } = router;

  const [vue, setVue] = useState(vues[0]);
  const [items, setItems] = useState([]);
  const [eventId, setEventId] = useState<String>(
    (slug as string).substring((slug as string)?.lastIndexOf('-') + 1)
  );
  const [formVisible, setFormVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    isSuccess,
    isLoading,
    data: { data } = [],
    refetch,
  } = useQuery<any>({
    queryKey: ['user-campains', slug, 'tables'],
    queryFn: () =>
      search(
        `/api/backend/event/${(slug as string).substring(
          (slug as string)?.lastIndexOf('-') + 1
        )}/table`
      ),
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
    },
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
  const deleteItemFromList = (itemToDeleteId: string) => {
    deleteMutation.mutate(itemToDeleteId);
  };
  const handleSelectedVue = (selectedVue: any) => {
    setVue(selectedVue);
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
          {data.length ? (
            <div className="flex items-center justify-between">
              <span />
              <RadioGroup value={vue} onChange={handleSelectedVue}>
                <div className="mb-3 flex rounded-md bg-white">
                  {vues.map((vue) => (
                    <RadioGroup.Option
                      key={vue}
                      value={vue}
                      className={({ checked }) => `
                        ${checked ? 'border-indigo-400 bg-indigo-200' : 'border-gray-200'}
                        relative flex cursor-pointer border px-6 py-1
                      `}
                    >
                      <AiFillCheckCircle className="ui-checked:block hidden" />
                      {vue}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ) : null}
          {vue === 'Tables' ? (
            <>
              <div className="flex items-center justify-between border-b-2 border-blue-500 pb-2">
                <span className="text-app-blue">Vos tables ({data.length})</span>
                <button type="button" onClick={() => setFormVisible(!formVisible)}>
                  <AiOutlinePlusCircle className="text-2xl text-app-blue" />
                </button>
              </div>
              {formVisible ? <TableEdit handleSubmit={onSubmit} /> : null}
              {data.length ? <TableList items={data} deleteItem={deleteItemFromList} /> : null}
            </>
          ) : (
            <div>plan</div>
          )}
        </>
      ) : null}
    </article>
  );
}

export default Tables;
