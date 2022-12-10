import { channel } from 'diagnostics_channel'
import Link from 'next/link'
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { CiMail } from 'react-icons/ci'
import { FaSms } from 'react-icons/fa'
import {getDisplayedDate} from 'utils'
function List({data = []}: {data: any[]}) {
  return (
    <div className='search-result'>
        <div className="grid grid-cols-7 bg-blue-50">
          <span className='py-3 px-5 font-semibold'>Date</span>
          <span className='py-3 px-5 font-semibold'>Contacts</span>
          <span className='py-3 px-5 font-semibold'>Medias</span>
          <span className='py-3 px-5 font-semibold'>Transmis</span>
          <span className='py-3 px-5 font-semibold'>Lus</span>
          <span className='py-3 px-5 font-semibold'>Statut</span>
          <span className='py-3 px-5 font-semibold'/>
        </div>
        {data.map((item, index)=> (
          <>
          <div className="grid grid-cols-7 items-center" key={item.slug}>
              <span className='py-3 px-5'>
                {getDisplayedDate(item.messages[0].date)}
              </span>
              <span className='py-3 px-5 font-semibold'>
                {item.guests ? item.guests.length: 0}
              </span>
              <span className='py-3 px-5 flex'>
                {item.channels.map((channelItem: any, channelIndex: number) => {
                  if(channelItem === "EMAIL")  return <CiMail  size={18} key={`channelIndex-${channelIndex}`}/>;
                  if(channelItem === "WHATSAPP")  return <BsWhatsapp  size={18} key={`channelIndex-${channelIndex}`}/>;
                  if(channelItem === "SMS")  return <FaSms  size={18} key={`channelIndex-${channelIndex}`}/>;
                })}
              </span>
              <span className='py-3 px-5'>Transmis</span>
              <span className='py-3 px-5'>Lus</span>
              <span className='py-3 px-5'>{item.status}</span>
                <Link className="text-blue-900 font-semibold" href={`/me/campagnes/${item.publicId}`}>Afficher</Link>
          </div>
          <pre>{JSON.stringify(item, null, 2)}</pre>
          </>
        ))}
    </div>
  )
}

export default List
