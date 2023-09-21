import { useRouter } from 'next/router';
import Message from '../Message';

function QRCodeSuccessMessage() {
  const router = useRouter();
  return (
    <div className="bg-white un-success container mx-auto mb-10 overflow-hidden rounded-lg">
      <div className="grid">
        <Message
          type="success"
          firstMessage="Votre QR CODE a bien été généré"
          secondMessage="Inscrivez/connectez vous pour recevoir des statistiques personnalisées"
          action={() => router.push('/')}
          actionLabel="Retourner à l'accueil"
        />
      </div>
    </div>
  );
}

export default QRCodeSuccessMessage;
