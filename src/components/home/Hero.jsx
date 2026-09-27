import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import heroIllustration from '../../assets/images/hero-illustration.png'
import { heroContent } from '../../data/homeData.js'

function Hero() {
  return (
    <Container className="flex flex-col items-center gap-12 pt-12 md:pt-16 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:pt-[117px]">
      <div className="w-full lg:w-auto lg:pt-[26px]">
        <h1 className="max-w-[428px] text-[36px] font-bold md:text-[48px]">{heroContent.title}</h1>
        <p className="mt-6 max-w-[550px] text-[18px] whitespace-pre-wrap md:mt-[48px] md:text-[20px]">
          {heroContent.description}
        </p>
        <Button to="/signup" className="mt-8 w-[200px] md:mt-[65px]">Sign Up Now</Button>
      </div>

      <img
        src={heroIllustration}
        alt="Person analysing growing stats and graphs"
        width="401"
        height="371"
        className="aspect-[401/371] h-auto w-full max-w-[401px] shrink-0 object-contain"
      />
    </Container>
  )
}

export default Hero
