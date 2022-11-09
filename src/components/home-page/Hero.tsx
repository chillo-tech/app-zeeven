import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Hero() {
  const [isLoading, setLoading] = useState(true);
  const cn = (...classes: string[]) =>{
    return classes.filter(Boolean).join(' ')
  }
  const loaderProp =({ src }: {src: string}) => {
    return src;
  }
  return (
    <section className={`py-10 md:py-20 bg-gradient-to-r from-blue-900 to-blue-700 md:via-blue-800 md:to-blue-50 font-light`}>
      <div className="container mx-auto grid md:grid-cols-2 items-center">
        <div className="flex flex-col items-start px-3">
          <h1 className='text-white text-3xl md:text-5xl flex flex-col font-extrabold'>
            <span className='md:pb-4'>Informez vos contacts.</span>
            <span>Ils apprécient votre affection.</span>
          </h1>
          <h4 className='text-white flex flex-col font-extralight py-6'>
            <span>Ne perdez plus le temps à écrire à chacun de vos contacts</span>
            <span>ZEEVEN permet de personnaliser les interactions,les communications que vous engagiez vos contacts.</span>
            <span>Recevez les statistiques et suivez vos messages</span>
          </h4>
          <Link href="/create-campain" className={`bg-yellow-500 text-blue-900 border-yellow-500 text-lg py-2 rounded-lg px-5`}>
            Envoyer un message
          </Link>
        </div>
        <div className="relative md:px-32">
          <div className='w-full h-60 md:h-96 relative'>
            <Image
              fill={true}
              src={`/images/zeeven.png`}
              alt="Ecrivez un message et transmettez le à tout le monde, sur plusieurs canaux"
              loader={loaderProp}
              className={cn(
                'rounded-md duration-700 ease-in-out group-hover:opacity-75',
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0'
              )}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero