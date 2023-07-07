import Metadata from '@/components/Metadata';
import OpenedLayout from '@/containers/opened';

function Tarifs() {
  return (
    <OpenedLayout>
      <Metadata entry={{ title: 'Tarifs' }} />
      <section className="mx-auto w-11/12 pb-20 pt-10 md:w-1/2"></section>
    </OpenedLayout>
  );
}

export default Tarifs;
