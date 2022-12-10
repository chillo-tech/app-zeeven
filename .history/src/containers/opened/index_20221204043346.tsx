import Head from 'next/head'
import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useSession } from 'next-auth/react';

function Layout({children}: {children: any}) {
  const data = useSession();

  return (
    <section className={`bg-gradient-to-b from-blue-100 to-pink-50 min-h-screen font-light flex flex-col`}>
      <Head>
        <title>Informez nos contacts de vos évènements</title>
        <meta name="description" content="Informez nos contacts de vos évènements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </section>
  )
}

export default Layout
