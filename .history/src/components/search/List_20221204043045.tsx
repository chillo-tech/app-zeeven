import { channel } from 'diagnostics_channel'
import Link from 'next/link'
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { CiMail } from 'react-icons/ci'
import { FaSms } from 'react-icons/fa'
import {getDisplayedDate} from 'utils'
function List({data = []}: {data: any[]}) {
  return (
    <div className='search-result h-min-100  text-center'>
        <div className="grid grid-cols-8 bg-blue-50 font-semibold">
          <span className='py-3 px-5 text-left'>Date</span>
          <span className='py-3 px-5'>Categorie</span>
          <span className='py-3 px-5'>Contacts</span>
          <span className='py-3 px-5'>Medias</span>
          <span className='py-3 px-5'>Transmis</span>
          <span className='py-3 px-5'>Lus</span>
          <span className='py-3 px-5'>Statut</span>
          <span className='py-3 px-5'/>
        </div>
        {data.map((item, index)=> (
          <>
          </>
        ))}
    </div>
  )
}

export default List
