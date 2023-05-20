import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { TfiPencilAlt2 } from 'react-icons/tfi';
import {ACCOUNT_CATEGORIESLINKS} from '@/utils';
function Header() {
  const {data: session} = useSession();
  const router = useRouter();

  return (
    <header className=' bg-white shadow-md'>
      <div className="first">
        <div className="container py-4 mx-auto flex justify-between items-center border-b border-gray-200">
        <Link href="/" className={`block text-blue-900 text-4xl !font-extrabold`}>
          ZEEVEN
        </Link>
        <nav>
          <ul className='flex'>
            <li>
            <Link href="/nouvelle-campagne" className={`flex items-center bg-yellow-400 text-blue-900 border-yellow-500 py-1 rounded-lg px-3 md:px-5`}>
              <TfiPencilAlt2 className='mr-2 hidden md:inline'/> Envoyer des messages
            </Link>
            </li>
          </ul>
        </nav>
        <ul className='flex text-blue-900 font-semibold'>
          <li>
            <button type="button" className='block ml-2 uppercase bg-white rounded-lg px-2'>
              {session?.user?.name?.substring(0, 2)}
            </button>
          </li>
          <li>
            <Link href="/contactez-nous" className='block ml-2 bg-white rounded-lg px-5'>
              Des questions ?
            </Link>
          </li>
          <li>
            <button type='button' onClick={()=>signOut({callbackUrl: '/'})} className='ml-2 flex items-center text-blue-900 rounded-lg px-5 border border-blue-900'>
              Déconnexion <RiLogoutBoxRLine className="text-blue-900  ml-3" />
            </button> 
          </li>
        </ul>
        </div>
        <div className="second">
          <nav className="container mx-auto">
            <ul className='flex'>
              {ACCOUNT_CATEGORIESLINKS.map((categoryLink, index)=> (
                <li key={`link-${index}`}>
                  <Link 
                    className={`px-5 text-gray-500 py-3 text-center block ${router.pathname === categoryLink.url ? 'border-b-4 border-blue-900': ''}`} 
                    href={categoryLink.url}
                    >
                    {categoryLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header