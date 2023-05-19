import Metadata from '@/components/Metadata'
import OpenedLayout from '@/containers/opened'
import React from 'react'

function QRCode() {
  return (
    <>
    <Metadata  entry={{title: 'QR codes dynamiques pour votre marque', description: 'Créez, suivez et gérez des codes QR dynamiques pour votre marque'}}/>
    <OpenedLayout>
      <div className="text-center py-10 font-sans">
      <h1 className='text-4xl text-slate-900 font-bold mb-6 md:text-5xl'>QR codes dynamiques pour votre marque</h1>
      <h3 className='sm:text-xl text-slate-900'> Créez, suivez et gérez des codes <br/>QR dynamiques pour votre marque</h3>
      </div>
      <NewCampainContextWrapper>
				<Category/>
				<Title/>
				<Guests/>
				<Messages/>
				<Variables/>
				<Options/>
				<Recap/>
			</NewCampainContextWrapper>
    </OpenedLayout>
    </>
  )
}

export default QRCode