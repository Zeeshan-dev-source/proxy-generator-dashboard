import { useRef, useState } from 'react'
import TestimonialCard from './TestimonialCard.jsx'
import useMediaQuery from '../../hooks/useMediaQuery.js'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import { testimonials } from '../../data/homeData.js'

const SWIPE_THRESHOLD = 50

// Desktop layout from the design: side cards are 280px wide (398 * 0.7035),
// 60px from the featured card, and sit slightly lower
const SIDE_SCALE = 0.7035
const SIDE_SHIFT_X = 399
const SIDE_SHIFT_Y = 18

// Card's position relative to the active one, wrapped so it takes the shortest way round
function getOffset(index, active, count) {
  const diff = (((index - active) % count) + count) % count
  return diff > count / 2 ? diff - count : diff
}


function getCardStyle(offset, isDesktop) {
  const distance = Math.abs(offset)

  if (isDesktop) {
    return {
      transform: `translateX(calc(-50% + ${offset * SIDE_SHIFT_X}px)) translateY(${distance ? SIDE_SHIFT_Y : 0}px) scale(${distance ? SIDE_SCALE : 1})`,
      opacity: distance <= 1 ? 1 : 0,
      zIndex: 10 - distance,
    }
  }

  // Smaller screens: one card at a time, neighbours wait just off-screen
  return {
    transform: `translateX(calc(-50% + ${offset} * (100% + 24px)))`,
    opacity: distance <= 1 ? 1 : 0,
    zIndex: 10 - distance,
  }
}

function Testimonials() {
  // Start on the second testimonial so the first render matches the design (left, center, right)
  const [active, setActive] = useState(1)
  const touchStartX = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  const count = testimonials.length
  const showPrevious = () => setActive((i) => (i - 1 + count) % count)
  const showNext = () => setActive((i) => (i + 1) % count)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > SWIPE_THRESHOLD) showPrevious()
    if (delta < -SWIPE_THRESHOLD) showNext()
    touchStartX.current = null
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') showPrevious()
    if (e.key === 'ArrowRight') showNext()
  }

  return (
    <section
      className="mx-auto w-full max-w-[1440px] px-4 sm:px-6"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onKeyDown={handleKeyDown}
    >
      <h2 className="text-center text-[26px] font-bold md:text-[32px]">What Our Clients Say About Us</h2>

      <div
        className="relative mt-10 h-[423px] overflow-hidden lg:mt-[60px] xl:overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-live="polite"
      >
        {testimonials.map((testimonial, i) => {
          const offset = getOffset(i, active, count)
          return (
            <TestimonialCard
              key={i}
              testimonial={testimonial}
              className="absolute top-0 left-1/2 transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={getCardStyle(offset, isDesktop)}
              aria-hidden={offset !== 0}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            />
          )
        })}
      </div>

      <div className="mt-[35px] flex items-center justify-center gap-6 sm:gap-[36px]">
        <button
          type="button"
          aria-label="Previous testimonial"
          className="size-[36px] cursor-pointer transition hover:opacity-70"
          onClick={showPrevious}
        >
          <img src={chevronLeft} alt="" width="36" height="36" className="rotate-90" />
        </button>

        <div className="flex gap-[15px]">
          {testimonials.map((testimonial, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${count}`}
              aria-current={i === active}
              className={`size-[17px] cursor-pointer rounded-full transition-colors duration-300 ${i === active ? 'bg-dot-active' : 'bg-dot hover:bg-cream'}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          className="size-[36px] cursor-pointer transition hover:opacity-70"
          onClick={showNext}
        >
          <img src={chevronRight} alt="" width="36" height="36" className="-rotate-90" />
        </button>
      </div>
    </section>
  )
}

export default Testimonials
