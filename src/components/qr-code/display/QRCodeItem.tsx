import ImageDisplay from '@/components/image-display';
import OutlineLink from '@/components/shared/OutlineLink';
import YellowLink from '@/components/shared/YellowLink';
import { deleteItem, handleError, patch } from '@/services';
import formStyles from '@/styles/Form.module.css';
import { QR_CODES_TYPES, downloadBase64File, getDisplayedDate, slugify } from '@/utils';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';

function QRCodeItem({ refetch, entry, index, withDetail = true }: any) {
  const [selectedType, setSelectedType] = useState<any>();
  const [messages, setMessages] = useState<any>();
  const [showMessage, setShowMessage] = useState<any>(false);

  const router = useRouter();
  const showValidationMessage = (type: string) => {
    setSelectedType(type);
    if (type === 'DELETED') {
      setMessages(['Voulez vous supprimer ce QRCODE?', 'Les statistiques liées à ce QRCODE seront supprimées']);
    }
    if (type === 'DISABLED') {
      setMessages(['Voulez vous modifier le statut de ce QRCODE?']);
    }
    setShowMessage(true);
  };
  const cancelValidation = () => {
    setSelectedType(null);
    setMessages(null);
    setShowMessage(false);
  };
  const deleteMutation = useMutation({
    mutationKey: ['deleteQRcode'],
    mutationFn: (id: string) => deleteItem(`/api/backend/qr-code/${id}`),
    onError: (error: AxiosError) => {
      //setError(error);
      handleError(error);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const patchMutation = useMutation({
    mutationKey: ['updateQRcode'],
    mutationFn: (body: any) => patch(`/api/backend/qr-code/${body.id}`, body),
    onError: (error: AxiosError) => {
      //setError(error);
      handleError(error);
    },
    onSuccess: () => {
      refetch();
    },
  });


  const handleSelectedType = (id: string) => {
    setShowMessage(false);
    if (selectedType === 'DELETED') {
      deleteMutation.mutate(id);
    }
    if (selectedType === 'DISABLED') {
      const body = {enabled: !entry.enabled, id};
      patchMutation.mutate(body);
    }
  }
  const updateQRCode = () => {
    sessionStorage.setItem("qrcodeId", entry.id);
    router.push('/qr-code');
  }
  return (
    <>
      <article
        className={classNames(
          'grid-cols-1 items-center items-center px-2 py-2 text-center md:grid  md:grid-cols-6 md:text-left',
          {
            'bg-app-light-blue': index % 2 === 0,
          }
        )}
      >
        <ImageDisplay
          base64={true}
          image={{ path: entry.file, title: entry.publicId }}
          wrapperClasses="relative md:w-32 w-full h-32 !flex items-center justifly-center"
          imageClasses="object-contain"
        />
        <div className="description col-span-3 flex flex-col justify-between py-2 md:py-0">
          <div className="infos">
            <h3 className="text-2xl font-extrabold">
              {
                QR_CODES_TYPES.filter(({ value }: { value: string }) => value === entry.type)[0][
                  'label'
                ]
              }
            </h3>
            <p className="mt-2 flex text-sm">
              <span className="w-20 text-gray-500">Lien:</span>
              <span className="col-span-2">{entry.finalContent}</span>
            </p>
            <p className="mt-2 flex text-sm">
              <span className="w-20 text-gray-500">Creation:</span>
              <span className="col-span-2">{getDisplayedDate(entry.creation)}</span>
            </p>
          </div>
          <div className="actions my-4 flex gap-3">
            <OutlineLink
              button={true}
              icon={false}
              action={updateQRCode}
              label="Modifier"
              classes="justify-center bg-white px-8 hover:text-white hover:bg-app-blue"
            />
            <OutlineLink
              button={true}
              icon={false}
              action={() => showValidationMessage('DISABLED')}
              label={`${entry.enabled ? "Mettre en pause": "Activer"}`}
              classes="justify-center bg-white px-8 hover:text-white hover:bg-app-blue"
            />
            <OutlineLink
              button={true}
              icon={false}
              action={() => showValidationMessage('DELETED')}
              label="Supprimer"
              classes="justify-center bg-white text-red-600 border-red-600 px-8 hover:text-white hover:bg-red-600"
            />
          </div>
        </div>
        <h2 className="py-2 text-center text-6xl font-extrabold text-black md:py-0">
          {('0' + entry.scans).slice(-2)}
          <span className="text-sm font-normal">scans</span>
        </h2>
        <p>
          {withDetail ? (
            <YellowLink
              label="Afficher"
              link={`/me/qr-code/${entry.id}`}
              classes="w-full justify-center mb-2"
            />
          ) : null}
          <OutlineLink
            button={true}
            action={() => downloadBase64File(entry.file, 'image/png', `${entry.publicId}.png`)}
            label="Télécharger"
            classes="w-full justify-center"
          />
        </p>
      </article>
      {showMessage ? (
        <div
          className={classNames(
            'flex w-full flex-col items-center justify-end bg-slate-300 px-2 py-3 md:flex-row'
          )}
        >
          <p className='flex flex-col font-bold'>
            {messages.map((message: any) => (<span className="mr-2" key={slugify(message)}>{message}</span>))}
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
            <button type="button" className={formStyles.button__red} onClick={() => handleSelectedType(entry.id)}>
              Oui
            </button>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
}

export default QRCodeItem;
