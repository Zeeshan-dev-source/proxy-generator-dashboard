import { useRef, useState } from 'react'
import Container from '../components/ui/Container.jsx'
import PageIntro from '../components/ui/PageIntro.jsx'
import FaqQuestionList from '../components/faq/FaqQuestionList.jsx'
import FaqAnswerPanel from '../components/faq/FaqAnswerPanel.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'
import { faqIntro, faqs, defaultFaqIndex } from '../data/faqData.js'

const ANSWER_ID = 'faq-answer'

function Faq() {
  const [activeIndex, setActiveIndex] = useState(defaultFaqIndex)
  const answerRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleSelect = (index) => {
    setActiveIndex(index)
    // On stacked layouts the answer sits below the list, so bring it into view
    if (!isDesktop) answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Container className="pt-12 pb-16 md:pt-16 lg:pt-[143px] lg:pb-[134px]">
      <PageIntro title={faqIntro.title} description={faqIntro.description} />

      <div className="mt-10 flex flex-col items-center gap-10 lg:mt-[51px] xl:ml-[39px] lg:flex-row lg:items-start">
        <FaqQuestionList faqs={faqs} activeIndex={activeIndex} onSelect={handleSelect} answerId={ANSWER_ID} />
        <FaqAnswerPanel ref={answerRef} id={ANSWER_ID} faq={faqs[activeIndex]} />
      </div>
    </Container>
  )
}

export default Faq
