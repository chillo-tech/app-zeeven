import React, {useEffect, useState, useCallback} from 'react'
import GuestEdit from './GuestEdit';
import { useRouter } from 'next/router';
import GuestList from './GuestList';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Guest } from 'types/Guest';
import { search } from 'services/crud';
import { useQuery } from '@tanstack/react-query';
import Message from 'components/Message';

function Guests() {
  const {query: {id = ''}} = useRouter();
  const [guests, setGuests] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  
  const fetchGuests = useCallback(async () => {
    try {
      //const {data} = await apiClient.get(`event/${id[0]}/guest`);
      //setGuests(data);
    } catch (error) {
    }
  }, [id])

  const onSubmit = async (profile: Guest) => {
    setFormVisible(false);
    try {
      //const apiClient = AuthenticatedApiClient();
      //await apiClient.post(`event/${id[0]}/guest`, JSON.stringify(profile));
      fetchGuests();
    } catch (error) {
    }
  };

  useEffect(()=>{
    fetchGuests();
  }, [fetchGuests])

  const {query: {slug}} = useRouter();
  const  { isSuccess, isLoading, isError, data: {data} = [] }  = useQuery<any>({
      queryKey:  ["user-campains", slug, "contacts"],
      queryFn:  () => search(`/event/${(slug as string).substring((slug as string)?.lastIndexOf('-')+1)}/guest`),
      refetchOnWindowFocus: false,
    });

  return (
    <article className='flex flex-col p-3'>
      {isLoading ?(
         <Message
         type="loading" 
         firstMessage='Un instant' 
         secondMessage='Nous chargeons vos informations' 
       />) 
        : null
      }
      {isError ?(
        <Message
          type="error" 
          firstMessage='Une erreur est survenue, nous allons la résoudre sous peu' 
          secondMessage='Veuillez prendre contact avec nous'
        />) 
        : null
      }
      {isSuccess && data ? (
        <>
          <div className="border-b-2 border-blue-500 flex justify-between items-center py-2 my-2">
            <span className='text-blue-800'>
              Vos invités ({guests.length})
            </span>
            <button type='button' onClick={() => setFormVisible(!formVisible)}>
              <AiOutlineUserAdd className='text-2xl text-blue-800'/>
            </button>
          </div>
          {formVisible ? <GuestEdit handleSubmit={onSubmit} /> : null }
          {guests.length ? <GuestList guests={data} /> : null }
        </>
      )
      : null }
    </article>
  )
}

export default Guests