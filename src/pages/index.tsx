import Metadata from '@/components/Metadata'
import Description from '@/components/home-page/Description'
import Hero from '@/components/home-page/Hero'
import Solutions from '@/components/home-page/Solutions'
import OpenedLayout from '@/containers/opened'

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

