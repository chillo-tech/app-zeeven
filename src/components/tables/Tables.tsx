import React, {useState} from 'react'
import TableEdit from './TableEdit';
import {useRouter} from 'next/router';
import TableList from './TableList';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {Table} from '@/types/Table';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import Message from '@/components/Message';
import {deleteItem, search} from '@/services/crud';
import { handleError } from '@/services';

function Tables() {
	const queryTable = useQueryClient();

	const router = useRouter();
	const {query: {id = '', slug}} = router;

	const [table, setTables] = useState([]);
	const [formVisible, setFormVisible] = useState(false);
	const [isError, setIsError] = useState(false);
	const mutation = useMutation({
		mutationFn: ({eventId, tableId}: any) => deleteItem(`event/${eventId}/table/${tableId}`),
		onSuccess: () => queryTable.invalidateQueries(["user-campains", slug, "Tables"]),
    onError: (error: any) => {setIsError(true), handleError(error)}
	});
	const onSubmit = async (profile: Table) => {
		setFormVisible(false);
		try {

		} catch (error) {
		} 
	};
	const deleteTable = (TableId?: string) => {
		const eventId = `${(slug as string).substring((slug as string)?.lastIndexOf('-') + 1)}`;
		mutation.mutate({eventId, TableId});
	}

	const {isSuccess, isLoading, data: {data} = []} = useQuery<any>({
		queryKey: ["user-campains", slug, "Tables"],
		queryFn: () => search(`/api/backend/event/${(slug as string).substring((slug as string)?.lastIndexOf('-') + 1)}/table`),
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
						<div className="border-b-2 border-blue-500 flex justify-between items-center">
							<span className='text-app-blue'>
							  Vos tables ({data.length})
							</span>
              {/*
							<button type='button' onClick={() => setFormVisible(!formVisible)}>
								<AiOutlineUserAdd className='text-2xl text-app-blue'/>
							</button>
              */}
						</div>
						{formVisible ? <TableEdit handleSubmit={onSubmit}/> : null}
						{data.length ? <TableList tables={data} deleteTable={deleteTable}/> : null}
					</>
				)
				: null}
		</article>
	)
}

export default Tables
