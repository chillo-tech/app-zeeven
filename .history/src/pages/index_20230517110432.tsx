import Description from '@/components/home-page/Description'
import Hero from '@/components/home-page/Hero'
import OpenedLayout from '@/containers/opened'
import React from 'react'

function Home() {
  return (
    <OpenedLayout>
      <Hero />
      <Description />
    </OpenedLayout>
  )
}

export default Home
