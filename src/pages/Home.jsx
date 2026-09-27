import SectionDivider from '../components/ui/SectionDivider.jsx'
import Hero from '../components/home/Hero.jsx'
import Experts from '../components/home/Experts.jsx'
import Pricing from '../components/home/Pricing.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import CallToAction from '../components/home/CallToAction.jsx'

function Home() {
  return (
    <div className="pb-16 lg:pb-[144px]">
      <Hero />
      <SectionDivider className="mt-12 lg:mt-[47px]" />
      <div className="mt-12 lg:mt-[56px]">
        <Experts />
      </div>
      <SectionDivider className="mt-12 lg:mt-[53.7px]" />
      <div className="mt-12 lg:mt-[61px]">
        <Pricing />
      </div>
      <div className="mt-16 lg:mt-[81px]">
        <Testimonials />
      </div>
      <div className="mt-20 lg:mt-[110px]">
        <CallToAction />
      </div>
    </div>
  )
}

export default Home
