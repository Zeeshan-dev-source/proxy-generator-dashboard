import PillButton from '../ui/PillButton.jsx'
import { supportContent } from '../../data/faqData.js'

function FaqAnswerPanel({ faq, id, ref }) {
  return (
    <section
      ref={ref}
      id={id}
      aria-live="polite"
      className="flex min-h-[420px] w-full scroll-mt-24 flex-col rounded-[15px] bg-surface px-6 pt-[16px] pb-[27px] shadow-card lg:h-[500px] lg:max-w-[592px] lg:flex-1"
    >
      <div key={faq.question} className="animate-fade-in">
        <h2 className="text-[20px] leading-[28px] font-bold">{faq.title ?? faq.question}</h2>
        <div className="mt-[15px] flex max-w-[506px] flex-col gap-[26px] text-[14px] leading-[16px]">
          {faq.answer.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col pt-10">
        <h3 className="text-[16px] leading-[28px] font-bold">{supportContent.title}</h3>
        <p className="mt-[7px] max-w-[470px] text-[14px] leading-[16px]">{supportContent.text}</p>
        <PillButton to="/dashboard/support" className="mt-[19px] self-center">{supportContent.cta}</PillButton>
      </div>
    </section>
  )
}

export default FaqAnswerPanel
