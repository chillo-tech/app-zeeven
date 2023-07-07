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
    <h3 colSpan={5} className="text-left p3 text-lg text-blue-800 font-semibold">Vos contacts </h3>
      {guests
				.sort((a: Guest, b: Guest) => a.firstName.localeCompare(b.firstName))
				.map(
					(guest, index) => (
						<DeletetableItem classes="border-b border-slate-100" data={guest}
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

    <table className={`table-auto my-4 border-collapse w-full`}>
      <thead>
      <tr><th colSpan={5} className="text-left p3 text-lg text-blue-800 font-semibold">Vos contacts </th></tr>
      </thead>
      <tbody>
        {
          guests.map(
            (guest, index) => (
              <tr key={index} className={`${index%2 === 1 ? 'bg-whte': 'bg-blue-50'}`}>
                <td className='py-2 border-b border-slate-300 text-center capitalize'>
                  {guest.civility}
                </td>
                <td className='py-2 border-b border-slate-300'>
                  <span className='text-gray-800 capitalize mr-1 font-bold'>
                    {guest.firstName}
                  </span>
                  <span className='text-gray-800 uppercase font-bold'>
                    {guest.lastName}
                  </span>
                </td>
                <td className='py-2 border-b border-slate-300'>
                  {guest.email}
                </td>
                <td className='py-2 border-b border-slate-300'>
                  (+{guest.phoneIndex}) {guest.phone}
                </td>
                <td className='py-2 border-b border-slate-300'>
                  <button type='button' className='mb-1' onClick={()=> remove(guest)}> 
                    <BiTrash className='text-red-600' />
                  </button>
                </td>
              </tr>
            )
          )
        }
      </tbody>
    </table>
    </>
  )
}

export default GuestList
