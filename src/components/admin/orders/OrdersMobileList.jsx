import { Link } from 'react-router-dom'
import OrderActions from './OrderActions.jsx'
import { SearchField, SelectCheck } from '../ui/TableControls.jsx'
import { formatOrderDate, formatPrice } from './orderUtils.js'
import { orderViews } from '../../../data/ordersData.js'

const sortOptions = [
  { value: 'price', label: 'Price' },
  { value: 'status', label: 'Order' },
  { value: 'user', label: 'User ID' },
  { value: 'date', label: 'Order Date' },
]

const selectClass =
  'h-[34px] min-w-0 flex-1 cursor-pointer rounded-[7px] border border-[#eff0f6]/50 bg-surface px-3 text-[12px] font-semibold outline-none focus-visible:border-input-focus'

// Phones and tablets (below 1024px): the same data as stacked cards, with the column filters as simple selects
function OrdersMobileList({ orders, sort, onSort, onSortDirToggle, view, onViewChange, search, onSearch, selected, onToggle, onMarkFulfilled }) {
  return (
    <div className="rounded-[15px] bg-surface p-4 shadow-card lg:hidden">
      <SearchField value={search} onChange={onSearch} className="h-[40px] rounded-[10px] border border-[#eff0f6]/50 px-3" />

      <div className="mt-3 flex gap-2">
        <label className="sr-only" htmlFor="orders-view">
          Show
        </label>
        <select id="orders-view" value={view} onChange={(e) => onViewChange(e.target.value)} className={selectClass}>
          {orderViews.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="orders-sort">
          Sort by
        </label>
        <select id="orders-sort" value={sort.key} onChange={(e) => onSort(e.target.value)} className={selectClass}>
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              Sort: {o.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onSortDirToggle}
          className="h-[34px] w-[34px] shrink-0 cursor-pointer rounded-[7px] border border-[#eff0f6]/50 text-[14px]"
          aria-label={sort.dir === 'asc' ? 'Sorted ascending, switch to descending' : 'Sorted descending, switch to ascending'}
        >
          {sort.dir === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-muted">No orders found</p>
      ) : (
        <ul className="mt-3 flex flex-col divide-y divide-white/10" aria-label="Orders">
          {orders.map((order) => (
            <li key={order.id} className="flex gap-3 py-3">
              <SelectCheck checked={selected.has(order.id)} onChange={() => onToggle(order.id)} label={`Select order ${order.id}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <Link to={order.id} className="text-[16px] font-bold hover:underline" aria-label={`Order #${order.id}, ${formatPrice(order.price)}`}>
                    {formatPrice(order.price)}
                  </Link>
                  <span className="text-[12px] opacity-50">{order.status}</span>
                </div>
                <p className="mt-1 text-[12px] font-light opacity-50">
                  {order.user} · {formatOrderDate(order.date)}
                </p>
                <OrderActions order={order} onMarkFulfilled={onMarkFulfilled} className="mt-2" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrdersMobileList
