import { deleteItem, handleError } from '@/services';
import { getHumanDate } from '@/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useMutation } from 'react-query';
import Message from '../Message';
import DeletetableItem from '../shared/DeletetableItem';

function Invitations({ event, handleItemEdit }: any) {
  const {invitation} = event;
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const [isError, setIsError] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ eventId, invitationId }: any) =>
      deleteItem(`/api/backend/event/${eventId}/invitation/${invitationId}`),
    onSuccess: handleItemEdit,
    onError: (error: any) => {
      setIsError(true), handleError(error);
    },
  });
  const deleteInvitation = (invitationId?: string) => {
    const eventId = `${(slug as string).substring((slug as string)?.lastIndexOf('-') + 1)}`;
    mutation.mutate({ eventId, invitationId });
  };

  return (
    <>
      {(invitation && Object.keys(invitation).length) ? (
        <>
          {mutation.isLoading ? (
            <Message
              type="loading"
              firstMessage="Un instant"
              secondMessage="Nous chargeons vos informations"
            />
          ) : null}
          {isError ? (
            <Message
              type="error"
              firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
              secondMessage="Veuillez prendre contact avec nous"
            />
          ) : null}
          {mutation.isIdle ? (
            <DeletetableItem
              classes="border-b border-slate-100"
              data={invitation}
              action={deleteInvitation}
              actionValue={invitation.publicId}
            >
              <article className={classNames('grid text-gray-800 md:grid-cols-7')}>
                <div className="px-1 py-1">
                  <p className="font-bold">Template</p>
                  <p>{invitation.template.name}</p>
                </div>
                <div className="py-1 md:col-span-2">
                  <p className="font-bold">Adresse</p>
                  <p>{invitation.template.address}</p>
                </div>
                <div className="py-1 md:col-span-2">
                  <p className="font-bold">Texte</p>
                  <p>{invitation.template.text}</p>
                </div>
                <div className="overflow-hidden text-ellipsis py-1">
                  <p className="font-bold">Date envoi</p>
                  {getHumanDate(new Date(invitation.send))}
                </div>
                <div className="overflow-hidden text-ellipsis py-1">
                  <p className="font-bold">Date activation</p>
                  <p>{getHumanDate(new Date(invitation.active))}</p>
                </div>
              </article>
            </DeletetableItem>
          ) : null}
        </>
      ) : (
        <div className="container grid gap-4 md:grid-cols-4">
          <Link
            href={`/me/message/${slug}/invitation`}
            className="flex h-32 flex-col items-center justify-center rounded-lg border border-app-blue font-bold text-app-blue"
          >
            <span>Créer une invitation</span>
            <AiOutlinePlusCircle className="mt-1 text-6xl" />
          </Link>
        </div>
      )}
    </>
  );
}

export default Invitations;
