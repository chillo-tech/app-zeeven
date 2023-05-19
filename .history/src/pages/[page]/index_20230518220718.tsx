import Metadata from '@/components/Metadata';
import OpenedLayout from '@/containers/opened';
import { ApplicationContext } from '@/context/ApplicationContext';
import { fetchData } from '@/services';
import { MENUFULL, URL_DATA } from '@/utils';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

function Espaces({index}: any) {
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
      updateData({pageHeader: {images: data.data.data.images, titre:  data.data.data.sous_libelle}})
    },
  });

  return (
    <>
      <Metadata entry={{title: 'Nos Solutions'}}/>
      <OpenedLayout>
        { data ? (
          <section className='container grid gap-6 py-4'>
            {data.pages
            .map(({page_id}: any, index: number) => {
              return (
               <section key={`page-${page_id.id}`}>
                <p href={slugify(`${page.page_id.id}-${page.page_id.label}`)} 
                                  className="flex items-center justify-between shadow-lg pr-6 py-1 text-black bg-white font-light rounded-md hover:text-white"
                            >
                                <ImageDisplay
                                  wrapperClasses = 'relative w-12 h-12 mr-4 ml-2'
                                  image={page.page_id.images[0].directus_files_id}/>
                              {page.page_id.label}
                            </p>
                <pre>{JSON.stringify(page_id, null, 2)}</pre>
               </section>
              );
            })}
          </section>
        ) : (
          <div className="flex justify-center items-center h-screen dark:bg-app-black bg-app-white">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-yellow"></div>
          </div>
        )}
      </OpenedLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const {page} = params;
  
  return {
    props: {
      ...params,
      index: page.split('-')[0]
    }
  };
}

export default Espaces;

