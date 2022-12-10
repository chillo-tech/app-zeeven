import React from 'react'

function List({data}: {data: any[]}) {
  return (
    <div className='search-result'>
      <ul>
        {data.map((item, index)=> (
          <div className="grid">
            ddd
          </div>
        ))}
      </ul>
    </div>
  )
}

export default List
