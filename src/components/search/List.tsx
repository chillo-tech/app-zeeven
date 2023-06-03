import CampainItem from '@/components/campains/CampainItem'
import React from 'react'

function List({data = []}: { data: any[] }) {
  console.log('====================================');
  console.log({data});
  console.log('====================================');
	return (
    <>
     {
      data && data.length ? (
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
