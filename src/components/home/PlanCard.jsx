function PlanCard({ plan, className = '' }) {
  return (
    <article className={`flex h-[339.45px] w-full max-w-[337.9px] flex-col rounded-[15px] bg-surface pt-[23.25px] pb-[31px] shadow-card ${className}`}>
      <div className="flex items-center pl-[22px]">
        <span className="flex h-[40.3px] w-[42px] items-center justify-center">
          <img src={plan.icon.src} alt="" width={plan.icon.width} height={plan.icon.height} />
        </span>
        <h3 className={`ml-[14px] text-[32px] leading-[28px] font-bold ${plan.titleClass}`}>{plan.title}</h3>
      </div>

      <ul className="mt-[20px] list-disc pl-[53px] text-[16px] leading-[28px]">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <button type="button" className="relative mx-auto mt-auto h-[49.6px] w-[248px] cursor-pointer transition hover:brightness-110">
        <img src={plan.buttonBg} alt="" width="248" height="49.6" className="absolute inset-0" />
        <span className="relative font-inter text-[20px] font-bold text-surface">{plan.cta}</span>
      </button>
    </article>
  )
}

export default PlanCard
