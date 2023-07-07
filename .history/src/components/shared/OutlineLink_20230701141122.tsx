import Link from 'next/link'
import React from 'react'
interface Params {
  link: string,
  label: string
}
function OutlineLink({link, label}: Params) {
  return (
    <Link href={link}>
      
    </Link>
  )
}

export default OutlineLink
