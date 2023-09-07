import DeletetableItem from '@/components/shared/DeletetableItem';
import { Guest } from '@/types/Guest';
import classNames from 'classnames';

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
            <article className={classNames('grid items-center text-gray-800 md:grid-cols-7')}>
              <span className="px-1 py-1">{guest.civility}</span>
              <span className="flex flex-col overflow-hidden py-1 capitalize md:col-span-2" title={guest.firstName}>
                <span>{guest.firstName} {guest.lastName}</span>
                <span>{guest.partner}</span>
              </span>
              <span className="py-1 md:col-span-2 truncate overflow-hidden">{guest.email}</span>
              <span className="py-1 md:col-span-2 truncate overflow-hidden" title={`(${guest.phoneIndex}) ${guest.phone}`}>
                ({guest.phoneIndex}) {guest.phone}
              </span>
            </article>
          </DeletetableItem>
        ))}
    </>
  );
}

export default GuestList;
