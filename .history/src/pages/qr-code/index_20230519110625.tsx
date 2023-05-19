import Metadata from '@/components/Metadata'
import OpenedLayout from '@/containers/opened'
import React from 'react'

function QRCode() {
  return (
    <>
    <Metadata  entry={{title: 'QR codes dynamiques pour votre marque', description: 'Créez, suivez et gérez des codes QR dynamiques pour votre marque'}}/>
    <OpenedLayout>
      <div className="text-center py-10 font-sans container">
      <h1 className='text-4xl text-slate-900 font-bold mb-6 md:text-5xl'>QR codes dynamiques pour votre marque</h1>
      <h3 className='sm:text-xl text-slate-900'> Créez, suivez et gérez des codes <br/>QR dynamiques pour votre marque</h3>
      </div>
      <section className='bg-white rounded-lg py-10 mb-10 border border-blue-900 container'>
			</section>
    </OpenedLayout>
    </>
  )
}

export default QRCode