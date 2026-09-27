import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FaqQuestionList from '../../components/faq/FaqQuestionList.jsx'
import FaqAnswerPanel from '../../components/faq/FaqAnswerPanel.jsx'
import useMediaQuery from '../../hooks/useMediaQuery.js'
import arrowLeft from '../../assets/admin/arrow-alt-left.svg'
import { faqs, defaultFaqIndex } from '../../data/faqData.js'

const ANSWER_ID = 'dashboard-faq-answer'

// The public FAQ inside the user dashboard, opened from Support's "View our FAQ".
// The "FAQ" title lines up with the Support page titles; "Back to Support" sits just above it.
function UserSupportFaq() {
  const [activeIndex, setActiveIndex] = useState(defaultFaqIndex)
  const answerRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleSelect = (index) => {
    setActiveIndex(index)
    // On stacked layouts the answer sits below the list, so bring it into view
    if (!isDesktop) answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="max-w-[1002px] xl:-mt-[13px] xl:pb-[75px]">
      <Link to="/dashboard/support" className="-ml-[3px] flex w-fit items-center gap-[3px] text-[12px] leading-[28px] underline hover:text-muted">
        <img src={arrowLeft} alt="" width="24" height="24" />
        Back to Support
      </Link>
      <h2 className="text-[20px] leading-[28px] font-bold">FAQ</h2>

      <div className="mt-[16px] flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-[42px]">
        <FaqQuestionList faqs={faqs} activeIndex={activeIndex} onSelect={handleSelect} answerId={ANSWER_ID} />
        <FaqAnswerPanel ref={answerRef} id={ANSWER_ID} faq={faqs[activeIndex]} />
      </div>
    </div>
  )
}

export default UserSupportFaq
