import RenderHtmlContent from '@/components/RenderHtmlContent';
import { ApplicationContext } from '@/context/ApplicationContext';
import { fetchData } from '@/services';
import { ENTREPRISE, getUrl, slugify } from '@/utils';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { useQuery } from 'react-query';
//const oswald = Oswald({weight:'700'});
function Footer() {
  const context = useContext(ApplicationContext);

  const getLabel = (label: string) => {
    if (label.toLowerCase() === 'canaux') return 'solutions';
    return label;
  };

  const {
    updateData,
    state: { company },
  } = context;
  useQuery<any>({
    queryKey: ['entreprises'],
    enabled: !company,
    queryFn: () =>
      fetchData({
        path: '/api/backoffice/company',
        fields: ENTREPRISE,
      }),
    onSuccess: (data) => {
      updateData({ company: data.data.data });
    },
  });
  return (
    <>
      {company ? (
        <footer className="bg-app-blue text-center text-sm text-white md:text-left md:text-lg">
          <div className="container mx-auto grid gap-6 py-10 md:grid-cols-4">
            <div className="logo">
              <Link href="/" className={` py-3 text-4xl !font-extrabold text-white`}>
                ZEEVEN
              </Link>
              <RenderHtmlContent content={company.abstract} classes="my-5" />
              <div className="flex items-center justify-center md:items-start md:justify-start">
                <Link
                  href="https://www.facebook.com/Chillotech-103869952427034"
                  className="text-slate-300 hover:text-white"
                >
                  <FaFacebookSquare className="mr-4 text-4xl" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/86905161"
                  className="mr-2 text-slate-300 hover:text-white"
                >
                  <FaLinkedinIn color="text-slate-300" className="text-4xl" />
                </Link>
                <Link
                  target="_blank"
                  href="https://wa.me/0033761705745"
                  className="mr-2 text-slate-300 hover:text-white"
                >
                  <FaWhatsapp color="text-slate-300" className="text-4xl" />
                </Link>
              </div>
            </div>
            {company && company.categories ? (
              <>
                {company.categories
                  .filter(({ status }: any, index: number) => status === 'published')
                  .map((category: any, index: number) => (
                    <div
                      className="logo flex flex-col"
                      key={slugify(`${category.id}-${category.label}`)}
                    >
                      <h3 className="mb-3 text-xl text-white">{category.label}</h3>
                      {company && company.categories && company.categories[0].pages ? (
                        <ul>
                          {company.categories[index].pages.map((page: any) => (
                            <li
                              key={slugify(`${page.page_id.id}-${page.page_id.label}`)}
                              className="mb-2"
                            >
                              <Link
                                href={`/${getUrl({current: `1-nos-solutions`, url: 'qr-code'})}`}
                                className="text-slate-300 hover:text-white"
                              >
                                {page.page_id.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
              </>
            ) : null}
            <div className="logo flex flex-col">
              <h3 className="pb- mb-3 text-xl text-white">Fonctionnalités</h3>
              <Link href="/nouvelle-campagne" className="mb-2 text-slate-300 hover:text-white">
                Envoi des messages
              </Link>
              <button
                type="button"
                onClick={() => signIn()}
                className="mb-2 text-slate-300 hover:text-white md:text-left"
              >
                Statistiques de vos messages
              </button>
              <Link href="/qr-code" className="mb-2 text-slate-300 hover:text-white">
                Générez des QR code
              </Link>
            </div>
            <div className="logo flex flex-col">
              <h3 className="mb-3 text-xl text-white">Entreprise</h3>
              <Link href="/contactez-nous" className="mb-2 text-slate-300 hover:text-white">
                Contactez nous
              </Link>
              <Link href="/contactez-nous" className="mb-2 text-slate-300 hover:text-white">
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
          <div className="container mx-auto border-t border-slate-400 pb-20 pt-5 text-center text-sm !font-extralight">
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
