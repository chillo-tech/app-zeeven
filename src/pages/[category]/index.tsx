import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import ImageDisplay from '@/components/image-display';
import SectionLinks from '@/components/shared/SectionLinks';
import OpenedLayout from '@/containers/opened';
import { ApplicationContext } from '@/context/ApplicationContext';
import { fetchData, handleError } from '@/services';
import { MENUFULL, getUrl, slugify } from '@/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
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
        path: `/api/backoffice/menu/${index}`,
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
        <Metadata entry={{ title: data?.label }} />
        {data ? (
          <>
            {data.pages
              ? data.pages.map(({ page_id }: any, index: number) => {
                  return (
                    <section
                      className={classNames('py-4',{ 'bg-white': index % 2 === 0 })}
                      key={`page-${page_id.id}-${index}`}
                      id={`#${slugify(page_id.label)}`}
                    >
                      <div
                        className={classNames(
                          'container flex flex-col items-center gap-12 py-4',
                          { 'md:flex-row-reverse': index % 2 === 0 },
                          { 'md:flex-row': index % 2 === 1 }
                        )}
                      >
                        {(page_id.images && page_id.images.length && page_id.images.length > 1) ? (
                          <div className="relative h-96 w-full flex-1">
                            <ImageDisplay
                              wrapperClasses="relative w-full h-96"
                              imageClasses="object-cover"
                              image={page_id.images[1].directus_files_id}
                            />
                          </div>
                        ) : null}
                        <div className="flex-1">
                          {page_id.images && page_id.images.length ? (
                            <p className="flex">
                              <span className="flex items-center justify-between rounded-md py-1 pr-10 font-light text-black">
                                <ImageDisplay
                                  wrapperClasses="relative w-8 h-8 mr-2"
                                  image={page_id.images[0].directus_files_id}
                                />
                                <span className="text-xl">{page_id.sublabel}</span>
                              </span>
                            </p>
                          ) : null}

                         <h2
                            className="flex flex-col text-[1.8rem] font-bold leading-8"
                          > {page_id.label}</h2>
                          <RenderHtmlContent
                            content={page_id.abstract}
                            classes="flex flex-col py-4"
                          />
                          <RenderHtmlContent
                            content={page_id.description}
                            classes="flex flex-col py-4"
                          />
                          {getUrl({ current: page_id.label, url: 'qr-code' }).indexOf('qr-code') >
                          -1 ? (
                            <Link href="/qr-code" className={classNames('blue-link', 'underline')}>
                              Générez un QR CODE <BsArrowRight className="ml-4" />
                            </Link>
                          ) : (
                            <SectionLinks />
                          )}
                        </div>
                      </div>
                    </section>
                  );
                })
              : null}
            {data.categories
              ? data.categories.map(({ page_id }: any, index: number) => {
                  return (
                    <section
                      className={classNames({ 'bg-white': index % 2 === 0 })}
                      key={`page-${page_id.id}-${index}`}
                      id={`#${slugify(page_id.label)}`}
                    >
                      <div className="container flex items-center gap-12 py-10">
                        <div className="relative h-96 w-96">
                          <ImageDisplay
                            wrapperClasses="h-full rounded-full border-8 border-app-blue relative overflow-hidden shadow-lg"
                            imageClasses="object-contain"
                            local={true}
                            image={{
                              path: `/images/${slugify(page_id.label.toLowercase())}-message.png`,
                              title: 'Entammez vos échanges avec ZEEVEN',
                            }}
                          />
                        </div>
                        <div>
                          <p className="flex">
                            <span className="flex items-center justify-between rounded-md py-1 pr-10 font-light text-black">
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
                })
              : null}
          </>
        ) : null}
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
