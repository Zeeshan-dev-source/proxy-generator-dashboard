import StarRating from '../ui/StarRating.jsx'

function TestimonialCard({ testimonial, className = '', ...props }) {
  return (
    <article
      className={`h-[423px] w-[398px] max-w-full overflow-hidden rounded-[12px] bg-surface text-center shadow-testimonial ${className}`}
      {...props}
    >
      <div className="flex items-start pt-[37px] pr-4 pl-4 text-left sm:pr-[22px] sm:pl-[22px]">
        <img src={testimonial.avatar} alt={testimonial.name} width="72" height="72" className="shrink-0" />
        <div className="mt-[7px] ml-[10px] flex-1">
          <p className="text-[24px] font-bold">{testimonial.name}</p>
          <div className="mt-[7px] flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <p className="text-[18px]">{testimonial.role}</p>
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>

      <h3 className="mt-[25px] px-4 text-[20px] font-bold sm:px-0 sm:text-[24px] sm:whitespace-nowrap">{testimonial.title}</h3>
      <p className="mx-auto mt-[27px] w-[355px] max-w-[calc(100%-2rem)] text-[16px] sm:text-[18px]">{testimonial.text}</p>
    </article>
  )
}

export default TestimonialCard
