import React, {useState} from 'react'
import GuestEdit from './GuestEdit';
import {useRouter} from 'next/router';
import GuestList from './GuestList';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {Guest} from '@/types/Guest';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import Message from '@/components/Message';
import {deleteItem, search} from '@/services/crud';
import { handleError } from '@/services';

function Guests() {
	const queryClient = useQueryClient();

	const router = useRouter();
	const {query: {id = '', slug}} = router;

	const [guests, setGuests] = useState([]);
	const [formVisible, setFormVisible] = useState(false);
	const [isError, setIsError] = useState(false);
	const mutation = useMutation({
		mutationFn: ({eventId, guestId}: any) => deleteItem(`event/${eventId}/guest/${guestId}`),
		onSuccess: () => queryClient.invalidateQueries(["user-campains", slug, "contacts"]),
		onError: (error) => {
			console.log(error)
		},
	});
	const onSubmit = async (profile: Guest) => {
		setFormVisible(false);
		try {

		} catch (error) {
		} 
	};
	const deleteGuest = (guestId?: string) => {
		const eventId = `${(slug as string).substring((slug as string)?.lastIndexOf('-') + 1)}`;
		mutation.mutate({eventId, guestId});
	}

	const {isSuccess, isLoading, data: {data} = []} = useQuery<any>({
		queryKey: ["user-campains", slug, "contacts"],
		queryFn: () => search(`/event/${(slug as string).substring((slug as string)?.lastIndexOf('-') + 1)}/guest`),
    onError: (error: any) => {setIsError(true), handleError(error)},
		refetchOnWindowFocus: false,
	});
	return (
		<article className='flex flex-col p-3'>
			{isLoading ? (
					<Message
						type="loading"
						firstMessage='Un instant'
						secondMessage='Nous chargeons vos informations'
					/>)
				: null
			}
			{isError ? (
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
							  Vos contacts ({data.length})
							</span>
							<button type='button' onClick={() => setFormVisible(!formVisible)}>
								<AiOutlineUserAdd className='text-2xl text-blue-800'/>
							</button>
						</div>
						{formVisible ? <GuestEdit handleSubmit={onSubmit}/> : null}
						{data.length ? <GuestList guests={data} deleteGuest={deleteGuest}/> : null}
					</>
				)
				: null}
		</article>
	)
}

export default Guests
