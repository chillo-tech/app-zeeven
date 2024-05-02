import Message from '@/components/Message';
import Metadata from '@/components/Metadata';
import Debug from '@/components/shared/Debug';
import ProtectedLayout from '@/containers/protected';
import { handleError, patch, search } from '@/services';
import formStyles from '@/styles//Form.module.css';
import { BACKEND_BASE_PATH, GLOBAL_SUCCESS_MESSAGE } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import * as yup from 'yup';

type Params = { slug: string, invitationId: number; eventId: number };

type InvitationParams = {
  qrCodeX: number;
  qrCodeY: number;
  qrCodeWidth: number;
  qrCodeHeight: number;
};

const schema = yup
  .object({
    qrCodeX: yup.number().typeError('Saisir un entier').required("Merci de saisir l'abscisse"),
    qrCodeY: yup.number().typeError('Saisir un entier').required("Merci de saisir l'ordonnée"),
    qrCodeWidth: yup.number().typeError('Saisir un entier').required('Merci de saisir largeur'),
    qrCodeHeight: yup.number().typeError('Saisir un entier').required('Merci de saisir la hauteur'),
  })
  .required();

function TemplateParamaters({ invitationId, eventId, slug }: Params) {
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvitationParams>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const mutation = useMutation({
    mutationFn: (params: InvitationParams) => {
      return patch(`${BACKEND_BASE_PATH}/event/${eventId}/invitation/${invitationId}/params`, params);
    },
    onError: (error) => {
      setIsError(true);
      handleError(error);
    },
  });
  const onSubmit = async (invitationParams: InvitationParams) => {
    mutation.mutate(invitationParams);
  };
  
  const handleSuccess = () => {
    mutation.reset();
    router.push(`/me/message/${slug}`);
  };

  return (
    <ProtectedLayout>
      <Metadata entry={{ title: 'Paramètres évènements', description: 'Paramètres évènements' }} />
      <h1 className="text-3xl font-semibold text-app-blue">Invitations pour votre évènement</h1>
      {mutation.isLoading ? (
        <Message
          type="loading"
          firstMessage="Un instant"
          secondMessage="Nous enregistrons votre demande"
        />
      ) : null}
      {isError ? (
        <Message
          type="error"
          firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
          secondMessage="N'hésitez pas à nous passer un coup de fil"
          action={handleSuccess}
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {mutation.isSuccess ? (
        <Message
          type="success"
          firstMessage={GLOBAL_SUCCESS_MESSAGE}
          secondMessage=""
          action={handleSuccess}
          actionLabel="Retourner à l'accueil"
        />
      ) : null}
      {mutation.isIdle ? (
        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="qr-code" className="mb-2 flex w-full flex-col justify-between text-lg">
              <span className="font-semibold text-app-blue">Positions du QRCODE</span>
            </label>
            <div className="grid gap-2 md:grid-cols-4" aria-labelledby="qr-code">
              <div className={formStyles.form_control}>
                <input
                  autoComplete="current-password"
                  type="number"
                  id="qrCodeX"
                  className={formStyles.form_control__input}
                  {...register('qrCodeX')}
                  placeholder="Abscisse QR Code"
                />
                <p className={formStyles.form_control__error}>{errors.qrCodeX?.message}</p>
              </div>
              <div className={formStyles.form_control}>
                <input
                  autoComplete="current-password"
                  type="number"
                  id="qrCodeY"
                  className={formStyles.form_control__input}
                  {...register('qrCodeY')}
                  placeholder="Ordonnée QR Code"
                />
                <p className={formStyles.form_control__error}>{errors.qrCodeY?.message}</p>
              </div>
              <div className={formStyles.form_control}>
                <input
                  autoComplete="current-password"
                  type="number"
                  id="qrCodeWidth"
                  className={formStyles.form_control__input}
                  {...register('qrCodeWidth')}
                  placeholder="Largeur QR Code"
                />
                <p className={formStyles.form_control__error}>{errors.qrCodeWidth?.message}</p>
              </div>
              <div className={formStyles.form_control}>
                <input
                  autoComplete="current-password"
                  type="number"
                  id="qrCodeHeight"
                  className={formStyles.form_control__input}
                  {...register('qrCodeHeight')}
                  placeholder="Hauteur QR Code"
                />
                <p className={formStyles.form_control__error}>{errors.qrCodeHeight?.message}</p>
              </div>
            </div>
            <button className={formStyles.form_control__button}>Enregistrer</button>
          </form>
        </div>
      ) : null}
    </ProtectedLayout>
  );
}

export default TemplateParamaters;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const slug = params['slug'];

  const eventId = slug.substring(slug.lastIndexOf('-') + 1);

  const invitationId = params['index'];
  return { props: { ...params, eventId, invitationId,slug } };
}
