import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Guest } from 'types/Guest';

function GuestList({guests}: {guests: Guest[]}) {
  console.log('====================================');
  console.log(guests);
  console.log('====================================');
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
                  {guest.phone}
                </td>
                <td className='py-2 border-b border-slate-300'>
                  <button type='button' className='mb-1'> 
                    <RiDeleteBin6Line className='text-red-600' />
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