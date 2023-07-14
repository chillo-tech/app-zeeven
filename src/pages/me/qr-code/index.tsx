import Message from '@/components/Message';
import QRCodeItem from '@/components/qr-code/display/QRCodeItem';
import Debug from '@/components/shared/Debug';
import ProtectedLayout from '@/containers/protected'
import { fetchData, handleError, search } from '@/services';
import Head from 'next/head'
import React, { useState } from 'react'
import { useQuery } from 'react-query';

function QrCode() {
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState([]);
  const {isLoading} = useQuery<any>({
		queryKey: ["user-qr-code"],
    queryFn: () =>  search('/api/backend/qr-code'),
    onSuccess: ({data}: any) => {
     setData(data)
    },
    onError: (error: any) => {setIsError(true), handleError(error)},
		refetchOnWindowFocus: false,
	});
  return (
    <ProtectedLayout>
			<Head>
				<title>Vos QR codes</title>
				<meta name="description" content="Vos QR codes"/>
			</Head>
			<section className='shadow sm:rounded-md sm:overflow-hidden min-h-fit bg-white py-6 px-4 sm:p-6'>
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
							actionLabel="Retourner à l'accueil"
						/>)
					: null
				}
				{(data && data.length)? (
          <>
          {data.map((entry:any, index: number) => <QRCodeItem entry= {entry} key={`qr-code-item-${index}`} index= {index}/>)}
          </>
        ): null}
			</section>
		</ProtectedLayout>
  )
}

export default QrCode
