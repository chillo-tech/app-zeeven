import Message from '@/components/Message';
import { handleError } from '@/services';
import { deleteItem, search } from '@/services/crud';
import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useMutation, useQuery } from 'react-query';
import GuestEdit from './GuestEdit';
import GuestList from './GuestList';
import { slugify, BACKEND_BASE_PATH } from '@/utils';

function Guests({ handleItemEdit, event, params }: any) {
  const [formVisible, setFormVisible] = useState(false);
  //const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [{fetchPath, addPath}, setParams] = useState<any>(params);

  const { isLoading, refetch, data:{data} = {} } = useQuery<any>({
    enabled: (fetchPath && fetchPath.length  > 0),
    queryKey: [slugify(fetchPath), 'guests'],
    queryFn: () =>
      search(`${BACKEND_BASE_PATH}/${fetchPath}`),
      onError: (error: any) => {
        setIsError(true), handleError(error);
      },
      refetchOnWindowFocus: false,
  });
  const deleteMutation = useMutation({
    mutationFn: ({ guestId }: any) => deleteItem(`${BACKEND_BASE_PATH}/${addPath}/${guestId}`),
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
  });
 
  const onSubmit = () => {
    setFormVisible(false);
    refetch();
  };

  const deleteGuest = (guestId?: string) => deleteMutation.mutate({ guestId });

  return (
    <>
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
      {(data && data.length) ? (
        <>
          <div className="flex items-center justify-between border-b-2 border-blue-500">
            <span className="text-app-blue">Vos contacts ({data.length})</span>
            <button type="button" onClick={() => setFormVisible(!formVisible)}>
              <AiOutlineUserAdd className="text-2xl text-app-blue" />
            </button>
          </div>
          {formVisible ? <GuestEdit handleSubmit={onSubmit} addPath={addPath}/> : null}
          {data.length ? <GuestList guests={data} deleteGuest={deleteGuest} /> : null}
        </>
      ) : null}
    </>
  );
}

export default Guests;
