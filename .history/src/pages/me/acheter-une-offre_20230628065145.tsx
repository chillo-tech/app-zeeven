import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import Link from 'next/link';
import { string } from 'yup';

function AcheterUneOffre() {
  const text = "La solution de ZEEVEN nous a rendu la vie beaucoup plus facile. <br/> La création de codes QR est rapide L'envoi de messages est simple et pouvoir suivre leurs performances s'est avéré essentiel pour notre entreprise."
  return (
    <>
    <Metadata entry={{title: "Validez votre commande"}}/>
      <section className="grid grid h-screen grid-cols-2 border-4 border-red-400">
        <div className="description bg-app-blue pl-10 pt-6 text-white">
          <Link href="/" className={`py-md-3 text-4xl !font-extrabold text-white`}>
            ZEEVEN
          </Link>
          <div className="rounded-xl">
            <RenderHtmlContent content={text}/>
          </div>
          <span />
        </div>
      </section>
    </>
  );
}

export default AcheterUneOffre;
