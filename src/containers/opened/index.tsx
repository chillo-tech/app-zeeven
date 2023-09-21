import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import StartConversation from '@/components/home-page/StartConversation';
import Metadata from '@/components/Metadata';

function OpenedLayout({children}: {children: any}) {

  return (
    <>
    <Metadata  entry={{title: 'Informez nos contacts de vos évènements', description: 'Informez nos contacts de vos évènements'}}/>
    
    <section className={`bg-gradient-to-b from-blue-100 to-pink-50 min-h-screen font-light flex flex-col justify-between`}>
 
      <NavBar />
      <main>{children}</main>
      <StartConversation />
      <Footer />
    </section>
    </>
  )
}

export default OpenedLayout
