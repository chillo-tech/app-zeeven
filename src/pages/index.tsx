import Description from '../components/home-page/Description'
import Hero from '../components/home-page/Hero'
import Statistics from '../components/home-page/Statistics'
import Layout from '../containers/opened'


export default function Home() {
  return (
    <Layout>
      <Hero />
      <Statistics />
      <Description />
    </Layout>
  )
}
