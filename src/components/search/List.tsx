import CampainItem from '@/components/campains/CampainItem'
import React from 'react'

function List({data = []}: { data: any[] }) {
	return (
    <>
     {
      data && data.length ? (
        <div className='search-result h-min-100  text-center'>
          <div className="hidden md:grid grid-cols-6 bg-blue-50 font-semibold">
            <span className='py-3 px-5 text-left'>Nom</span>
            <span className='py-3 px-5'>Dates</span>
            <span className='py-3 px-5'>Categorie</span>
            <span className='py-3 px-5'>Contacts</span>
            <span className='py-3 px-5'>Cannaux</span>

        {
          /** 
            <span className='py-3 px-5'>Transmis</span>
            <span className='py-3 px-5'>Lus</span>
            <span className='py-3 px-5'>Statut</span>
        */}
            <span className='py-3 px-5'/>
          </div>
          {data.map((item, index) => (
            <CampainItem item={item} key={`${item.id}-${index}`} index={index}/>
          ))}
        </div>
      ) : null
     }
    </>
	)
}

export default List
