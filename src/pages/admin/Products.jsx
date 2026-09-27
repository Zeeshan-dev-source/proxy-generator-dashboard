import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SummaryStat, { SummaryCard } from '../../components/admin/ui/SummaryStat.jsx'
import ConfirmDialog from '../../components/admin/ui/ConfirmDialog.jsx'
import IconButton from '../../components/admin/ui/IconButton.jsx'
import ProductsTable from '../../components/admin/products/ProductsTable.jsx'
import ProductsMobileList from '../../components/admin/products/ProductsMobileList.jsx'
import { matchesProductSearch, sortProducts } from '../../components/admin/products/productUtils.js'
import { productsSummary } from '../../data/productsData.js'
import { useProducts } from '../../context/ProductsContext.jsx'
import addIcon from '../../assets/admin/add-round-fill.svg'
import layersIcon from '../../assets/admin/layers-fill-sm.svg'
import barGreen from '../../assets/admin/stat-bar-green.svg'
import barPurple from '../../assets/admin/stat-bar-purple.svg'

// "Most Popular Product": purple bar, layers icon and the product name in the Datacenter colour
function MostPopularStat({ value, label }) {
  return (
    <div className="flex items-start">
      <img src={barPurple} alt="" width="4" height="42" />
      <div className="-mt-[2px] ml-[12px]">
        <div className="flex h-[26px] items-center gap-[7px]">
          <img src={layersIcon} alt="" width="27" height="26" />
          <p className="text-[16px] leading-[26px] font-bold text-datacenter">{value}</p>
        </div>
        <p className="mt-[1px] pl-[1px] text-[12px] leading-[14px] text-muted">{label}</p>
      </div>
    </div>
  )
}

function Products() {
  const { products: productList, deleteProduct } = useProducts()
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState({ key: null, dir: 'asc' })
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(() => new Set())
  const [pendingDelete, setPendingDelete] = useState(null)
  const cancelDelete = useCallback(() => setPendingDelete(null), [])

  const visibleProducts = useMemo(() => {
    const filtered = productList.filter((p) => (category === 'all' || p.category === category) && matchesProductSearch(p, search))
    return sortProducts(filtered, sort)
  }, [productList, category, sort, search])

  // Same column again flips the direction; price and date start high-to-low, text A→Z
  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: key === 'price' || key === 'created' ? 'desc' : 'asc' },
    )
  }

  const toggleSelected = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const confirmDelete = () => {
    const id = pendingDelete.id
    deleteProduct(id)
    setSelected((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setPendingDelete(null)
  }

  const listProps = {
    products: visibleProducts,
    sort,
    category,
    onCategoryChange: setCategory,
    search,
    onSearch: setSearch,
    selected,
    onToggle: toggleSelected,
    onEdit: (product) => navigate(`/admin/products/${product.id}/edit`),
    onDelete: (product) => setPendingDelete(product),
  }

  return (
    <div className="max-w-[1002px] xl:pb-[304px]">
      <h2 className="text-[20px] leading-[28px] font-bold">Products</h2>
      {/* The design puts the third stat further right (650px) than on the other admin pages */}
      <SummaryCard className="mt-[16px]">
        <SummaryStat bar={barGreen} value={String(productList.length)} label="Total Products" />
        <SummaryStat {...productsSummary.purchases} className="xl:w-[367px]!" />
        <MostPopularStat {...productsSummary.mostPopular} />
      </SummaryCard>

      <section aria-labelledby="all-products-title" className="mt-10 xl:mt-[58px]">
        <div className="flex items-center gap-3 xl:pl-[10px]">
          <h2 id="all-products-title" className="text-[20px] leading-[28px] font-bold">
            All Products
          </h2>
          <IconButton icon={addIcon} label="Add product" onClick={() => navigate('/admin/products/new')} />
        </div>
        <div className="mt-[14px]">
          <ProductsTable {...listProps} onSort={handleSort} />
          <ProductsMobileList
            {...listProps}
            onSortKey={(key) => setSort((prev) => ({ key, dir: prev.dir }))}
            onSortDirToggle={() => setSort((prev) => ({ ...prev, dir: prev.dir === 'asc' ? 'desc' : 'asc' }))}
          />
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete product?"
        message={pendingDelete ? `${pendingDelete.name} will be removed. This can’t be undone.` : ''}
        confirmLabel="Delete product"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}

export default Products
