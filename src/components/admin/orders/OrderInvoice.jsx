import itemBar from '../../../assets/admin/stat-bar-lavender.svg'
import { formatPrice } from './orderUtils.js'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const formatDay = (iso) => {
  const d = new Date(iso)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
const formatNumericDate = (iso) => {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
}

// Value with a small muted caption under it (the caption overlaps the value's line box slightly, as in the design)
function Field({ value, label, valueClass = 'text-[22px] leading-[26px]', gap = '-mt-[2px]', className = '' }) {
  return (
    <div className={className}>
      <p className={`font-bold ${valueClass}`}>{value}</p>
      <p className={`text-[12px] leading-[14px] text-muted ${gap}`}>{label}</p>
    </div>
  )
}

// Big card on the order page: customer, invoice info, line items and totals
function OrderInvoice({ order, subtotal, taxes, total }) {
  const { customer } = order

  return (
    <section
      aria-label="Invoice"
      className="mt-[44px] flex flex-col rounded-[15px] bg-surface px-5 pt-6 pb-8 shadow-card sm:px-8 xl:min-h-[582px] xl:w-[998px] xl:pt-[25px] xl:pr-[49px] xl:pb-[64px] xl:pl-[53px]"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="pt-[1px]">
          <Field value={order.user} label="Username" />
          <p className="mt-[20px] text-[18px] leading-[22px] font-bold">{customer.name}</p>
          <p className="mt-[5px] max-w-[224px] text-[14px] leading-[14px]">{customer.address}</p>
          <p className="mt-[2px] text-[12px] leading-[14px] text-muted">Billing Address</p>
          <Field
            value={customer.email}
            label="E-mail Address"
            valueClass="text-[18px] leading-[22px] break-all"
            gap="-mt-[1px]"
            className="mt-[32px]"
          />
        </div>

        <div className="flex flex-col gap-[22px] pt-[1px] sm:text-right">
          <Field value={formatPrice(total)} label="Total amount" />
          <Field value={`#${order.id}`} label="Invoice" />
          <Field value={formatNumericDate(order.date)} label="Date of Purchase" />
        </div>
      </div>

      <ul className="mt-10 flex flex-col gap-4 xl:mt-[54px]" aria-label="Items">
        {order.items.map((item) => (
          <li key={item.name} className="flex items-center xl:pl-[16px]">
            <img src={itemBar} alt="" width="4" height="42" className="shrink-0 self-stretch sm:self-auto" />
            <div className="ml-[17px] grid flex-1 grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-[16px] sm:text-[20px] md:grid-cols-[267px_205px_1fr_auto] md:items-center md:gap-0">
              <span className="opacity-50">{item.name}</span>
              <span className="text-right text-[18px] sm:text-[22px] md:order-last">{formatPrice(item.price)}</span>
              <span className="font-light opacity-50">{item.size}</span>
              <span className="font-light opacity-50">{formatDay(item.date)}</span>
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-10 ml-auto grid w-full max-w-[217px] grid-cols-[1fr_auto] items-center gap-y-[27px] xl:mt-auto">
        <dt className="text-[20px] font-light opacity-50">Taxes</dt>
        <dd className="text-right text-[22px]">{formatPrice(taxes)}</dd>
        <dt className="text-[20px] font-light opacity-50">Grand Total</dt>
        <dd className="text-right text-[28px] font-bold">{formatPrice(total)}</dd>
      </dl>
      <p className="sr-only">Subtotal {formatPrice(subtotal)}</p>
    </section>
  )
}

export default OrderInvoice
