import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import React from 'react'
import ProtectedLayout from '../../containers/protected';
import {search} from 'services';
import Message from 'components/Message';
import Empty from 'components/search/empty';
import { useRouter } from 'next/router';

function Compte() {
  const  { isSuccess, isLoading, isError, data: {data}, error }  = useQuery<any>(["user-campains"], () => search("/evenement"));
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
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {isSuccess && data && !data.length ? (
        <Empty
          firstMessage='Pas de campagne' 
          secondMessage="Vous n'avez aucune campagne pour le moment. Pourquoi ne pas perfectionner en créer une ?"
          button={{label: 'Envoyer des messages', action: ()=>router.push('/nouvelle-campagne')}}
        />) : null}
    
      {isSuccess && data && data.length ? (
        <section></section>
      ) : null}
    </ProtectedLayout>
  )
}

export default Compte
