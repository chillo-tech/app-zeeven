import Metadata from '@/components/Metadata';
import { add, fetchDataClient } from '@/services';
import formStyles from '@/styles/Form.module.css';
import styles from '@/styles/SignIn.module.css';
import { ISondage } from '@/types';
import { EMAIL_ERROR_MESSAGE, EMAIL_PATTERN, SONDAGE } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
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
  });

  return sondageQuery.data ? (
    <section className={styles.wrapper}>
      <Metadata
        entry={{ title: sondageQuery.data.intitule, description: sondageQuery.data.intitule }}
      />

      <nav className={`${styles.navigation}`}>
        <Link href={'/'} className={styles.logo}>
          ZEEVEN
        </Link>
      </nav>
      <div className={styles.form__container}>
        <h1 className={styles.form__title}>{sondageQuery.data.intitule}</h1>
        <h2 className={`${styles.form_control__label} pb-6 pt-2 text-center font-light`}>
          {sondageQuery.data.Description}
        </h2>
        <article className={styles.inputs__container}>
          {mutation.isError ? (
            <h2 className={`text-center text-lg text-rose-500`}>{errorMessage}</h2>
          ) : null}
          <form onSubmit={handleSubmit(onSubmit)}>
            {sondageQuery.data.question.map(({ question_id }, index) => {
              return (
                <div
                  className={formStyles.form_control}
                  key={`Question-${question_id.id}-${index}`}
                >
                  <label
                    htmlFor={`Question-${question_id.id}-${index}`}
                    className={formStyles.form_control__label}
                  >
                    <span className={formStyles.form_control__label__first}>
                      {question_id.label}
                    </span>
                  </label>
                  {question_id.choix.length > 0 ? (
                    <>
                      <select
                        className={`w-full ${formStyles.form_control__input}`}
                        {...register(`question_${question_id.id}`)}
                        id={`Question-${question_id.id}-${index}`}
                      >
                        <option defaultChecked value={0}>
                          Veuillez faire un choix
                        </option>
                        {question_id.choix.map(({ choix_id }, index) => {
                          return (
                            <option key={`Question-${question_id.id}-${index}`} value={choix_id.id}>
                              {choix_id.intitule}
                            </option>
                          );
                        })}
                      </select>
                      <p className={formStyles.form_control__error}>
                        {errors[`question_${question_id.id}`]?.message}
                      </p>
                    </>
                  ) : (
                    <input
                      type="text"
                      id={`Question-${question_id.id}-${index}`}
                      className={formStyles.form_control__input}
                      placeholder="Votre réponse"
                      {...register(`question_${question_id.id}`)}
                    />
                  )}
                </div>
              );
            })}

            <button className={formStyles.form_control__button}>Transmettre</button>
          </form>
        </article>
      </div>
    </section>
  ) : null;
};

export default SondagePage;
