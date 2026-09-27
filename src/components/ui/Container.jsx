// 1121px content column; at 1440px it sits at the design's 149px left / 170px right edges
function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-[1164px] px-4 sm:px-6 xl:pr-[32px] xl:pl-[11px] ${className}`}>
      {children}
    </div>
  )
}

export default Container
