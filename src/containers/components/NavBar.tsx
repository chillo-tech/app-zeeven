import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'
import { CiLogin } from 'react-icons/ci';
import { AiOutlineMobile } from 'react-icons/ai';
import { TfiPencilAlt2 } from 'react-icons/tfi';

function NavBar() {
  useSession();
  return (
    <header className={` bg-blue-900 flex justify-between items-center px-4 py-1 font-extralight`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className={` text-white text-4xl py-3 !font-extrabold`}>
          ZEEVEN
        </Link>
        <nav>
          <ul className='flex'>
            <li>
            <Link href="/create-campain" className={`flex items-center bg-yellow-400 text-blue-900 border-yellow-500 py-1 rounded-lg px-3 md:px-5`}>
              <TfiPencilAlt2 className='mr-2 hidden md:inline'/> Envoyer des messages
            </Link>
            </li>
          </ul>
        </nav>
        <nav className='hidden md:inline'>
          <ul className='flex items-center '>
            <li>
            <Link href="/contact-us" className={`flex items-center font-extralight bg-yellow-400 text-blue-800 py-1 border border-yellow-500 rounded-lg px-5`}>
              <AiOutlineMobile className='mr-2'/> Demandez une démo
            </Link>
            </li>
            <li>
            <button type="button" onClick={() => signIn()} className={`md:m-2 flex items-center font-extralight text-white border border-withe py-1 rounded-lg px-5`}>
              <CiLogin className='mr-2' /> Connexion / Inscription
            </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
