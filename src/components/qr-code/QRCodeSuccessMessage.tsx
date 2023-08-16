import { useRouter } from 'next/router';
import Message from '../Message';
import QRCodePrevisualisation from './QRCodePrevisualisation';

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
        <QRCodePrevisualisation data={data}/>
      </div>
    </div>
  );
}

export default QRCodeSuccessMessage;
