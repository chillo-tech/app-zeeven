import React from 'react'
import getDisplayedDate from 'utils'
function List({data = []}: {data: any[]}) {
  return (
    <div className='search-result'>
      <ul>
        {data.map((item, index)=> (
          <div className="grid" key={item.slug}>
            <span>{getDisplayedDate(data.date)}</span>
            ddd
          </div>
        ))}
      </ul>
    </div>
  )
}

export default List
