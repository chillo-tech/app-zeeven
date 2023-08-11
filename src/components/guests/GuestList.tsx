import { Guest } from '@/types/Guest';
import classNames from 'classnames';
import DeletetableItem from '../shared/DeletetableItem';

type Props = {
  guests: Guest[];
  deleteGuest?: any;
};

function GuestList({ guests, deleteGuest }: Props) {
  return (
    <>
      {guests
        .sort((a: Guest, b: Guest) => a.firstName.localeCompare(b.firstName))
        .map((guest, index) => (
          <DeletetableItem
            classes="border-b border-slate-100"
            data={guest}
            action={deleteGuest}
            actionValue={guest.publicId}
            key={`${guest.id}-${index}`}
          >
            <article className={classNames('grid text-gray-800 md:grid-cols-7')}>
              <span className="px-1 py-1">{guest.civility}</span>
              <span className="py-1 capitalize">{guest.firstName}</span>
              <span className="py-1 font-bold uppercase">{guest.lastName}</span>
              <span className="overflow-hidden text-ellipsis py-1 md:col-span-2">
                {guest.email}
              </span>
              <span className="overflow-hidden text-ellipsis py-1 md:col-span-2">
                ({guest.phoneIndex}) {guest.phone}
              </span>
            </article>
          </DeletetableItem>
        ))}
    </>
  );
}

export default GuestList;
