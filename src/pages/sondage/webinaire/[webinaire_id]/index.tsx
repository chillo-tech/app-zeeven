import Metadata from '@/components/Metadata';

import WebinaireForm from '@/components/webinaire/form/webinaireForm';
import { fetchDataClient } from '@/services';
import styles from '@/styles/SignIn.module.css';
import { IWebinaireView } from '@/types/WebinaireFields';
import { capitalize, getHumanDate } from '@/utils';
import { formatSnakeCase } from '@/utils/formatSnakeCase';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'react-query';

const Webinaire = ({ webinaire_id }: { webinaire_id: string }) => {
  const fetchView = async () => {
    const {
      data: { data: view },
    } = await fetchDataClient({
      path: `/api/chillo-backoffice/items/Description_Webinaire/${webinaire_id}/`,
      fields: '*,image_webinaire.*,formulaire.*',
    });

    return view as IWebinaireView;
  };

  const viewQuery = useQuery({
    queryKey: ['vue-webinaire', 1],
    queryFn: fetchView,
    retry: 10,
    refetchOnWindowFocus: false,
    // onSuccess: handleView,
  });
  return viewQuery.data ? (
    <section className={`${styles.wrapper} !overflow-y-hidden`}>
      <Metadata entry={{ title: 'Webinaire', description: 'description metadonnees' }} />

      <nav className={`${styles.navigation}`}>
        <Link href={'/'} className={styles.logo}>
          ZEEVEN
        </Link>
      </nav>
      <main
        className={` container mx-auto my-5 mb-10 flex w-full flex-col items-start justify-between gap-10 px-2 lg:flex-row  lg:items-center`}
      >
        <aside className={`w-full shrink-0 space-y-5 pr-0 lg:w-1/2 lg:pr-3`}>
          <Image
            src={viewQuery.data.image_webinaire.link}
            className="w-full object-cover"
            height={400}
            width={400}
            alt={viewQuery.data.image_webinaire.name}
          />
          <h1
            className={`${styles.form__title} text-center !text-2xl !font-bold lg:!text-left lg:!text-4xl`}
          >
            {viewQuery.data.titre}
          </h1>
          <div>
            <p className={`${styles.form__title} !m-0 !text-center lg:!text-left`}>Description</p>
            <p className={`${styles.form_control__label} !text-center font-light lg:!text-left`}>
              {viewQuery.data.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <p className="text-light rounded-[35px] bg-gray-300 px-2 py-1 text-sm ">
              {capitalize(viewQuery.data.langue)}
            </p>
            <p className="text-light rounded-[35px] bg-gray-300 px-2 py-1 text-sm ">
              {getHumanDate(new Date(viewQuery.data.date_et_heure_prevue))}
            </p>
            <p className="text-light rounded-[35px] bg-gray-300 px-2 py-1 text-sm ">
              {capitalize(formatSnakeCase(viewQuery.data.plateforme))}
            </p>
            <p className="text-light rounded-[35px] bg-gray-300 px-2 py-1 text-sm ">
              {viewQuery.data.duree} min
            </p>
          </div>
          <div>
            <p className={`${styles.form__title} !m-0  !text-center lg:!text-left`}>Objectif</p>
            <p className="text-center font-light lg:text-left">
              {viewQuery.data.objectif_webinaire}
            </p>
          </div>
          <div>
            <p className={`${styles.form__title} !m-0  !text-center lg:!text-left`}>Cible</p>
            <p className="text-center  font-light lg:text-left">{viewQuery.data.public_cible}</p>
          </div>
        </aside>
        <WebinaireForm formView={viewQuery.data.formulaire} />
      </main>
    </section>
  ) : null;
};

export default Webinaire;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const webinaire_id = ctx.params?.webinaire_id || '0';
  return { props: { webinaire_id } };
};
