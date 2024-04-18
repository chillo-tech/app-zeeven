import Metadata from '@/components/Metadata';
import Form from '@/components/sondage/form/form';
import { add, fetchData } from '@/services';
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
    const answers = Object.keys(data).map((key) => {
      return {
        value: typeof data[key] === 'number' || data[key] instanceof Number ? null : data[key],
        choice: typeof data[key] === 'number' || data[key] instanceof Number ? data[key] : null,
        question: Number(key.split('_')[1]),
      };
    });

    const postObj = {
      email: '',
      phone: '',
      phoneIndex: '',
      firstName: '',
      lastName: '',
      sondage: sondageQuery.data?.id || router.query.slug,
      answers,
    };

    return add('/api/backoffice/survey_answer_sheet', postObj);
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
    watch,
    reset,
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
    const slug = router.query.slug;
    while (!router.isReady) {
      await new Promise(() => setTimeout(() => ({}), 500));
    }
    if (!slug || typeof slug !== 'string') {
      throw new Error('Not found');
    } else {
      const id = parseInt(slug.split('-').at(-1) || '');
      const {
        data: { data: sondage },
      } = await fetchData({
        path: `/api/backoffice/survey/${id}`,
        fields: SONDAGE,
      });
      console.log('sondage', sondage);
      if (sondage.slug !== slug) {
        throw new Error('Not found');
      }
      return sondage;
    }
  };

  const handleSondage = async (sondage: ISondage) => {
    const objectSchema: any = {};
    sondage.questions.forEach((question) => {
      if (question.type === 'email') {
        objectSchema[`question_${question.id}`] = yup
          .string()
          .email(EMAIL_ERROR_MESSAGE)
          .required(EMAIL_ERROR_MESSAGE)
          .matches(EMAIL_PATTERN, { message: EMAIL_ERROR_MESSAGE });
      } else {
        if (question.choices.length > 0) {
          objectSchema[`question_${question.id}`] = yup
            .number()
            .typeError('Ce champ est requis')
            .min(1, 'Ce champ est requis')
            .required('Ce champ est requis');
        } else {
          objectSchema[`question_${question.id}`] = yup.string();
        }
      }
    });
    setSchema(() => {
      return yup.object(objectSchema).required();
    });
  };

  const sondageQuery = useQuery<ISondage>({
    queryKey: ['sondage', router.query.slug],
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
          title: `${sondageQuery.data.label || 'sondage'} | ${
            sondageQuery.data.company?.label || 'zeeven'
          }`,
          description: sondageQuery.data.abstract || 'produit par zeeven de chillo tech',
        }}
      />

      <nav className={`${styles.navigation}`}>
        <div>
          <Link href={'/'} className={styles.logo}>
            ZEEVEN
          </Link>
          {sondageQuery.data.company.label || sondageQuery.data.company.name ? (
            <div>
              Ce sondage est destiné à{' '}
              {sondageQuery.data.company.label || sondageQuery.data.company.name}
            </div>
          ) : null}
        </div>
      </nav>
      <div className={styles.form__container}>
        <h1 className={styles.form__title}>{sondageQuery.data.label}</h1>
        <h2 className={`${styles.form_control__label} pb-6 pt-2 text-center font-light`}>
          {sondageQuery.data.abstract}
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
              <p>Merci d&apos;avoir participé à ce sondage</p>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => {
                    reset();
                    mutation.reset();
                  }}
                  className={formStyles.form_control__button}
                >
                  Recharger le formulaire
                </button>
                <button
                  onClick={() => router.push('/')}
                  className={formStyles.form_control__button}
                >
                  Revenir à l&apos;acceuil
                </button>
              </div>
            </div>
          ) : (
            <Form
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              questions={sondageQuery.data.questions}
              register={register}
              watch={watch}
            />
          )}
        </article>
      </div>
    </section>
  ) : null;
};

export default SondagePage;
