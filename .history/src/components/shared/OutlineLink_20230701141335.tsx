import Link from 'next/link'
import React from 'react'
interface Params {
  link: string,
  label: string
}
function OutlineLink({link, label}: Params) {
  return (
    <Link href={link} className="text-white text-app-blue  border border-blue-800 flex items-center justify-between px-3 py-2">
      {label}
    </Link>
  )
}

export default OutlineLink
