import {signIn, signOut, useSession} from 'next-auth/react';
import Link from 'next/link'
import React from 'react'
import {CiLogin} from 'react-icons/ci';
import {AiOutlineMobile} from 'react-icons/ai';
import {TfiPencilAlt2} from 'react-icons/tfi';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import {useRouter} from 'next/router';

function NavBar() {
	const {data: session} = useSession();
	const router = useRouter();
	return (
		<header className={` bg-blue-900 flex justify-between items-center px-4 py-1 font-extralight`}>
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className={` text-white text-4xl py-3 !font-extrabold`}>
					ZEEVEN
				</Link>
				<nav className='hidden md:inline'>
					<ul className='flex items-center gap-2'>
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
                    <Link href="/contactez-nous" className={`yellow-button`}>
                      Inscription
                    </Link>
                  </li>
                  <li>
                    <button type="button" onClick={() => signIn()}
                        className={`yellow-button`}>
                      <CiLogin className='mr-2'/> Inscription
                    </button>
                  </li>
                </>
							)
						}

					</ul>
				</nav>
			</div>
		</header>
	)
}

export default NavBar
