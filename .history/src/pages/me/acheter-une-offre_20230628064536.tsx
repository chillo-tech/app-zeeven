import Link from 'next/link'
import React from 'react'

function AcheterUneOffre() {
  return (
    <section className='h-screen grid border-4 border-red-400 grid grid-cols-2'>

      <div className="description bg-app-blue text-white pt-10">
        <Link href="/" className={`py-3 text-4xl !font-extrabold text-white`}>
            ZEEVEN
          </Link>
      </div>
    </section>
  )
}

export default AcheterUneOffre
