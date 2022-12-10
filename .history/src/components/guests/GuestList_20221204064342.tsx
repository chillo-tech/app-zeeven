import React from 'react'
import  {DeleteOutlined} from '@ant-design/icons';
import { Profile } from '../../context/event-data';

function GuestList({guests}: {guests: {id: string, profile: Profile}[]}) {
  return (
    <table className="table-auto my-4 border-collapse">
      <tbody>
        {
          guests.map(
            (guest, index) => (
              <tr key={index}>
                <td className='py-2 border-b border-slate-300 text-center align-middle'>
                   <input type='checkbox' />
                </td>
                <td className='py-2 border-b border-slate-300 text-center capitalize'>
                  {guest.profile.civility}
                </td>
                <td className='py-2 border-b border-slate-300'>
                  <span className='text-gray-800 capitalize mr-1 font-bold'>
                    {guest.profile.firstName}
                  </span>
                  <span className='text-gray-800 uppercase font-bold'>
                    {guest.profile.lastName}
                  </span>
                </td>
                <td className='py-2 border-b border-slate-300'>
                  {guest.profile.email}
                </td>
                <td className='py-2 border-b border-slate-300'>
                  {guest.profile.phone}
                </td>
                <td className='py-2 border-b border-slate-300'>
                  <button type='button' className='mb-1'> 
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