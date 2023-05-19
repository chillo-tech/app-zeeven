import { ApplicationContext } from '@/context/ApplicationContext';
import { slugify } from '@/utils';
import Link from 'next/link'
import React, { useContext } from 'react'
import ImageDisplay from '../image-display';

function Solutions() {
  const context = useContext(ApplicationContext);
  const {
    state: { company },
  } = context;
  return (
    <section className='clear-both py-12 bg-app-blue text-white'>
      <div className="container text-center">
          <h2 className='flex flex-col font-bold text-5xl'>
            <span>
              Interagissez avec vos contacts
            </span>
          </h2>
          <p className='flex flex-col py-2 text-2xl'>
            <span>Gardez un lien avec vos contacts personnalisé</span>
            <span>via le canal de votre choix.</span>
          </p>
          <ul> 
          {company && company.categories ? (
              <>
                {company.categories.filter((category: any) => category.label === 'Canaux').map((category: any, index: number) => (
                  <div
                    className="logo flex flex-col"
                    key={slugify(`${category.id}-${category.label}`)}
                  >
                    {company && company.categories && company.categories[0].pages ? (
                      <ul className='flex justify-center gap-6 py-4 text-xl'> 
                        {company.categories[index].pages.map((page: any) => (
                          <li  key={slugify(`${page.page_id.id}-${page.page_id.label}`)}>
                            <Link href={slugify(`${page.page_id.id}-${page.page_id.label}`)} 
                                  className="flex items-center justify-between shadow-lg pr-6 py-1 text-black bg-white font-light rounded-md"
                            >
                                <ImageDisplay
                                  wrapperClasses = 'relative w-12 h-12 mr-4 ml-2 rounded-full'
                                  image={page.page_id.images[0].directus_files_id}/>
                              {page.page_id.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ): null }
                  </div>
                ))}
              </>
            ) : null}
          </ul>
      </div>
    </section>
  )
}

export default Solutions