import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'
import NavBar from '@/containers/components/NavBar';
import Statistics from './Statistics';
import classNames from 'classnames';
import { BiArrowFromRight } from 'react-icons/bi';
import { BsArrowBarRight, BsArrowRight } from 'react-icons/bs';

function Hero() {
	const [isLoading, setLoading] = useState(true);
	const cn = (...classes: string[]) => {
		return classes.filter(Boolean).join(' ')
	}
	const loaderProp = ({src}: { src: string }) => {
		return src;
	}
	return (
    <>	
    <Head>
      <title>Informez nos contacts de vos évènements</title>
      <meta name="description" content="Informez nos contacts de vos évènements"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
    <section className='bg-white'>
			<div className="">
				<NavBar/>
			</div>
      <div className="container rounded-lg my-4 grid md:grid-cols-2 gap-4 bg-white">
        <article className="flex flex-col items-start md:py-24 py-10">
          <h1 className='text-blue-900 text-3xl md:text-4xl flex flex-col font-extrabold'>
            <span>Informez vos contacts.</span>
            <span>Ils apprécient votre affection.</span>
          </h1>
          <h4 className='text-blue-900 flex flex-col font-extralight py-2 md:my-3'>
            <span className='mb-1'>Ne perdez plus le temps à écrire à chacun de vos contacts</span>
            <span className='mb-1'>ZEEVEN permet de personnaliser les communications que vous engagiez vos contacts.</span>
            <span className='mb-1'>Recevez les statistiques et suivez vos messages</span>
          </h4>
          <p className='flex gap-6 items-center justify-center'>
            <Link href="/create-campain" className={classNames('yellow-button')} >
              Envoyez votre premier message <BsArrowRight className='ml-4' />
            </Link>
            <Link href="/contactez-nous" className={classNames('blue-link', 'underline')}>
              Demandez une démo
            </Link>
          </p>
        </article>
        <article className='relative px-6'>
           <div className="relative w-full md:h-full h-72">
            <Image
								priority={true}
								fill={true}
								src={`/images/zeeven.png`}
								alt="Ecrivez un applicationMessage et transmettez le à tout le monde, sur plusieurs canaux"
								loader={loaderProp}
								unoptimized={true}
								className={cn(
									'rounded-md duration-700 ease-in-out group-hover:opacity-75 object-contain',
									isLoading
										? 'scale-110 blur-2xl grayscale'
										: 'scale-100 blur-0 grayscale-0'
								)}
								onLoadingComplete={() => setLoading(false)}
							/>
            </div>
        </article>
        <div className="md:col-span-2">
          <Statistics/>
        </div>
      </div>
    </section>
    </>
	)
}

export default Hero;
