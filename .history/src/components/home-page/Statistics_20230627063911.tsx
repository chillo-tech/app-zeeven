import Image from 'next/image'
import React from 'react'
import { STATISTICS } from '@/utils/data'

function Statistics() {
  return (
    <section className={`bg-gray-200 container md:items-center mx-auto rounded-lg grid md:justify-center md:grid-cols-${STATISTICS.length}`}>
      {STATISTICS.map((statistic, index) => (
        <article className='md:py-6 py-3 flex flex-row md:flex-col md:text-center md:justify-center md:items-center' key={`statistic-${index}`}>
          <Image src={`/images/statistics/${statistic.image}`} width="50" height="50" alt={`${statistic.title} ${statistic.description}`}/>
          <div className="text-lg md:text-center pl-5 md:pl-0">
            <h6 className='text-app-blue font-bold text-2xl'>{statistic.title}</h6>
            <p className='text-app-blue'>{statistic.description}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

export default Statistics