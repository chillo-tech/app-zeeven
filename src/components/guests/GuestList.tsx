import { Guest } from '@/types/Guest';
import classNames from 'classnames';
import DeletetableItem from '../shared/DeletetableItem';
import { CIVILITY_MAPPING } from '@/utils';

type Props = {
  guests: Guest[];
  deleteGuest?: any;
};

function GuestList({ guests, deleteGuest }: Props) {
  return (
    <div className="mt-2 flex flex-col items-center bg-white shadow sm:overflow-hidden sm:rounded-md">
      {guests
        .sort((a: Guest, b: Guest) => {return (a.firstName && b.firstName) ? a.firstName.localeCompare(b.firstName): 0})
        .map((guest, index) => (
          <DeletetableItem
            classes={classNames('border-b border-slate-100', { 'bg-slate-100': index % 2 === 1 })}
            data={guest}
            action={deleteGuest}
            actionValue={guest.publicId}
            key={`${guest.id}-${index}`}
          >
            <article
              className={classNames('grid items-center px-4 text-gray-800 md:grid-cols-7', {
                'bg-slate-100': index % 2 === 1,
              })}
            >
              <span className="px-1 py-1">{(CIVILITY_MAPPING as any)[`${guest.civility}`]}</span>
              <span
                className="flex flex-col overflow-hidden py-1 capitalize md:col-span-2"
                title={guest.firstName}
              >
                <span>
                  {guest.firstName} {guest.lastName}
                </span>
                <span>{guest.partner}</span>
              </span>
              <span className="overflow-hidden truncate py-1 md:col-span-2">{guest.email}</span>
              <span
                className="overflow-hidden truncate py-1 md:col-span-2"
                title={`${guest.phoneIndex} ${guest.phone}`}
              >
                { (guest.phoneIndex && guest.phone)? `(${guest.phoneIndex}) ${guest.phone}`: null}
              </span>
            </article>
          </DeletetableItem>
        ))}
    </div>
  );
}

export default GuestList;
