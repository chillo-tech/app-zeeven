import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import ImageDisplay from '@/components/image-display';
import SectionLinks from '@/components/shared/SectionLinks';
import OpenedLayout from '@/containers/opened';
import { ApplicationContext } from '@/context/ApplicationContext';
import { fetchData, handleError } from '@/services';
import { MENUFULL, slugify } from '@/utils';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';

function Espaces({ index }: any) {
  const context = useContext(ApplicationContext);
  const { updateData } = context;
  const router = useRouter();
  const [data, setData] = useState<any>();
  useQuery<any>({
    queryKey: ['menu', index],
    enabled: !!index,
    queryFn: () =>
      fetchData({
        path: `/api/backoffice/menus/${index}`,
        fields: MENUFULL,
      }),
    onError: handleError,
    onSuccess: (data) => {
      setData(data.data.data);
      updateData({
        pageHeader: { images: data.data.data.images, titre: data.data.data.sous_libelle },
      });
    },
  });
  return (
    <>
      <OpenedLayout>
      <Metadata entry={{ title: 'ZEEEN | Nos Solutions' }} />
        {data ? (
          <>
            {data.pages.map(({ page_id }: any, index: number) => {
              return (
                <section
                  className={classNames({ 'bg-white': index % 2 === 0 })}
                  key={`page-${page_id.id}-${index}`}
                  id={`#${slugify(page_id.label)}`}
                >
                  <div className={classNames(
                    "container flex items-center gap-12 flex-col py-4",
                    {"md:flex-row-reverse": index % 2 === 0  },
                    {"md:flex-row": index % 2 === 1  }
                  )}>
                    <div className="relative w-full h-96 flex-1">
                    <ImageDisplay
                            wrapperClasses="relative w-full h-96"
                            imageClasses= 'object-cover'
                            image={page_id.images[1].directus_files_id}
                          />
                    </div>
                    <div className='flex-1'>
                      <p className="flex">
                        <span className="flex items-center justify-between pr-10 py-1 text-black font-light rounded-md">
                          <ImageDisplay
                            wrapperClasses="relative w-8 h-8 mr-2"
                            
                            image={page_id.images[0].directus_files_id}
                          />
                          <span className="text-xl">{page_id.label}</span>
                        </span>
                      </p>
                      <RenderHtmlContent
                        content={page_id.sublabel}
                        classes="flex flex-col py-3 text-[1.8rem] font-bold leading-8"
                      />
                      <RenderHtmlContent content={page_id.abstract} classes="flex flex-col mb-4" />
                      {page_id.label ? (): (<SectionLinks />)}
                    </div>
                  </div>
                </section>
              );
            })}
            {data.categories.map(({ page_id }: any, index: number) => {
              return (
                <section
                  className={classNames({ 'bg-white': index % 2 === 0 })}
                  key={`page-${page_id.id}-${index}`}
                  id={`#${slugify(page_id.label)}`}
                >
                  <div className="container flex items-center gap-12 py-10">
                    <div className="relative w-96 h-96">
                      <ImageDisplay
                        wrapperClasses="h-full rounded-full border-8 border-app-blue relative overflow-hidden shadow-lg"
                        imageClasses= 'object-contain'
                        local={true}
                        image={{
                          path: `/images/${slugify(page_id.label.toLowercase())}-message.png`,
                          title: 'Entammez vos échanges >avec ZEEVEN',
                        }}
                      />
                    </div>
                    <div>
                      <p className="flex">
                        <span className="flex items-center justify-between pr-10 py-1 text-black font-light rounded-md">
                          <ImageDisplay
                            wrapperClasses="relative w-12 h-12 mr-4 ml-2"
                            image={page_id.images[0].directus_files_id}
                          />
                          {page_id.label}
                        </span>
                      </p>
                      <RenderHtmlContent
                        content={page_id.sublabel}
                        classes="flex flex-col py-3 text-[1.8rem]"
                      />
                      <RenderHtmlContent content={page_id.abstract} classes="flex flex-col" />
                    </div>
                  </div>
                </section>
              );
            })}
          </>
        ) : (
          null
        )}
      </OpenedLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { category } = params;

  return {
    props: {
      ...params,
      index: category.split('-')[0],
    },
  };
}

export default Espaces;
