import React from 'react'
import {useRouter} from "next/router";
import OpenedLayout from '@/containers/opened';

function PageNotFound() {
	const router = useRouter();
  const goToHomePage = () => {
		router.push('/');
	}
  return (
    <OpenedLayout>
        <section className='container mx-auto py-32 md:my-auto flex flex-col justify-center'>
          <div className='bg-white p-5 rounded-xl text-app-blue text-lg w-3/4 mx-auto'>
            <p className='text-center my-5'>Désolé, une erreur est survenue</p>
            <p className='text-center my-5'>
              <button onClick={goToHomePage}
                  className="mr-2 w-3/4 mx-auto border border-blue-800 hover:border-blue-800 text-app-blue font-light py-2 px-4 rounded-lg shadow-sm">
                    Retourner  à l&apos;accueil
              </button>
            </p>
          </div>
        </section>
    </OpenedLayout>
  )
}

export default PageNotFound
