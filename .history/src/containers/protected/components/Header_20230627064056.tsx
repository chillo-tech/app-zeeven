import { ACCOUNT_CATEGORIESLINKS } from '@/utils';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';
import { TfiPencilAlt2 } from 'react-icons/tfi';
function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className=" bg-white shadow-md">
      <div className="first">
        <div className="container mx-auto flex items-center justify-between border-b border-gray-200 py-4">
          <Link href="/" className={`block text-2xl !font-extrabold text-app-blue md:text-4xl`}>
            ZEEVEN
          </Link>
          <nav className='md:flex hidden'>
            <ul className="flex">
              <li>
                <Link
                  href="/nouvelle-campagne"
                  className={`flex items-center rounded-lg border-yellow-500 bg-yellow-400 px-3 py-1 text-app-blue md:px-5`}
                >
                  <TfiPencilAlt2 className="mr-2 hidden md:inline" /> Envoyer des messages
                </Link>
              </li>
            </ul>
          </nav>
          <ul className='md:flex flex hidden font-semibold text-app-blue'>
            <li>
              <button type="button" className="ml-2 block rounded-lg bg-white px-2 uppercase">
                {session?.user?.name?.substring(0, 2)}
              </button>
            </li>
            <li>
              <Link href="/contactez-nous" className="ml-2 block rounded-lg bg-white px-5">
                Des questions ?
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="ml-2 flex items-center rounded-lg border border-blue-900 px-5 text-app-blue"
              >
                Déconnexion <RiLogoutBoxRLine className="ml-3  text-app-blue" />
              </button>
            </li>
          </ul>

          <button
            onClick={toggle}
            className="bg-app-yellow text-app-brown flex items-center justify-center rounded-md font-semibold text-app-blue md:hidden"
          >
            <HiOutlineMenuAlt3 className="h-8 w-8" />
          </button>
        </div>
        <div className="second">
          <nav className="container mx-auto">
            <ul className="flex">
              {ACCOUNT_CATEGORIESLINKS.map((categoryLink, index) => (
                <li key={`link-${index}`}>
                  <Link
                    className={`block px-5 py-3 text-center text-gray-500 ${
                      router.pathname === categoryLink.url ? 'border-b-4 border-blue-900' : ''
                    }`}
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

      <nav
        className={`flex justify-between ${
          isOpen ? '' : 'hidden'
        } fixed left-0 top-0 z-10 h-screen w-full flex-col items-center gap-4 bg-app-blue pt-[20%] text-white`}
      >
        <p>
          <button
            onClick={toggle}
            className="border-app-black absolute top-[5%] rounded-full border-2 p-2"
          >
            <RxCross1 />
          </button>
        </p>
        <ul className="visible flex flex-col items-center gap-6 font-light md:hidden">
          <li>
            <Link
              href="/nouvelle-campagne"
              className={`flex items-center rounded-lg border-yellow-500 bg-yellow-400 px-3 py-1 text-app-blue md:px-5`}
            >
              <TfiPencilAlt2 className="mr-2 hidden md:inline" /> Envoyer des messages
            </Link>
          </li>
        </ul>
        <ul className="visible mb-20 flex items-center gap-6 font-light md:hidden">
          <li>
            <button
              type="button"
              onClick={() => router.push('/me')}
              className="ml-2 block h-10 w-10 rounded-full border border-white font-extrabold uppercase text-white"
            >
              {session?.user?.name?.substring(0, 2)}
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center"
            >
              <RiLogoutBoxRLine className="ml-3 text-3xl text-white" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
