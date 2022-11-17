import React from 'react'
import  {DeleteOutlined} from '@ant-design/icons';
import { Guest } from '../../../../../types/Guest';
import { Profile } from '../../../../../types/Profile';

type Params = {
  remove: (guest: Profile)=> void,
  guests: Profile[]
}

function GuestList({guests, remove}: Params) {
  return (
    <table className={`table-auto my-4 border-collapse w-full`}>
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
                    <DeleteOutlined className='text-red-600' />
                  </button>
                </td>
              </tr>
            )
          )
        }
      </tbody>
    </table>
  )
}

export default GuestList