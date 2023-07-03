import Image from 'next/image';
import React, { useState } from 'react'
import { EmptyPage } from '@/types/EmptyPage';
import { cn, loaderProp } from '@/utils/image-loader';
import formStyles from '@/styles//Form.module.css'
function Empty(params: EmptyPage) {
  const [isLoading, setLoading] = useState(true);
  return (
    <article className='flex flex-col justify-center items-center py-8'>
      <div className="md:w-1/2 mx-auto text-center" >
        <div className="py-2 relative flex  fle-col items-center justify-center">
        <Image 
                 width="150" height="150"
                src={`/images/commons/empty.png`}
                alt= {params.firstMessage}
                loader={loaderProp}
                unoptimized={true}
                className={cn(
                  'rounded-md duration-700 ease-in-out group-hover:opacity-75',
                  isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
                )}
                onLoadingComplete={() => setLoading(false)}
              />
        </div>
        <h3 className="py-4 text-app-blue font-semibold text-xl">
          {params.firstMessage}
        </h3>
        <div className="pb-4 text-gray-600 text-lg">
          {params.secondMessage}
        </div>
        <p>
          <button className={`${formStyles.form_control__button} w-auto`} type='button' onClick={params.button.action}>
            {params.button.label}
          </button>
        </p>
      </div>
    </article>
  )
}

export default Empty;