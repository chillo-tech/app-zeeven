import Head from 'next/head'
import React, { useContext } from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useQuery } from 'react-query';
import { fetchData } from '@/services/fetch-data';
import { ApplicationContext } from '@/context/ApplicationContext';
import { ENTREPRISE } from '@/utils';

function OpenedLayout({children}: {children: any}) {
  const context = useContext(ApplicationContext);
  const { updateData, state: {company} } = context;
  useQuery<any>({
    queryKey: ['entreprises'],
    enabled: !company,
    queryFn: () =>
      fetchData({
        path: 'backoffice/company',
        fields: ENTREPRISE,
      }),
    onSuccess: (data) => {
      updateData({ company: data.data.data[0] });
    },
  });

  return (
    <section className={`bg-gradient-to-b from-blue-100 to-pink-50 min-h-screen font-light flex flex-col justify-between`}>
      <Head>
        <title>Informez nos contacts de vos évènements</title>
        <meta name="description" content="Informez nos contacts de vos évènements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </section>
  )
}

export default OpenedLayout
