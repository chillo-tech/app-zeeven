import Image from 'next/image'
import React, { useState } from 'react'
import { DESCRIPTION } from '../../utils/data'
import { Oswald } from '@next/font/google'
const oswald = Oswald({weight:'700'});
function Description() {
  const [isLoading, setLoading] = useState(true);
  const cn = (...classes: string[]) =>{
    return classes.filter(Boolean).join(' ')
  }
  const loaderProp =({ src }: {src: string}) => {
    return src;
  }
  return (
    <section className="bg-yellow-50 py-10">
    <div className={`container mx-auto grid gap-3 md:grid-cols-${DESCRIPTION.length}`}>
      {DESCRIPTION.map((description, index) => (
        <article className='flex flex-col items-center mx-2 bg-slate-100 rounded-lg' key={`description-${index}`}>
          <div className='w-full h-72 relative'>
            <Image 
              fill={true}
              src={`/images/description/${description.image}`}
              alt={`${description.title}`}
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
          <div className="text-2xl py-4">
            <h6 className={`${oswald.className} text-blue-800 font-extrabold text-2xl text-center`}>{description.title}</h6>
          </div>
        </article>
      ))}
    </div>
    </section>
  )
}

export default Description