import classNames from 'classnames'
import React from 'react'

function RenderHtmlContent({content, classes}:any) {
  return (
    <div
     className={classNames('html-text [&>p]:whitespace-normal', classes)}
      dangerouslySetInnerHTML={{
        __html: content,
      }}/>
  )
} 

export default RenderHtmlContent
