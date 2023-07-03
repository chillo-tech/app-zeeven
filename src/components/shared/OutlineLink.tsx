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
      <span className='bg-app-yellow rounded-full mr-2 p-0'><RxTriangleRight className='!m-0 text-app-blue text-3xl' /></span> {label}
    </Link>
  )
}

export default OutlineLink
