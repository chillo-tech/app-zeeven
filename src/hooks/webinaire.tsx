import { schema } from '@/components/webinaire/form/schama';
import { fetchDataClient } from '@/services';
import { axiosInstance } from '@/services/axios-instance';
import { IWebinaireView } from '@/types/WebinaireFields';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const useWebinaire = ({ webinaire_id }: { webinaire_id: string }) => {
  const fetchView = async () => {
    const {
      data: { data: view },
    } = await fetchDataClient({
      path: `/api/chillo-backoffice/items/Description_Webinaire/${webinaire_id}/`,
      fields: '*,image_webinaire.*,formulaire.*',
    });

    if (!view || !view.formulaire) {
      router.push('/404');
      return;
    }

    return view as IWebinaireView;
  };
  const router = useRouter();

  const viewQuery = useQuery({
    queryKey: ['vue-webinaire', 1],
    queryFn: fetchView,
    retry: 10,
    refetchOnWindowFocus: false,
    onError: () => {
      router.push('/404');
    },
  });
  return { viewQuery };
};

const useWrapper = () => {
  const [errorMessage, setErrorMessage] = useState(
    'Une erreur est survenue, nous allons la résoudre sous peu'
  );

  const [phoneNumber, setPhoneNumber] = useState('');

  const [formPageIndex, setFormPageIndex] = useState(0);

  const answerWebinaire = (data: any) => {
    return axiosInstance.post('/api/chillo-backoffice/items/Webinaire', data);
  };
  const mutation = useMutation({
    mutationFn: answerWebinaire,
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
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [radioSelectedValue, setRadioSelectedValue] = useState('');

  const onSubmit = (data: any) => {
    const postObj = {
      ...data,
      adresse_mail: data.email,
      numero_telephone: `+${phoneNumber}`,
      date_inscription: new Date().toISOString(),
    };
    mutation.mutate(postObj);
  };

  useEffect(() => {
    if ((errors.email || errors.numero_telephone) && formPageIndex !== 0) {
      setFormPageIndex(0);
    }
  }, [errors]);

  const handleSubmitFn = handleSubmit(onSubmit);
  return {
    mutation,
    getValues,
    radioSelectedValue,
    setRadioSelectedValue,
    register,
    handleSubmitFn,
    errors,
    setValue,
    formPageIndex,
    setFormPageIndex,
    errorMessage,
    setErrorMessage,
    phoneNumber,
    setPhoneNumber,
  };
};

export { useWebinaire, useWrapper };
