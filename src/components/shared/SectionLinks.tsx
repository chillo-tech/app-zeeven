import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

function SectionLinks() {
  return (
    <p className='flex gap-6 items-start justify-start flex-col md:flex-row'>
    <Link href="/nouvelle-campagne" className={classNames('yellow-button')} >
      Envoyez votre premier message <BsArrowRight className='ml-4' />
    </Link>
    <Link href="/contactez-nous" className={classNames('blue-link', 'underline')}>
      Demandez une démo
    </Link>
  </p>
  )
}

export default SectionLinks
