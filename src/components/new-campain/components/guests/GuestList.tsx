import DeletetableItem from '@/components/shared/DeletetableItem';
import { Guest } from '@/types/Guest';
import GuestLineItem from './GuestLineItem';
type Params = {
  remove: (guest: Guest) => void;
  guests: Guest[];
};

function GuestList({ guests, remove }: Params) {
  return (
    <>
      <h3 className="pt-4 text-left text-lg font-semibold text-app-blue">Vos contacts </h3>
      {guests
        .sort((a: Guest, b: Guest) => a.firstName.localeCompare(b.firstName))
        .map((guest, index) => (
          <DeletetableItem
            classes={`${
              index % 2 === 1
                ? 'bg-whte border-b border-slate-100 px-2'
                : 'bg-blue-50 border-b border-slate-100 px-2'
            }`}
            data={guest}
            action={() => remove(guest)}
            actionValue={guest.publicId}
            key={`${guest.id}-${index}`}
          >
            <GuestLineItem guest={guest}/>
          </DeletetableItem>
        ))}
    </>
  );
}

export default GuestList;
