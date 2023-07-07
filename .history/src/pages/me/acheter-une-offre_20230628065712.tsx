import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import Link from 'next/link';
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
          <div className="rounded-xl bg-white/20 p-8 text-2xl font-light">
            <RenderHtmlContent content={text} classes="text-white"/>
          </div>
          <span />
        </div>
      </section>
    </>
  );
}

export default AcheterUneOffre;
