import React, { useContext } from 'react'
import  BottomBar  from './BottomBar'
import { NewCampainContext } from '../context/NewCampainContext';
import { getDisplayedDate } from '../../../utils/DateFormat';
import Preview from './Preview';
import { useMutation } from '@tanstack/react-query';
import { add } from '../../../services/crud';
import Message from '../../components/Message';
import { useRouter } from 'next/router'

function Recap() {
  const mutation = useMutation({mutationFn: (campain => add("/evenement", campain))});
  const context = useContext(NewCampainContext);
  const {state: {stepIndex, campain}, previousStep} = context;
  const router = useRouter()

  const handleError = (error:any) => {
    error.preventDefault()
    router.push('/')
  }

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    mutation.mutate(campain);
  };

  return (
    <section className='rounded-lg bg-white border border-slate-200 shadow-sm'>
      {mutation.isLoading ? (
        <Message 
          type="loading" 
          firstMessage='Un instant' 
          secondMessage='Nous enregistrons votre demande' 
        />) : null}
      {mutation.isError ? (
        <Message 
          type="error" 
          firstMessage='Une erreur est survenue, nous allons la résoudre sous peu' 
          secondMessage='Veuillez prendre contact avec nous' 
          action={handleError} 
          actionLabel="Retourner à l'accueil"
        />) : null}
      {mutation.isSuccess ? (
        <Message 
          type="success" 
          firstMessage='Nous avons enregistré votre demande.' 
          secondMessage='Vous allez recevoir sous peu les informations sur votre demande' 
          action={handleError} 
          actionLabel="Retourner à l'accueil"
        />) : null}
      
    </section>
  )
}

export default Recap
