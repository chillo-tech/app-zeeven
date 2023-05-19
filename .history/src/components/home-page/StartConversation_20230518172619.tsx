import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

function StartConversation() {
  return (
    <section className='clear-both py-16 bg-gray-50'>
      <div className="container grid md:grid-cols-3">
        <div className="description col-span-2">
          <span className='text-md font-bold text-blue-900'>Commencez maintenant</span>
          <h2 className='flex flex-col font-bold text-5xl'>
            <span className='mb-2'>Entammez vos échanges</span>
            <span>avec ZEEVEN</span>
          </h2>
          <p className='flex flex-col py-6 text-[1.8rem]'>
            <span>Inscrivez vous entammez vos</span>
            <span>Meilleurs échanges aujourd&apos;hui</span>
          </p>
          <p className='flex gap-6 items-center justify-center'>
            <Link href="/create-campain" className={classNames('yellow-button')} >
              Envoyez votre premier message <BsArrowRight className='ml-4' />
            </Link>
            <Link href="/contactez-nous" className={classNames('blue-link', 'underline')}>
              Demandez une démo
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default StartConversation