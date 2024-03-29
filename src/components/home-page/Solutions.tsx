import { ApplicationContext } from '@/context/ApplicationContext';
import { slugify } from '@/utils';
import Link from 'next/link';
import { useContext } from 'react';
import ImageDisplay from '../image-display';
import Debug from '../shared/Debug';

function Solutions() {
  const context = useContext(ApplicationContext);
  const {
    state: { company },
  } = context;
  const getLink = (label: string) => {
    let link = slugify(label);
    if (link.indexOf('qr-code') > -1) {
      link = 'qr-code';
    } else {
      link = 'nouvelle-campagne';
    }
    return link;
  };
  return (
    <section className="clear-both bg-app-blue py-12 text-white">
      <div className="container text-center">
        <h2 className="flex flex-col text-5xl font-bold">
          <span>Interagissez avec vos contacts</span>
        </h2>
        <p className="flex flex-col py-2 text-2xl">
          <span>Gardez un lien avec vos contacts personnalisé</span>
          <span>via le canal de votre choix.</span>
        </p>
        {company && company.categories ? (
          <>
            {company.categories
              .filter((category: any) => category.label === 'Canaux')
              .map((category: any, index: number) => (
                <div
                  className="logo flex flex-col"
                  key={slugify(`${category.id}-${category.label}`)}
                >
                  {company && company.categories && company.categories[0].pages ? (
                    <ul className="flex flex-col justify-center gap-6 py-4 text-xl md:flex-row">
                      {company.categories[index].pages.map((page: any) => (
                        <li key={`${page.page_id.id}-${page.page_id.label}`} className="flex-1">
                          <Link
                            href={getLink(`${page.page_id.id}-${page.page_id.label}`)}
                            className="flex items-center justify-between rounded-md bg-white px-6 py-4 font-light text-black shadow-lg"
                          >
                            <span>{page.page_id.label}</span>
                            {page.page_id.images && (
                              <ImageDisplay
                                wrapperClasses="relative w-12 h-12 rounded-full overflow-hidden"
                                image={page.page_id.images[0].directus_files_id}
                              />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
          </>
        ) : null}
      </div>
    </section>
  );
}

export default Solutions;
