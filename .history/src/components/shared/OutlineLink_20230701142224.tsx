import Link from 'next/link'
import React from 'react'
import { RxTriangleRight } from 'react-icons/rx'
interface Params {
  link: string,
  label: string
}
function OutlineLink({link, label}: Params) {
  return (
    <Link href={link} className="text-app-blue border border-app-blue inline-block px-3 py-2 rounded-lg flex items-center">
      <RxTriangleRight className='text-app-blue text-3xl bg-app-yello' /> {label}
    </Link>
  )
}

export default OutlineLink
