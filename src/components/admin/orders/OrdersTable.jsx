import { Link } from 'react-router-dom'
import FilterPill from '../ui/FilterPill.jsx'
import FilterMenuPill from '../ui/FilterMenuPill.jsx'
import OrderActions from './OrderActions.jsx'
import { SearchField, SelectCheck, SortButton } from '../ui/TableControls.jsx'
import { formatOrderDate, formatPrice } from './orderUtils.js'
import { orderViews } from '../../../data/ordersData.js'

// At the 1002px design width the fr columns resolve to 174/183/183/191px, matching the design's x positions
// (check 372, price 430, order 604, user 787, date 970, actions 1161); on narrower screens they shrink instead of scrolling
const GRID =
  'grid grid-cols-[58px_minmax(125px,174fr)_minmax(139px,183fr)_minmax(139px,183fr)_minmax(139px,191fr)_80px_82px] items-center pl-[26px]'

// Desktop table (1024px and up): 1002x872 card with a sticky header and its own vertical scroll area
function OrdersTable({ orders, sort, onSort, view, onViewChange, search, onSearch, selected, onToggle, onMarkFulfilled }) {
  const pillState = (key) => (sort.key === key ? 'active' : 'idle')

  return (
    <div className="hidden rounded-[15px] shadow-card lg:block">
      <div className="relative h-[872px] w-full rounded-[15px] bg-surface">
        <div className="absolute top-[12px] right-[10px] bottom-[27px] left-0 scrollbar-panel overflow-y-auto">
          <div className={`sticky top-0 z-20 h-[27px] bg-surface ${GRID}`}>
            <span />
            <FilterPill label="Price" state={pillState('price')} dir={sort.dir} onClick={() => onSort('price')} aria-label="Sort by price" />
            <div className="flex items-center">
              <FilterMenuPill label="Order" menuLabel="Show orders" options={orderViews} value={view} onChange={onViewChange} />
              <SortButton label="Sort by order status" className="ml-[9px]" onClick={() => onSort('status')} />
            </div>
            <div className="flex items-center">
              <FilterPill label="User ID" align="center" state={pillState('user')} dir={sort.dir} onClick={() => onSort('user')} aria-label="Sort by user" />
              <SortButton label="Sort by user" className="ml-[9px]" onClick={() => onSort('user')} />
            </div>
            <div className="flex items-center">
              <FilterPill label="Order Date" align="center" state={pillState('date')} dir={sort.dir} onClick={() => onSort('date')} aria-label="Sort by order date" />
              <SortButton label="Sort by order date" className="ml-[9px]" onClick={() => onSort('date')} />
            </div>
            <SearchField value={search} onChange={onSearch} className="col-span-2 ml-[5px] pr-4" />
          </div>

          {orders.length === 0 ? (
            <p className="py-10 text-center text-[14px] text-muted">No orders found</p>
          ) : (
            <ul className="mt-[4px] flex flex-col gap-[8px] pb-4" aria-label="Orders">
              {orders.map((order) => (
                <li key={order.id} className={`${GRID} h-[28px] text-[14px]`}>
                  <SelectCheck
                    checked={selected.has(order.id)}
                    onChange={() => onToggle(order.id)}
                    label={`Select order ${order.id}`}
                  />
                  <Link to={order.id} className="justify-self-start hover:underline" aria-label={`Order #${order.id}, ${formatPrice(order.price)}`}>
                    {formatPrice(order.price)}
                  </Link>
                  <span className="opacity-50">{order.status}</span>
                  <span className="font-light opacity-50">{order.user}</span>
                  <span className="font-light opacity-50">{formatOrderDate(order.date)}</span>
                  <OrderActions order={order} onMarkFulfilled={onMarkFulfilled} className="col-span-2" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrdersTable
