import React from 'react'
import classNames from 'classnames';

function GuestLineItem({guest}: any) {
  return (
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
  )
}

export default GuestLineItem
