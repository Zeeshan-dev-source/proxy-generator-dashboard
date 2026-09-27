import Button from '../ui/Button.jsx'

function CallToAction() {
  return (
    <section className="px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-[1095px] flex-col items-center rounded-[20px] bg-surface px-6 pt-10 pb-8 text-center shadow-cta md:h-[187px] md:pt-[45px] md:pb-[25px]">
        <h2 className="text-[24px] font-bold md:text-[32px]">
          Don’t wait any longer, start building your proxy empire today!
        </h2>
        <Button to="/signup" className="mt-[36px] w-[159px]">Sign Up Now</Button>
      </div>
    </section>
  )
}

export default CallToAction
