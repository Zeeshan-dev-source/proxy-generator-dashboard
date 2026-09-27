import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PillButton from '../../components/ui/PillButton.jsx'
import OrderInvoice from '../../components/admin/orders/OrderInvoice.jsx'
import { useOrders } from '../../context/OrdersContext.jsx'
import { ORDER_STATUS, TAX_RATE } from '../../data/ordersData.js'
import { formatPrice } from '../../components/admin/orders/orderUtils.js'
import arrowLeft from '../../assets/admin/arrow-alt-left.svg'
import SummaryStat, { SummaryCard } from '../../components/admin/ui/SummaryStat.jsx'
import barGreen from '../../assets/admin/stat-bar-green.svg'
import barPink from '../../assets/admin/stat-bar-pink.svg'

function BackToOrders() {
  return (
    <Link to="/admin/orders" className="-ml-[3px] flex w-fit items-center gap-[3px] text-[12px] leading-[28px] underline hover:text-muted">
      <img src={arrowLeft} alt="" width="24" height="24" />
      Back to Orders
    </Link>
  )
}

function OrderDetail() {
  const { orderId } = useParams()
  const { getOrder, markPaid, markFulfilled } = useOrders()
  const [invoiceSent, setInvoiceSent] = useState(false)
  const order = getOrder(orderId)

  useEffect(() => {
    if (!invoiceSent) return undefined
    const timer = setTimeout(() => setInvoiceSent(false), 2500)
    return () => clearTimeout(timer)
  }, [invoiceSent])

  if (!order) {
    return (
      <div className="pb-16 xl:-mt-[26px]">
        <BackToOrders />
        <h2 className="-mt-[2px] text-[20px] leading-[28px] font-bold">Order #{orderId} not found</h2>
        <p className="mt-4 text-[14px] text-muted">This order doesn’t exist or has been removed.</p>
      </div>
    )
  }

  const isPaid = order.status !== ORDER_STATUS.active
  const isFulfilled = order.status === ORDER_STATUS.fulfilled
  const subtotal = order.items.reduce((sum, item) => sum + item.price, 0)
  const taxes = Math.round(subtotal * TAX_RATE * 100) / 100
  const total = subtotal + taxes

  return (
    <div className="max-w-[1002px] xl:-mt-[26px] xl:pb-[286px]">
      <BackToOrders />
      <h2 className="-mt-[2px] text-[20px] leading-[28px] font-bold">Order #{order.id}</h2>

      {/* Green bar = done, pink bar = still to do (as in the design) */}
      <SummaryCard className="mt-[16px]">
        <SummaryStat bar={barGreen} value={formatPrice(total)} label="Invoiced" />
        <SummaryStat bar={isPaid ? barGreen : barPink} value={isPaid ? 'Paid' : 'Not Paid'} label="Status" />
        <SummaryStat bar={isFulfilled ? barGreen : barPink} value={isFulfilled ? 'Fulfilled' : 'Not Fulfilled'} label="Delivery" />
      </SummaryCard>

      {/* Teal = already done (disabled), pink = still to do */}
      <div className="mt-[35px] flex flex-wrap gap-4 sm:gap-[46px] xl:pl-[2px]">
        <PillButton
          variant={isPaid ? 'teal' : 'pink-sm'}
          disabled={isPaid}
          title={isPaid ? 'This order is already paid' : undefined}
          onClick={() => markPaid(order.id)}
        >
          Mark as Paid
        </PillButton>
        <PillButton
          variant={isFulfilled ? 'teal' : 'pink-sm'}
          disabled={isFulfilled}
          title={isFulfilled ? 'This order is already fulfilled' : undefined}
          onClick={() => markFulfilled(order.id)}
        >
          Mark as Fulfilled
        </PillButton>
        <PillButton onClick={() => setInvoiceSent(true)} aria-live="polite">
          {invoiceSent ? 'Invoice sent' : 'Resend Invoice'}
        </PillButton>
      </div>

      <OrderInvoice order={order} subtotal={subtotal} taxes={taxes} total={total} />
    </div>
  )
}

export default OrderDetail
