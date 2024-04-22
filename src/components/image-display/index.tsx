import classNames from 'classnames'
import Image from 'next/image';
import React, {useState} from 'react'

function ImageDisplay({
  image,
  local = false,
  base64 = false,
  wrapperClasses = 'h-full relative',
  imageClasses
}: any) {
  const [isImageLoading, setLoading] = useState(true);
  const loaderProp =({ src}: {src: string}) => src;
  const getPath =() => {
    const basePath = process.env.APPLICATION_URL ? process.env.APPLICATION_URL : '';

    if(local) {
      return  image.path
    } else if(base64) {
      return image.path.startsWith("data:") ? image.path :`data:image/jpg;base64,${image.path}` 
    } else {
      return `${basePath}/assets/${image.id}`;
    }
  }

  return (
    <>
     {
      image ? (
        <span className={classNames('block', wrapperClasses)}>
          <Image 
            loader={loaderProp}
            src={getPath()} 
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
