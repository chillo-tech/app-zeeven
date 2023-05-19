import Link from 'next/link'
import React from 'react'

function Solutions() {
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
                        {company.categories[index].pages.map((page: any) => (
                          <li  key={slugify(`${page.page_id.id}-${page.page_id.label}`)} className='mb-2'>
                            <Link href={slugify(`${page.page_id.id}-${page.page_id.label}`)} className="text-slate-300 hover:text-white">
                              {page.page_id.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
      </div>
    </section>
  )
}

export default Solutions