import Container from '../ui/Container.jsx'
import expertsImage from '../../assets/images/experts.webp'
import { expertsContent } from '../../data/homeData.js'

function Experts() {
  return (
    <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
      <img
        src={expertsImage}
        alt="Team of experts working together"
        width="422"
        height="343"
        loading="lazy"
        className="mx-auto aspect-[422/343] h-auto w-full max-w-[422px] shrink-0 object-cover lg:mx-0"
      />

      <div className="flex flex-col items-start lg:items-end lg:text-right">
        <h2 className="text-[26px] font-bold md:text-[32px]">{expertsContent.title}</h2>
        <div className="mt-6 max-w-[550px] text-[18px] md:text-[20px] lg:mt-[50px] lg:mr-[5px]">
          <p className="whitespace-pre-wrap">{expertsContent.intro}</p>
          <ul className="mt-6 list-inside list-disc lg:mt-[43.4px]">
            {expertsContent.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <p className="mt-6 whitespace-pre-wrap lg:mt-[43.4px]">{expertsContent.outro}</p>
        </div>
      </div>
    </Container>
  )
}

export default Experts
