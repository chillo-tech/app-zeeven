import Metadata from '@/components/Metadata';
import Link from 'next/link';
import { string } from 'yup';

function AcheterUneOffre() {
  text: string = "La solution de Beaconstac nous a rendu la vie beaucoup plus facile. La création de codes QR est rapide et pouvoir suivre leurs performances s'est avéré essentiel pour notre entreprise."
  return (
    <>
    <Metadata entry={{title: "Validez votre commande"}}/>
      <section className="grid grid h-screen grid-cols-2 border-4 border-red-400">
        <div className="description bg-app-blue pl-10 pt-6 text-white">
          <Link href="/" className={`py-md-3 text-4xl !font-extrabold text-white`}>
            ZEEVEN
          </Link>
          
          <span />
        </div>
      </section>
    </>
  );
}

export default AcheterUneOffre;
