import Head from 'next/head'
import React, { useMemo ,useState} from 'react'

function Metadata({entry}: any) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  useMemo(() => {
    if(entry && entry.title) {
      setTitle(entry.title);
    } else if(entry?.libelle) {
      setTitle(entry?.libelle);
    } else if(entry?.title) {
      setTitle(entry?.title);
    }else if(entry?.nom) {
      setTitle(entry?.nom);
    }
    if(entry && entry.description) {
      setDescription(entry.description.replace(/(<([^>]+)>)/ig, ''));
    } else if(entry?.description) {
      setDescription(entry?.description);
    }

  }, [entry])
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Metadata
