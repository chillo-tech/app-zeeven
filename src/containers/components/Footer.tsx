import Link from 'next/link'
import React from 'react'
import { FaFacebookSquare,  FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

//const oswald = Oswald({weight:'700'});
function Footer() {
  return (
    <footer className='bg-blue-900 text-white text-2xl text-center md:text-left md:text-lg'>
      <div className="container mx-auto py-10 grid md:grid-cols-4 gap-6">
          <div className="logo">
            <Link href="/" className={` text-white text-4xl py-3 !font-extrabold`}>ZEEVEN</Link>
            <p className='pt-2'>Restez proche de vos contacts.</p>
            <p className='pb-2'>Ils adorent votre affection.</p>
          </div>
          <div className="logo flex flex-col text-xl">
            <h3 className='text-white pb-4'>Entreprise</h3>
            <Link href="/contactez-nous" className='text-slate-300 hover:text-white'>Contactez nous</Link>
            <Link href="/" className='py-2 text-slate-300 hover:text-white'>Grille des prix</Link>
            <Link href="https://chillo.tech/nos-postes" target="_blank" className={`text-slate-300 hover:text-white`}>
              Nous recrutons
            </Link>
          </div>
          <div className="logo flex flex-col text-xl">
            <h3 className='text-white pb-4'>Fonctionnalités</h3>
            <Link href="/contactez-nous" className='text-slate-300 hover:text-white'>Envoi des messages</Link>
          </div>
          <div className="logo flex flex-col text-xl">
            <h3 className='text-white pb-4'>Suivez nous</h3>
            <div className="flex justify-center items-center md:items-start md:justify-start">
              <Link href="/" className='text-slate-300 hover:text-white'>
                <FaFacebookSquare className='text-4xl mr-4'/>
              </Link>
              <Link href="/" className='text-slate-300 hover:text-white mr-2'>
                 <FaLinkedinIn color='text-slate-300' className='text-4xl'/>
              </Link>
              <Link target="_blank" href="https://wa.me/0033761705745" className='text-slate-300 hover:text-white mr-2'>
                 <FaWhatsapp color='text-slate-300' className='text-4xl'/>
              </Link>
            </div>
          </div>
      </div>
      <div className="container mx-auto text-center pt-5 pb-20 !font-extralight border-t border-slate-400 text-sm">
        &copy; Copyright {(new Date()).getFullYear()}
        <Link href="https://chillo.tech" target="_blank" className='mx-1 border-b border-white'>chillo.tech.</Link>
        Tous droits réservés.
      </div>
    </footer>
  )
}

export default Footer
