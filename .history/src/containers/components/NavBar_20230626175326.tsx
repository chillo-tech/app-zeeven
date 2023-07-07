import { ApplicationContext } from '@/context/ApplicationContext';
import { slugify } from '@/utils';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';

import { HiOutlineMenuAlt3 } from 'react-icons/hi';

function NavBar() {
  const context = useContext(ApplicationContext);
  const {
    state: { company },
  } = context;
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <header className={` flex items-center justify-between bg-blue-900 px-4 py-1 font-extralight`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className={` py-3 text-4xl !font-extrabold text-white`}>
          ZEEVEN
        </Link>
        {company && company.menus ? (
          <ul className=" hidden items-center gap-6 font-light md:flex text-xl ">
            {company.menus
              .filter(({ status }: any, index: number) => status === 'published')
              .map((menu: any) => (
                <li key={`meniu-${menu.id}`}>
                  <Link
                    href={'/' + slugify(`${menu.id}-${menu.label}`)}
                    className="flex items-center text-white"
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href='/contactez-nous' className="flex items-center text-white">
                Contactez nous
              </Link>
            </li>
          </ul>
        ) : null}
        <nav className="hidden md:inline">
          <ul className="flex items-center gap-6">
            {session ? (
              <>
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
              </>
            ) : (
              <>
                <li>
                  <button type="button" onClick={() => signIn()} className={`white-button`}>
                    Connexion
                  </button>
                </li>
                <li>
                  <Link href="/auth/register" type="button" className={`yellow-button`}>
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <button
          onClick={toggle}
          className="bg-app-yellow text-app-brown flex items-center justify-center rounded-md font-semibold text-white md:hidden"
        >
          <HiOutlineMenuAlt3 className="h-8 w-8" />
        </button>
      </div>
      <nav
        className={`flex justify-between ${
          isOpen ? '' : 'hidden'
        } fixed left-0 top-0 z-10 h-screen w-full flex-col items-center gap-4 bg-blue-900 pt-[20%] text-white`}
      >
        <p>
          <button
            onClick={toggle}
            className="border-app-black absolute top-[5%] rounded-full border-2 p-2"
          >
            <RxCross1 />
          </button>
        </p>
        <>
          {company && company.menus ? (
            <>
              <ul className="visible flex flex-col items-center gap-6 font-light md:hidden">
                {company.menus
                  .filter(({ status }: any, index: number) => status === 'published')
                  .map((menu: any) => (
                    <li key={`meniu-${menu.id}`}>
                      <Link
                        href={'/' + slugify(`${menu.id}-${menu.label}`)}
                        className="flex items-center text-xl text-white"
                      >
                        {menu.label}
                      </Link>
                    </li>
                  ))}
              </ul>
              <ul className="visible mb-20 flex items-center gap-6 font-light md:hidden">
                {session ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <li>
                      <button type="button" onClick={() => signIn()} className={`white-button`}>
                        Connexion
                      </button>
                    </li>
                    <li>
                      <Link href="/auth/register" type="button" className={`yellow-button`}>
                        Inscription
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </>
          ) : null}
        </>
      </nav>
    </header>
  );
}

export default NavBar;
