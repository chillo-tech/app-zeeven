import Link from 'next/link'
import React from 'react'
import {getDisplayedDate} from 'utils'
function List({data = []}: {data: any[]}) {
  return (
    <div className='search-result'>
        <div className="grid grid-cols-7">
          <span>Date</span>
          <span>Contacts</span>
          <span>Statut</span>
          <span/>
        </div>
        {data.map((item, index)=> (
          <>
          <div className="grid grid-cols-7" key={item.slug}>
            <span>{getDisplayedDate(item.messages[0].date)}</span>
            <span>{item.guests ? item.guests.length: 0}</span>
            <span>{item.status}</span>
            <Link className="text-blue-900 font-semibold" href={`/me/campagnes/${item.publicId}`}>Afficher</Link>
          </div>
          <pre>{JSON.stringify(item, null, 2)}</pre>
          </>
        )}
    </div>
  )
}

export default List
