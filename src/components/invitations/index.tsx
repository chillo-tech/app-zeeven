import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import InvitationItem from './InvitationItem';
import Debug from '../shared/Debug';

function Invitations({ event, handleItemEdit }: any) {
  const { invitation } = event;
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  return (
    <>
      {(invitation && Object.keys(invitation).length > 1 && invitation.template )? (
        <InvitationItem invitation={invitation} slug={slug} handleItemEdit={handleItemEdit}/>
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
