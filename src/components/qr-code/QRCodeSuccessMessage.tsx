import { useRouter } from 'next/router';
import Message from '../Message';
import ImageDisplay from '../image-display';
import OutlineLink from '../shared/OutlineLink';
import { downloadBase64File } from '@/utils';

function QRCodeSuccessMessage({ data }: any) {
  const router = useRouter();
  return (
    <div className="container mx-auto mb-10 overflow-hidden rounded-lg md:w-2/3">
      <div className="grid md:grid-cols-2">
        <Message
          type="success"
          firstMessage="Votre QR CODE a bien été généré"
          secondMessage="Inscrivez vous pour recevoir des statistiques personnalisées"
          action={() => router.push('/')}
          actionLabel="Retourner à l'accueil"
        />
        <div className='flex flex-col'>
          <ImageDisplay
            base64={true}
            image={{ path: data, title: 'zeeven qr code' }}
            wrapperClasses="relative w-full md:h-full h-52"
            imageClasses="object-contain"
          />
          <OutlineLink
            button={true}
            action={() => downloadBase64File(data, 'image/png', `qr-code.png`)}
            label="Télécharger"
            classes="w-full justify-center mt-4"
          />
        </div>
      </div>
    </div>
  );
}

export default QRCodeSuccessMessage;
