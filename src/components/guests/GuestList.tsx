import React from 'react';
import {Guest} from '@/types/Guest';
import classNames from 'classnames';
import DeletetableItem from '../shared/DeletetableItem';

type Props = {
	guests: Guest[]
	deleteGuest?: any
};

function GuestList({guests, deleteGuest}: Props) {

	return (
		<>
			{guests
				.sort((a: Guest, b: Guest) => a.firstName.localeCompare(b.firstName))
				.map(
					(guest, index) => (
						<DeletetableItem classes="border-b border-slate-100" data={guest}
										 action={deleteGuest} actionValue={guest.publicId} key={`${guest.id}-${index}`}>
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
