import Message from '@/components/Message';
import { handleError } from '@/services';
import { add, deleteItem, search } from '@/services/crud';
import { Guest } from '@/types/Guest';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import GuestEdit from './GuestEdit';
import GuestList from './GuestList';

function Guests({ handleItemEdit, event }: any) {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const [eventId] = useState<String>(
    (slug as string).substring((slug as string)?.lastIndexOf('-') + 1)
  );
  const [formVisible, setFormVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(event.guests || []);
  const mutation = useMutation({
    mutationFn: ({ eventId, guestId }: any) =>
      deleteItem(`/api/backend/event/${eventId}/guest/${guestId}`),
    onSuccess: handleItemEdit,
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
  });
  const addMutation = useMutation({
    mutationKey: ['user-campains', slug, 'add-guest'],
    mutationFn: (item: Guest) => add(`/api/backend/event/${eventId}/guest`, item),
    onError: (error: AxiosError) => {
      setIsError(true), handleError(error);
    },
    onSuccess: handleItemEdit,
  });
  const onSubmit = async (item: Guest) => {
    setFormVisible(false);
    try {
      addMutation.mutate(item);
    } catch (error) {}
  };

  const deleteGuest = (guestId?: string) => {
    const eventId = `${(slug as string).substring((slug as string)?.lastIndexOf('-') + 1)}`;
    mutation.mutate({ eventId, guestId });
  };

  const { isSuccess, isLoading } = useQuery<any>({
    enabled: false,
    queryKey: ['user-campains', slug, 'guests'],
    queryFn: () =>
      search(
        `/api/backend/event/${(slug as string).substring(
          (slug as string)?.lastIndexOf('-') + 1
        )}/guest`
      ),
    onSuccess: ({ data }: any) => {
      //setData(data);
      //handleGuests(data);
    },
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    setData(event.guests)
  }, [event])
  
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
      {data ? (
        <>
          <div className="flex items-center justify-between border-b-2 border-blue-500">
            <span className="text-app-blue">Vos contacts ({data.length})</span>
            <button type="button" onClick={() => setFormVisible(!formVisible)}>
              <AiOutlineUserAdd className="text-2xl text-app-blue" />
            </button>
          </div>
          {formVisible ? <GuestEdit handleSubmit={onSubmit} /> : null}
          {data.length ? <GuestList guests={data} deleteGuest={deleteGuest} /> : null}
        </>
      ) : null}
    </article>
  );
}

export default Guests;
