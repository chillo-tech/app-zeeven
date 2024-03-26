import Metadata from '@/components/Metadata';
import Form from '@/components/sondage/form/form';
import { add, fetchDataClient } from '@/services';
import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { ISondage } from '@/types';
import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN, SONDAGE } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import ScaleLoader from 'react-spinners/ScaleLoader';
import * as yup from 'yup';

const SondagePage = () => {
  const [errorMessage, setErrorMessage] = useState(
    'Une erreur est survenue, nous allons la résoudre sous peu'
  );
  const [schema, setSchema] = useState<any>();
  const router = useRouter();

  const answerSondage = (data: any) => {
    const reponses_choisies = Object.keys(data).map((key) => {
      return {
        valeur: typeof data[key] === 'number' || data[key] instanceof Number ? null : data[key],
        reponses_sondages: 1,
        choix: typeof data[key] === 'number' || data[key] instanceof Number ? data[key] : null,
        question: Number(key.split('_')[1]),
      };
    });

    const postObj = {
      email: '',
      numero_de_telephone: '',
      nom: '',
      sondage: sondageQuery.data?.id || router.query.sondage_id,
      reponses_choisies,
    };

    return add('/api/backoffice/reponses', postObj);
  };
  const mutation = useMutation({
    mutationFn: answerSondage,
    onError: (error) => {
      const { response } = error as AxiosError;
      const { data, status } = response as any;
      if (String(status).charAt(0) === '4' && data.message) {
        setErrorMessage(data.message);
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    getValues,
    clearErrors,
  } = useForm<{
    [key: `question_${string | number}`]: string | number;
  }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  const fetchSondage = async () => {
    const {
      data: { data: sondage },
    } = await fetchDataClient({
      path: `/api/backoffice/sondage/${router.query.sondage_id}`,
      fields: SONDAGE,
    });
    return sondage;
  };

  const handleSondage = async (sondage: ISondage) => {
    const objectSchema: any = {};
    sondage.question.forEach(({ question_id }) => {
      if (question_id.type === 'email') {
        objectSchema[`question_${question_id.id}`] = yup
          .string()
          .email(EMAIL_ERROR_MESSAGE)
          .required(EMAIL_ERROR_MESSAGE)
          .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE });
      } else {
        if (question_id.choix.length > 0) {
          objectSchema[`question_${question_id.id}`] = yup
            .number()
            .min(1, 'Ce champ est requis')
            .required('Ce champ est requis');
        } else {
          objectSchema[`question_${question_id.id}`] = yup.string();
        }
      }
    });
    setSchema(() => {
      return yup.object(objectSchema).required();
    });
  };

  const sondageQuery = useQuery<ISondage>({
    queryKey: ['sondage', router.query.sondage_id],
    queryFn: fetchSondage,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: handleSondage,
    onError: () => {
      router.push('/404');
    },
  });

  useEffect(() => {
    if (mutation.isError) {
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [mutation.isError]);

  return sondageQuery.data ? (
    <section className={styles.wrapper}>
      <Metadata
        entry={{
          title: `${sondageQuery.data.intitule || 'sondage'} | ${
            sondageQuery.data.entreprise?.nom || 'zeeven'
          }`,
          description: sondageQuery.data.intitule || 'produit par zeeven de chillo tech',
        }}
      />

      <nav className={`${styles.navigation}`}>
        <div>
          <Link href={'/'} className={styles.logo}>
            ZEEVEN
          </Link>
          {sondageQuery.data.entreprise?.nom && (
            <p>Ce sondage est destiné à {sondageQuery.data.entreprise?.nom}</p>
          )}
        </div>
      </nav>
      <div className={styles.form__container}>
        <h1 className={styles.form__title}>{sondageQuery.data.intitule}</h1>
        <h2 className={`${styles.form_control__label} pb-6 pt-2 text-center font-light`}>
          {sondageQuery.data.Description}
        </h2>
        <article className={`${styles.inputs__container} relative`}>
          {mutation.isError ? (
            <h2 className={`text-center text-lg text-rose-500`}>{errorMessage}</h2>
          ) : null}

          {mutation.isLoading && (
            <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(30,50,138,.3)]">
              <ScaleLoader color="rgb(30,50,138)" />
            </div>
          )}
          {mutation.isSuccess ? (
            <div className="space-y-4">
              <p>Merci d'avoir participé à ce sondage</p>
              <button onClick={() => router.push('/')} className={formStyles.form_control__button}>
                Revenir à l'acceuil
              </button>
            </div>
          ) : (
            <Form
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              questions={sondageQuery.data.question}
              register={register}
              setValue={setValue}
              getValues={getValues}
              setError={setError}
              clearErrors={clearErrors}
            />
          )}
        </article>
      </div>
    </section>
  ) : null;
};

export default SondagePage;
