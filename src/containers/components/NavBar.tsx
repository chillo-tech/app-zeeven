import Link from 'next/link'
import React from 'react'
import { Oswald } from '@next/font/google'
const oswald = Oswald({weight:'700'});

function NavBar() {
  return (
    <header className={` bg-blue-900 flex justify-between items-center px-4 py-1`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className={`${oswald.className} text-white text-4xl py-3 !font-extrabold`}>
          ZEEVEN
        </Link>
        <nav>
          <ul className='flex'>
            <li>
            <Link href="/create-campain" className={`bg-yellow-500 text-blue-900 border-yellow-500 text-lg py-2 rounded-lg px-5`}>
              Envoyer un message
            </Link>
            </li>
          </ul>
        </nav>
        <nav className='hidden md:inline'>
          <ul className='flex'>
            <li>
            <Link href="https://chillo.tech/nos-postes" target="_blank" className={`font-normal text-white text-lg py-1 px-5`}>
              Nous recrutons
            </Link>
            </li>
            <li>
            <Link href="/contact-us" className={`font-normal bg-yellow-500 text-blue-800 text-lg py-1 border border-yellow-500 rounded-lg px-5`}>
              Contactez nous
            </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
