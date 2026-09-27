// Title + intro text shared by the content pages (FAQ, Terms, ...)
function PageIntro({ title, description }) {
  return (
    <>
      <h1 className="text-[36px] font-bold md:text-[48px]">{title}</h1>
      <p className="mt-6 max-w-[550px] text-[18px] whitespace-pre-wrap md:text-[20px] lg:mt-[34px]">{description}</p>
    </>
  )
}

export default PageIntro
