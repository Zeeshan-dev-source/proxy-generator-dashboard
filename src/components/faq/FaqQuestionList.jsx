import listPanel from '../../assets/icons/faq-list-panel.svg'
import chevronMuted from '../../assets/icons/chevron-right-muted.svg'
import chevronActive from '../../assets/icons/chevron-right-active.svg'

function FaqQuestionList({ faqs, activeIndex, onSelect, answerId }) {
  return (
    <div className="relative h-[500px] w-full max-w-[371px] shrink-0">
      <img
        src={listPanel}
        alt=""
        width="379"
        height="508"
        className="pointer-events-none absolute top-0 left-[-4px] h-[calc(100%+8px)] w-[calc(100%+8px)] max-w-none"
      />

      <div className="absolute top-[7px] right-[1px] bottom-[14px] left-0 scrollbar-panel overflow-y-auto">
        <ul className="flex flex-col gap-[16px] pt-[6px] pb-4">
          {faqs.map((faq, i) => {
            const isActive = i === activeIndex
            return (
              <li key={i}>
                <button
                  type="button"
                  className="group flex min-h-[28px] w-full cursor-pointer items-center pl-[20px] text-left"
                  aria-current={isActive}
                  aria-controls={answerId}
                  onClick={() => onSelect(i)}
                >
                  <span className={`size-[13px] shrink-0 transition-colors ${isActive ? 'bg-cream' : 'bg-muted group-hover:bg-cream/70'}`} />
                  <span className={`ml-[31px] flex-1 pr-[13px] text-[14px] leading-[16px] ${isActive ? 'font-bold' : ''}`}>
                    {faq.question}
                  </span>
                  <img src={isActive ? chevronActive : chevronMuted} alt="" width="20" height="20" className="ml-auto shrink-0" />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default FaqQuestionList
