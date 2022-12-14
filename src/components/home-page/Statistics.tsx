import Image from 'next/image'
import React from 'react'
import { STATISTICS } from '../../utils/data'

function Statistics() {
  return (
    <section className={`container mx-auto grid md:gap-36 md:grid-cols-${STATISTICS.length}`}>
      {STATISTICS.map((statistic, index) => (
        <article className='py-3 mx-10 md:mx-0 flex items-center' key={`statistic-${index}`}>
          <Image src={`/images/statistics/${statistic.image}`} width="50" height="50" alt={`${statistic.title} ${statistic.description}`}/>
          <div className="text-lg ml-6">
            <h6 className='text-blue-800'>{statistic.title}</h6>
            <p>{statistic.description}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

export default Statistics