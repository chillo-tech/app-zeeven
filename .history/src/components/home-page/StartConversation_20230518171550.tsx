import React from 'react'

function StartConversation() {
  return (
    <section className='clear-both py-16 bg-gray-50'>
      <div className="container grid md:grid-cols-3">
        <div className="description col-sspan-2">
          <span className='text-md font-bold text-blue-900'>Commencez maintenant</span>
          <h2 className='flex flex-col font-bold text-5xl leading-10'>
            <span>Entammez vos échanges</span>
            <span>avec ZEEVEN</span>

          </h2>
        </div>
      </div>
    </section>
  )
}

export default StartConversation