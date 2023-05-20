import {signIn, signOut, useSession} from 'next-auth/react';
import Link from 'next/link'
import React, { useContext } from 'react'
import {RiLogoutBoxRLine} from 'react-icons/ri';
import {useRouter} from 'next/router';
import { ApplicationContext } from '@/context/ApplicationContext';
import { slugify } from '@/utils';import { RxCross1 } from 'react-icons/rx';

import { HiOutlineMenu, HiOutlineMenuAlt2, HiPhone } from 'react-icons/hi';

function NavBar() {

  const context = useContext(ApplicationContext);
  const { state: {company} } = context;
	const {data: session} = useSession();
	const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
	return (
		<header className={` bg-blue-900 flex justify-between items-center px-4 py-1 font-extralight`}>
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className={` text-white text-4xl py-3 !font-extrabold`}>
					ZEEVEN
				</Link>
        {
          company && company.menus  ?(
              <ul className='flex items-center gap-6 font-light hidden md:visible'>
                {company.menus.map( (menu: any) => (
                  <li key={`meniu-${menu.id}`}>
                    <Link href={slugify(`${menu.id}-${menu.label}`)} className='flex items-center text-white text-xl'>
                      {menu.label}
                    </Link>
                  </li>
                ))}
              </ul>
          ): null
        }
				<nav className='hidden md:inline'>
					<ul className='flex items-center gap-6'>
						{
							session ? (
								<>
									<li>
										<button type="button" onClick={() => router.push('/me')}
												className='block ml-2 uppercase text-white border rounded-full w-10 h-10 border-white font-extrabold'>
											{session?.user?.name?.substring(0, 2)}
										</button>
									</li>
									<li>
										<button type='button' onClick={() => signOut({callbackUrl: '/'})}
												className='flex items-center'>
											<RiLogoutBoxRLine className="text-white ml-3 text-3xl"/>
										</button>
									</li>
								</>
							) : (
                <>
                  <li>
                    <button type="button" onClick={() => signIn()}
                        className={`white-button`}>
                       Connexion
                    </button>
                  </li>
                  <li>
                    <Link href="/auth/register" type="button"
                        className={`yellow-button`}>
                       Inscription
                    </Link>
                  </li>
                </>
							)
						}

					</ul>
				</nav>
        <button
            onClick={toggle}
            className="text-white md:hidden flex justify-center items-center rounded-md bg-app-yellow text-app-brown font-semibold">
            <HiOutlineMenu className="w-8 h-8" />
          </button>
			</div>
      <nav
          className={`flex ${
            isOpen ? '' : 'hidden'
          } w-full h-screen fixed z-10 top-0 left-0 bg-blue-900 text-white flex-col pt-[20%] items-center gap-4`}>
          <button
            onClick={toggle}
            className="rounded-full p-2 absolute top-[5%] border-2 border-app-black">
            <RxCross1 />
          </button>
          <>
          {
            company && company.menus  ?(
                <ul className='flex flex-col items-center gap-6 font-light visible md:hidden'>
                  {company.menus.map( (menu: any) => (
                    <li key={`meniu-${menu.id}`}>
                      <Link href={slugify(`${menu.id}-${menu.label}`)} className='flex items-center text-white text-xl'>
                        {menu.label}
                      </Link>
                    </li>
                  ))}
                  {
							session ? (
								<>
									<li>
										<button type="button" onClick={() => router.push('/me')}
												className='block ml-2 uppercase text-white border rounded-full w-10 h-10 border-white font-extrabold'>
											{session?.user?.name?.substring(0, 2)}
										</button>
									</li>
									<li>
										<button type='button' onClick={() => signOut({callbackUrl: '/'})}
												className='flex items-center'>
											<RiLogoutBoxRLine className="text-white ml-3 text-3xl"/>
										</button>
									</li>
								</>
							) : (
                <>
                  <li>
                    <button type="button" onClick={() => signIn()}
                        className={`white-button`}>
                       Connexion
                    </button>
                  </li>
                  <li>
                    <Link href="/auth/register" type="button"
                        className={`yellow-button`}>
                       Inscription
                    </Link>
                  </li>
                </>
							)
						}
                </ul>
            ): null
          }
          </>
        </nav>
		</header>
	)
}

export default NavBar
