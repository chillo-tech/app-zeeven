import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import Link from 'next/link';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { string } from 'yup';

function AcheterUneOffre() {
  const text = "La solution de ZEEVEN nous a rendu la vie beaucoup plus facile. <br/> La création de codes QR est rapide L'envoi de messages est simple.<br /> Pouvoir suivre leurs performances s'est avéré essentiel pour notre entreprise."
  return (
    <>
    <Metadata entry={{title: "Validez votre commande"}}/>
      <section className="grid grid h-screen grid-cols-2 border-4 border-red-400">
        <div className="description bg-app-blue text-white justify-between flex flex-col">
          <Link href="/" className={`py-md-3 text-4xl !font-extrabold text-white`}>
            ZEEVEN
          </Link>
          <div className="text-xl font-light px-10">
            <RenderHtmlContent content={text} classes="text-white bg-white/20 rounded-xl p-6"/>
          </div>
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
        </div>
      </section>
    </>
  );
}

export default AcheterUneOffre;
