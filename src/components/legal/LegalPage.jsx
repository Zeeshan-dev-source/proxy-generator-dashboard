import Container from '../ui/Container.jsx'
import PageIntro from '../ui/PageIntro.jsx'
import PillButton from '../ui/PillButton.jsx'
import legalPanel from '../../assets/icons/legal-panel.svg'

// Shared layout for Terms of Service and Privacy Policy.
// `action` is optional content between the intro and the text panel.
function LegalPage({ page, action }) {
  return (
    <Container className="pt-12 pb-16 md:pt-16 lg:pt-[143px] lg:pb-[69px]">
      <PageIntro title={page.title} description={page.description} />

      {action && <div className="mt-6 lg:mt-[8px]">{action}</div>}

      <div className={`relative h-[500px] w-full xl:w-[1042px] ${action ? 'mt-6 lg:mt-[11px]' : 'mt-10 lg:mt-[51px]'}`}>
        <img
          src={legalPanel}
          alt=""
          width="1050"
          height="508"
          className="pointer-events-none absolute top-0 left-[-4px] h-[calc(100%+8px)] w-[calc(100%+8px)] max-w-none"
        />

        <div
          className="absolute top-[9px] right-[19px] bottom-[12px] left-0 scrollbar-panel overflow-y-auto"
          tabIndex={0}
          aria-label={`${page.title} text`}
        >
          <div className="flex flex-col gap-[22px] pt-[10px] pr-4 pb-[22px] pl-5 text-[14px] leading-[22px] sm:pr-[17px] sm:pl-[30px]">
            {page.sections.map((section, i) => (
              <section key={i} className="flex flex-col gap-[22px]">
                <h2 className="text-[18px] font-bold">{section.heading}</h2>
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      <PillButton to={page.link.to} className="mt-[33px]">
        {page.link.label}
      </PillButton>
    </Container>
  )
}

export default LegalPage
