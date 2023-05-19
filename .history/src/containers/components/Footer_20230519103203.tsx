import RenderHtmlContent from '@/components/RenderHtmlContent';
import { ApplicationContext } from '@/context/ApplicationContext';
import { slugify } from '@/utils';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

//const oswald = Oswald({weight:'700'});
function Footer() {
  const context = useContext(ApplicationContext);
  const {
    state: { company },
  } = context;

  const getLabel = (label: string) => {
    let link = slugify(label);
    if(link.indexOf('qr-code') > -1) {
      link = "qr-code";
    }
    return link;
  }
  return (
    <>
      {company ? (
        <footer className="bg-blue-900 text-white text-sm text-center md:text-left md:text-lg">
          <div className="container mx-auto py-10 grid md:grid-cols-5 gap-6">
            <div className="logo">
              <Link href="/" className={` text-white text-4xl py-3 !font-extrabold`}>
                ZEEVEN
              </Link>
              <RenderHtmlContent content={company.abstract} classes="my-5" />
              <div className="flex justify-center items-center md:items-start md:justify-start">
                <Link href="/" className="text-slate-300 hover:text-white">
                  <FaFacebookSquare className="text-4xl mr-4" />
                </Link>
                <Link href="/" className="text-slate-300 hover:text-white mr-2">
                  <FaLinkedinIn color="text-slate-300" className="text-4xl" />
                </Link>
                <Link
                  target="_blank"
                  href="https://wa.me/0033761705745"
                  className="text-slate-300 hover:text-white mr-2"
                >
                  <FaWhatsapp color="text-slate-300" className="text-4xl" />
                </Link>
              </div>
            </div>
            {company && company.categories ? (
              <>
                {company.categories.map((category: any, index: number) => (
                  <div
                    className="logo flex flex-col"
                    key={slugify(`${category.id}-${category.label}`)}
                  >
                    <h3 className="text-white mb-3 text-xl">{category.label}</h3>
                    {company && company.categories && company.categories[0].pages ? (
                      <ul> 
                        {company.categories[index].pages.map((page: any) => (
                          <li  key={slugify(`${page.page_id.id}-${page.page_id.label}`)} className='mb-2'>
                            <Link href={slugify(`${category.id}-${getLabel(category.label)}#${page.page_id.label}`)} className="text-slate-300 hover:text-white">
                              {page.page_id.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ): null }
                  </div>
                ))}
              </>
            ) : null}
            <div className="logo flex flex-col">
              <h3 className="text-white pb- text-xl mb-3">Fonctionnalités</h3>
              <Link href="/nouvelle-campagne" className="text-slate-300 hover:text-white mb-2">
                Envoi des messages
              </Link>
              <Link href="/nouvelle-campagne" className="text-slate-300 hover:text-white mb-2">
                Statistiques de vos messages
              </Link>
              <Link href="/generez-des-qr-code" className="text-slate-300 hover:text-white mb-2">
                Générez des QR code
              </Link>
            </div>
            <div className="logo flex flex-col">
              <h3 className="text-white mb-3 text-xl">Entreprise</h3>
              <Link href="/contactez-nous" className="text-slate-300 hover:text-white mb-2">
                Contactez nous
              </Link>
              <Link href="/" className="text-slate-300 hover:text-white mb-2">
                Grille des prix
              </Link>
              <Link
                href="https://chillo.tech/nos-postes"
                target="_blank"
                className={`text-slate-300 hover:text-white`}
              >
                Nous recrutons
              </Link>
            </div>
          </div>
          <div className="container mx-auto text-center pt-5 pb-20 !font-extralight border-t border-slate-400 text-sm">
            &copy; Copyright {new Date().getFullYear()}
            <Link href="https://chillo.tech" target="_blank" className="mx-1 border-b border-white">
              chillo.tech.
            </Link>
            Tous droits réservés.
          </div>
        </footer>
      ) : null}
    </>
  );
}

export default Footer;
