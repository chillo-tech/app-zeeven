import { deleteItem, handleError } from '@/services';
import formStyles from '@/styles/Form.module.css';
import { BACKEND_BASE_PATH, getHumanDate, slugify } from '@/utils';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import OutlineLink from '../shared/OutlineLink';
import { ApplicationContext } from '@/context/ApplicationContext';

function InvitationItem({ slug, invitation, handleItemEdit }: any) {
  const [showMessage, setShowMessage] = useState<any>(false);
  const [selectedType, setSelectedType] = useState<any>();
  const [messages, setMessages] = useState<any>();
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const {state: {user}} = useContext(ApplicationContext);
  const deleteMutation = useMutation({
    mutationFn: ({ eventId, invitationId }: any) =>
      deleteItem(`${BACKEND_BASE_PATH}/event/${eventId}/invitation/${invitationId}`),
    onSuccess: handleItemEdit,
    onError: (error: any) => {
      setIsError(true);
      handleError(error);
    },
  });
  const handleSelectedType = () => {
    const eventId = `${(slug as string).substring((slug as string)?.lastIndexOf('-') + 1)}`;
    setShowMessage(false);
    if (selectedType === 'DELETED') {
      deleteMutation.mutate({ eventId, invitationId: invitation.publicId });
    }
  };

  const update = () => {
    router.push(`/me/message/${slug}/invitation/${invitation.publicId}`);
  };
  const showValidationMessage = (type: string) => {
    setSelectedType(type);
    if (type === 'DELETED') {
      setMessages([
        'Voulez vous supprimer cette invitation?',
        'Les informations liées à cette invitation seront supprimées',
      ]);
    }
    setShowMessage(true);
  };
  const cancelValidation = () => {
    setSelectedType(null);
    setMessages(null);
    setShowMessage(false);
  };
  return (
    <>
      {invitation && invitation.template ? (
        <>
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
          <div className="actions mt-2 flex flex justify-end gap-3">
          {user &&
              Object.keys(user).length &&
              user['authorities'] &&
              user['authorities'][0]['authority'] === 'ROLE_ADMIN' ? (
                <OutlineLink
                button={true}
                icon={false}
                action={update}
                label="Parametrer"
                classes="justify-center bg-white px-8 hover:text-white hover:bg-app-blue"
              />
              ) : null}
           

            <OutlineLink
              button={true}
              icon={false}
              action={() => showValidationMessage('DELETED')}
              label="Supprimer"
              classes="justify-center bg-white text-red-600 border-red-600 px-8 hover:text-white hover:bg-red-600"
            />
          </div>
          {showMessage ? (
            <div
              className={classNames(
                'flex w-full flex-col items-center justify-end bg-slate-300 px-2 py-3 md:flex-row'
              )}
            >
              <p className="flex flex-col font-bold">
                {messages.map((message: any) => (
                  <span className="mr-2" key={slugify(message)}>
                    {message}
                  </span>
                ))}
              </p>

              <div>
                <button
                  type="button"
                  className={formStyles.outline__button__black}
                  onClick={(event) => {
                    event.stopPropagation();
                    cancelValidation();
                  }}
                >
                  Non
                </button>
                <button
                  type="button"
                  className={formStyles.button__red}
                  onClick={handleSelectedType}
                >
                  Oui
                </button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default InvitationItem;
