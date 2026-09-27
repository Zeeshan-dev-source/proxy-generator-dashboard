import { createContext, useContext, useMemo, useState } from 'react'
import { orders as sampleOrders, ORDER_STATUS } from '../data/ordersData.js'

// Orders shared by the orders list and the single-order page, so changes made on one show on the other
const OrdersContext = createContext(null)

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(sampleOrders)

  const value = useMemo(() => {
    const update = (id, status) => setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)))
    return {
      orders,
      getOrder: (id) => orders.find((o) => o.id === id),
      // Only unpaid (active) orders can become paid; fulfilled ones stay fulfilled
      markPaid: (id) =>
        setOrders((list) => list.map((o) => (o.id === id && o.status === ORDER_STATUS.active ? { ...o, status: ORDER_STATUS.paid } : o))),
      // Fulfilling also means the order is paid
      markFulfilled: (id) => update(id, ORDER_STATUS.fulfilled),
    }
  }, [orders])

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) throw new Error('useOrders must be used inside <OrdersProvider>')
  return context
}
