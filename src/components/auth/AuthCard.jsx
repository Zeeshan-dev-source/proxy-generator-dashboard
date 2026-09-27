// Dark 585px card with title + subtitle used by the auth pages
function AuthCard({ title, subtitle, children }) {
  return (
    <div className="mx-auto w-full max-w-[585px] rounded-[15px] bg-surface px-6 pt-10 pb-10 shadow-cta sm:pr-[65px] sm:pl-[80px] sm:pt-[85px] sm:pb-[53px]">
      <h1 className="text-[26px] font-bold sm:text-[30px]">{title}</h1>
      <p className="mt-[12px] text-[18px] text-muted">{subtitle}</p>
      {children}
    </div>
  )
}

export default AuthCard
