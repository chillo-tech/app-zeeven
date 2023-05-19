import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import StartConversation from '@/components/home-page/StartConversation';
import ImageDisplay from '@/components/image-display';
import OpenedLayout from '@/containers/opened';
import { ApplicationContext } from '@/context/ApplicationContext';
import { fetchData } from '@/services';
import { MENUFULL, URL_DATA, slugify } from '@/utils';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
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
        path: `backoffice/menus/${index}`,
        fields: MENUFULL,
      }),
    onSuccess: (data) => {
      setData(data.data.data);
      updateData({
        pageHeader: { images: data.data.data.images, titre: data.data.data.sous_libelle },
      });
    },
  });

  return (
    <>
      <Metadata entry={{ title: 'Nos Solutions' }} />
      <OpenedLayout>
        {data ? (
          <>
            {data.pages.map(({ page_id }: any, index: number) => {
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
                          path: `/images/${page_id.label}-message.png`,
                          title: 'Entammez vos échanges>avec ZEEVEN',
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
                          {page_id.label} dddd
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
          <div className="flex justify-center items-center h-screen dark:bg-app-black bg-app-white">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-yellow"></div>
          </div>
        )}
        <StartConversation />
      </OpenedLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { page } = params;

  return {
    props: {
      ...params,
      index: page.split('-')[0],
    },
  };
}

export default Espaces;
