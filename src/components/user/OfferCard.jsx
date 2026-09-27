// 218x219 offer card with the coloured "Buy for $X.00/day" button (shrinks a little if the row is tight)
function OfferCard({ offer, onBuy }) {
  const { icon } = offer

  return (
    <article className="relative h-[219px] w-full max-w-[218px] rounded-[15px] bg-surface shadow-card">
      <img
        src={icon.src}
        alt=""
        width={icon.width}
        height={icon.height}
        className={`absolute ${icon.flip ? '-scale-y-100' : ''}`}
        style={{ left: icon.left, top: icon.top }}
      />
      <h3 className={`absolute top-[16px] left-[48px] text-[16px] leading-[28px] font-bold ${offer.titleClass}`}>{offer.title}</h3>
      <ul className="absolute top-[47px] right-[12px] left-[16px] list-disc text-[14px] leading-[28px]">
        {offer.features.map((feature) => (
          <li key={feature} className="ms-[21px]">
            {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onBuy(offer)}
        className="absolute top-[165.4px] left-1/2 flex h-[32px] w-[160px] -translate-x-1/2 cursor-pointer items-center justify-center transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:outline-none"
      >
        <img src={offer.buttonBg} alt="" width="160" height="32" className="absolute inset-0" />
        <span className="relative font-inter text-[14px] font-medium text-surface">Buy for ${offer.pricePerDay.toFixed(2)}/day</span>
      </button>
    </article>
  )
}

export default OfferCard
