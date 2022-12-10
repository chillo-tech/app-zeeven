import { useQuery } from '@tanstack/react-query';
import Message from 'components/Message';
import { Tabs } from 'components/Tabs/Index';
import ProtectedLayout from 'containers/protected';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import { search } from 'services/crud';

function CampainDetail() {  
  const {query: {slug}} = useRouter();
  const  { isSuccess, isLoading, isError, data: {data} = {} }  = useQuery<any>({
      queryKey:  ["user-campains", slug],
      queryFn:  () => search(`/event/${(slug as string).substring((slug as string)?.lastIndexOf('-')+1)}`),
      refetchOnWindowFocus: false,
    });
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
       <Tabs.Group aria-label="Tabs with icons" style="fullWidth">
       <Tabs.Item title="Invités">
         <Guests />
       </Tabs.Item>
       <Tabs.Item title="Programme">
         <Schedules dates={event.dates}/>
       </Tabs.Item>
     </Tabs.Group>
      ) : null}
    </ProtectedLayout>
  )
}

export default CampainDetail