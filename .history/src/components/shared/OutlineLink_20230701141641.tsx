import Link from 'next/link'
import React from 'react'
interface Params {
  link: string,
  label: string
}
function OutlineLink({link, label}: Params) {
  return (
    <Link href={link} className="text-app-blue border border-app-blue inline-block px-3 py-2 rounded-lg">
      {label}
    </Link>
  )
}

export default OutlineLink
