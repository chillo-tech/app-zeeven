import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'
import ProtectedLayout from '../../containers/protected'

function Compte() {
  const {data}  = useSession()

  return (
    <ProtectedLayout>
      <Head>
        <title>Informez nos contacts de vos évènements</title>
        <meta name="description" content="Informez nos contacts de vos évènements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='shadow sm:rounded-md sm:overflow-hidden min-h-fit bg-white py-6 px-4 sm:p-6'>

      <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </ProtectedLayout>
  )
}

export default Compte
