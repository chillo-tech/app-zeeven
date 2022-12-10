import React from 'react'
import {getDisplayedDate} from 'utils'
function List({data = []}: {data: any[]}) {
  return (
    <div className='search-result'>
      <ul>
        {data.map((item, index)=> (
          <>
          <div className="grid" key={item.slug}>
            <span>{getDisplayedDate(item.messages[0].date)}</span>
            <span>{getDisplayedDate(item.status)}</span>
          </div>
          <pre>{JSON.stringify(item, null, 2)}</pre>
          </>
        ))}
      </ul>
    </div>
  )
}

export default List
