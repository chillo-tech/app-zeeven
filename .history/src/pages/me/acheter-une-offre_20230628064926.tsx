import Metadata from '@/components/Metadata';
import Link from 'next/link';

function AcheterUneOffre() {
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
