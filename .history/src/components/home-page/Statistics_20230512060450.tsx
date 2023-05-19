import Image from 'next/image'
import React from 'react'
import { STATISTICS } from '@/utils/data'

function Statistics() {
  return (
    <section className={`bg-gray-200 container items-center mx-auto rounded-lg grid justify-center md:grid-cols-${STATISTICS.length}`}>
      {STATISTICS.map((statistic, index) => (
        <article className='py-6 flex flex-col tect-center items-center justify-center items-center' key={`statistic-${index}`}>
          <Image src={`/images/statistics/${statistic.image}`} width="50" height="50" alt={`${statistic.title} ${statistic.description}`}/>
          <div className="text-lg text-center">
            <h6 className='text-blue-800 font-bold text-2xl'>{statistic.title}</h6>
            <p className='text-blue-700'>{statistic.description}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

export default Statistics