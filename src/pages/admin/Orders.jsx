import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import OrdersSummary from '../../components/admin/orders/OrdersSummary.jsx'
import OrdersTable from '../../components/admin/orders/OrdersTable.jsx'
import OrdersMobileList from '../../components/admin/orders/OrdersMobileList.jsx'
import { filterByRange, filterByView, matchesSearch, sortOrders } from '../../components/admin/orders/orderUtils.js'
import { orders as sampleOrders, orderRanges } from '../../data/ordersData.js'
import { useOrders } from '../../context/OrdersContext.jsx'

// Design defaults: "All Time", "Order Paid" selected in the popup, table sorted by price (Price pill active)
const DEFAULTS = { range: 'all', view: 'paid', sort: { key: 'price', dir: 'desc' } }

function getVisibleOrders(list, { range, view, sort, search }) {
  const days = orderRanges.find((r) => r.value === range)?.days
  const filtered = filterByView(filterByRange(list, days), view).filter((o) => matchesSearch(o, search))
  return sortOrders(filtered, sort)
}

// The design shows the third row selected
const initialSelection = () => {
  const third = getVisibleOrders(sampleOrders, { ...DEFAULTS, search: '' })[2]
  return new Set(third ? [third.id] : [])
}

function Orders() {
  const { orders: orderList, markFulfilled } = useOrders()
  const [range, setRange] = useState(DEFAULTS.range)
  const [view, setView] = useState(DEFAULTS.view)
  const [sort, setSort] = useState(DEFAULTS.sort)
  // ?search= lets other pages open the list pre-filtered (e.g. a user's orders)
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('search') ?? '')
  const [selected, setSelected] = useState(initialSelection)

  const visibleOrders = useMemo(
    () => getVisibleOrders(orderList, { range, view, sort, search }),
    [orderList, range, view, sort, search],
  )

  // Same column again flips the direction; a new column starts high-to-low for price/date, A→Z otherwise
  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: key === 'price' || key === 'date' ? 'desc' : 'asc' },
    )
  }

  const handleViewChange = (value) => {
    setView(value)
    // "User ID" shows every order grouped by user
    if (value === 'all') setSort({ key: 'user', dir: 'asc' })
  }

  const toggleSelected = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const listProps = {
    orders: visibleOrders,
    sort,
    onSort: handleSort,
    view,
    onViewChange: handleViewChange,
    search,
    onSearch: setSearch,
    selected,
    onToggle: toggleSelected,
    onMarkFulfilled: markFulfilled,
  }

  return (
    <div className="max-w-[1002px] xl:pb-[75px]">
      <OrdersSummary range={range} onRangeChange={setRange} />

      <section aria-label="Orders list" className="mt-8 xl:mt-[32px]">
        <OrdersTable {...listProps} />
        <OrdersMobileList
          {...listProps}
          onSort={(key) => setSort((prev) => ({ ...prev, key }))}
          onSortDirToggle={() => setSort((prev) => ({ ...prev, dir: prev.dir === 'asc' ? 'desc' : 'asc' }))}
        />
      </section>
    </div>
  )
}

export default Orders
