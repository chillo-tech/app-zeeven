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
        <title>Informations sur votre évènement</title>
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
      {isSuccess && data ? (
          <section className=''>
            <h1 className='text-blue-900 font-semibold text-4xl mb-3'>{data.name}</h1>
            <div className='shadow sm:rounded-md sm:overflow-hidden min-h-fit bg-white py-6 px-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 mb-4'>
                <div className='grid grid-flow-row grid-cols-2 text-center'>
                <h3 style="display: inline">&#128054;</h3>

                    <h3>{data?.guests?.length}</h3>
                </div>
            </div>
            <Tabs.Group aria-label="Tabs with icons" style="fullWidth">
              <Tabs.Item title="Invités">
              
              </Tabs.Item>
              <Tabs.Item title="Programme">
              
              </Tabs.Item>
            </Tabs.Group>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </section>
        ) : null}
    </ProtectedLayout>
  )
}

export default CampainDetail