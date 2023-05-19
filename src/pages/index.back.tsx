import { getSession } from 'next-auth/react'
import Description from '../components/home-page/Description'
import Hero from '../components/home-page/Hero'
import Footer from '../containers/components/Footer'

export default function Home() {
  return (
    <section>
      <Hero />
      <Description />
      <Footer />
    </section>
  )
}
