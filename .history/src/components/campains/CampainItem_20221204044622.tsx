import Link from 'next/link';
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs';
import { CiMail } from 'react-icons/ci';
import { FaSms } from 'react-icons/fa';
import { getDisplayedDate, statusFromLabel,categoryFromLabel } from 'utils';

function CampainItem({item, index}:{item:any, index: number}) {
  return (
    <div className={`grid grid-cols-8 items-center ${index%2 === 1 ? 'bg-blue-50': ''}`} key={item.slug}>
        <span className='py-3 px-5 text-left'>
          {getDisplayedDate(item.messages[0].date)}
        </span>
        <span className='py-3 px-5'>
          {categoryFromLabel(item.category.label)}
        </span>
        <span className='py-3 px-5 font-semibold'>
          {item.guests ? item.guests.length: 0}
        </span>
        <span className='py-3 px-5 flex items-center justify-center'>
          {item.channels.map((channelItem: any, channelIndex: number) => {
            if(channelItem === "EMAIL")  return <CiMail className="ml-3 text-blue-600" size={22} key={`channelIndex-${channelIndex}`}/>;
            if(channelItem === "WHATSAPP")  return <BsWhatsapp className="ml-3 text-green-600" size={22} key={`channelIndex-${channelIndex}`}/>;
            if(channelItem === "SMS")  return <FaSms className="ml-3" size={22} key={`channelIndex-${channelIndex}`}/>;
          })}
        </span>
        <span className='py-3 px-5'>Transmis</span>
        <span className='py-3 px-5'>Lus</span>
        <span className='py-3 px-5'>{statusFromLabel(item.status)}</span>
        <Link className="text-blue-900 font-semibold text-center" href={`/me/campagnes/${item.slug}`}>Afficher</Link>
    </div>
  )
}

export default CampainItem