import React from 'react'
import { BiTrash} from 'react-icons/bi';
import { Guest } from '@/types/Guest';
import DeletetableItem from '@/components/shared/DeletetableItem';
import classNames from 'classnames';

type Params = {
  remove: (guest: Guest)=> void,
  guests: Guest[]
}

function GuestList({guests, remove}: Params) {
  return (
    <>
      <h3 className="text-left p3 text-lg text-blue-800 font-semibold">Vos contacts </h3>
      {guests
				.sort((a: Guest, b: Guest) => a.firstName.localeCompare(b.firstName))
				.map(
					(guest, index) => (
						<DeletetableItem  classes={`${index%2 === 1 ? 'bg-whte border-b border-slate-100': 'bg-blue-50 border-b border-slate-100'}`} data={guest}
										 action={()=> remove(guest)} actionValue={guest.publicId} key={`${guest.id}-${index}`}>
							<article className={classNames("grid md:grid-cols-5 text-gray-800")}>
								<span className='py-1 px-1'>{guest.civility}</span>
								<span className='capitalize py-1'>{guest.firstName}</span>
								<span className='uppercase font-bold py-1'>
									{guest.lastName}
								</span>
								<span className='py-1'>
								{guest.email}
							</span>
								<span className='py-1'>
								({guest.phoneIndex}) {guest.phone}
							</span>
							</article>
						</DeletetableItem>
					))
			}
    </>
  )
}

export default GuestList
