import Container from '../ui/Container.jsx'
import PlanCard from './PlanCard.jsx'
import { plans } from '../../data/homeData.js'

function Pricing() {
  return (
    <Container>
      <h2 className="text-[26px] font-bold md:text-[32px]">Choose a great plan now</h2>
      <div className="mt-8 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:mt-[33.5px] lg:grid-cols-3 lg:gap-6 xl:gap-[51.15px]">
        {plans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} className="md:last:col-span-2 lg:last:col-span-1" />
        ))}
      </div>
    </Container>
  )
}

export default Pricing
