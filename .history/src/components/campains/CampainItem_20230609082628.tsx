import Link from 'next/link';
import React from 'react'
import {BsWhatsapp} from 'react-icons/bs';
import {CiMail} from 'react-icons/ci';
import {FaSms} from 'react-icons/fa';
import {categoryFromLabel, getDisplayedDate, statusFromLabel} from '@/utils';

function CampainItem({item, index}: { item: any, index: number }) {
	return (
		<div className={`grid md:grid-cols-5 md:items-center px-3 md:px-0 py-3 md:py-0 mb-2 md:mb-0 ${index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}`}
			 key={`${item.slug}-${index}`}>
      <p className='md:justify-start py-2 md:py-3 md:px-5 flex justify-between'>
        <span className='md:hidden'>Date</span>
        <span className='text-left'>
          {getDisplayedDate(item.messages[0].date)}
        </span>
      </p>
      <p className='md:justify-center py-2 md:py-3 md:px-5 flex justify-between'>
        <span className='md:hidden'>Categorie</span>
        <span className='text-left'>
        {categoryFromLabel(item.category.label)}
        </span>
      </p>
      <p className='md:justify-center py-2 md:py-3 md:px-5 flex justify-between'>
        <span className='md:hidden'>Contacts</span>
        <span className='text-left'>
         {item.guests ? item.guests.length : 0}
        </span>
      </p>
      <p className='md:justify-center py-2 md:py-3 md:px-5 flex justify-between'>
        <span className='md:hidden'>Cannaux</span>
        <span className='text-left flex'>
            {item.channels.map((channelItem: any, channelIndex: number) => {
            if (channelItem === "EMAIL") return <CiMail className="ml-3 text-blue-600" size={22}
                                  key={`channelIndex-${channelIndex}`}/>;
            if (channelItem === "WHATSAPP") return <BsWhatsapp className="ml-3 text-green-600" size={22}
                                    key={`channelIndex-${channelIndex}`}/>;
            if (channelItem === "SMS") return <FaSms className="ml-3" size={22}
                                key={`channelIndex-${channelIndex}`}/>;
          })}
        </span>
      </p>
      <p className='md:justify-center py-2 md:py-3 md:px-5 flex justify-end'>
			  <Link className="text-blue-900 font-semibold text-center" href={`/me/message/${item.slug}`}>Afficher</Link>
      </p>
        {
          /** 
            <span className='md:justify-center py-2 md:py-3 md:px-5'>Transmis</span>
			<span className='py-3 px-5'>Lus</span>
			<span className='py-3 px-5'>{statusFromLabel(item.status)}</span>
          */
        }
			
		</div>
	)
}

export default CampainItem
