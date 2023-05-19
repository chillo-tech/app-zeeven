import Metadata from '@/components/Metadata'
import Description from '@/components/home-page/Description'
import Hero from '@/components/home-page/Hero'
import Solutions from '@/components/home-page/Solutions'
import StartConversation from '@/components/home-page/StartConversation'
import OpenedLayout from '@/containers/opened'
import React from 'react'

function Home() {
  return (
    <OpenedLayout>
    <Metadata  entry={{title: 'Informez nos contacts de vos évènements', description: 'Informez nos contacts de vos évènements'}}/>

      <Hero />
      <Description />
      <Solutions />
    </OpenedLayout>
  )
}

export default Home
