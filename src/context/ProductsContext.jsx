import { createContext, useContext, useMemo, useState } from 'react'
import { products as sampleProducts } from '../data/productsData.js'

// Products shared by the products list and the create / edit page
const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(sampleProducts)

  const value = useMemo(
    () => ({
      products,
      getProduct: (id) => products.find((p) => p.id === id),
      addProduct: (product) =>
        setProducts((list) => [...list, { ...product, id: `p-${Date.now()}`, created: new Date().toISOString() }]),
      updateProduct: (product) => setProducts((list) => list.map((p) => (p.id === product.id ? { ...p, ...product } : p))),
      deleteProduct: (id) => setProducts((list) => list.filter((p) => p.id !== id)),
    }),
    [products],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) throw new Error('useProducts must be used inside <ProductsProvider>')
  return context
}
