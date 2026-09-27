import background from '../../assets/images/background.png'

// 1440px background tile, mirrored vertically below; stretches on pages taller than 2880px
function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col" aria-hidden="true">
      <img src={background} alt="" className="h-[max(1440px,50%)] w-full shrink-0 object-cover" />
      <img src={background} alt="" className="h-[max(1440px,50%)] w-full shrink-0 -scale-y-100 object-cover" />
    </div>
  )
}

export default PageBackground
