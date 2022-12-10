import { useQuery } from '@tanstack/react-query';
import Message from 'components/Message';
import ProtectedLayout from 'containers/protected';
import Head from 'next/head';
import React from 'react'

function CampainDetail() {
  const  { isSuccess, isLoading, isError, data: {data} = {} }  = useQuery<any>(["user-campains"], () => search("/evenement"));
  const router = useRouter();
  return (
    <ProtectedLayout>
      <Head>
        <title>Informez nos contacts de vos évènements</title>
        <meta name="description" content="Informez nos contacts de vos évènements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          actionLabel="Retourner à l'accueil"
        />) 
        : null
      }
      {isSuccess && data && data.length ? (
       <List data={data}/>
      ) : null}
    </ProtectedLayout>
}

export default CampainDetail