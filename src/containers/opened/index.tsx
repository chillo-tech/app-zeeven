import Head from 'next/head'
import React from 'react'
import { Poppins } from '@next/font/google'
import NavBar from '../components/NavBar';

const poppins = Poppins({weight: '300'});
function Layout({children}: {children: any}) {
  return (
    <section className={`${poppins.className} bg-gradient-to-b from-blue-100 to-pink-50 min-h-screen font-light`}>
      <Head>
        <title>Informez nos contacts de vos évènements</title>
        <meta name="description" content="Informez nos contacts de vos évènements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>
    </section>
  )
}

export default Layout
