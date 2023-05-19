import classNames from 'classnames'
import Image from 'next/image';
import React, {useState} from 'react'

function ImageDisplay({
  image,
  local = false,
  wrapperClasses = 'h-full relative',
  imageClasses
}: any) {
  
  const [isImageLoading, setLoading] = useState(true);

  const loaderProp =({ src}: {src: string}) => {
    return src;
  }
  return (
    <>
     {
      image ? (
        <span className={classNames('block', wrapperClasses)}>
        <Image 
          loader={loaderProp}
          src={`${local ? `${image.path}`: `${process.env.API_URL}/assets/${image.id}`}`} 
          alt={image.title} 
          unoptimized
          fill={true}
          className={
            classNames(
              imageClasses,
              isImageLoading
                ? 'scale-110 blur-2xl grayscale'
                : 'scale-100 blur-0 grayscale-0'
  
            )
          }
          onLoadingComplete={() => setLoading(false)}
        />
      </span>
      ) : null
     }
    </>
   
  )
}

export default ImageDisplay;
