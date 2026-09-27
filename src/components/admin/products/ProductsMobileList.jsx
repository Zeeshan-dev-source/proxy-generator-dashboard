import { SearchField, SelectCheck } from '../ui/TableControls.jsx'
import ProductActions from './ProductActions.jsx'
import { categoryColor, formatLongDate, formatProductPrice } from './productUtils.js'
import { categoryFilters } from '../../../data/productsData.js'

const sortOptions = [
  { value: '', label: 'Default order' },
  { value: 'name', label: 'Product' },
  { value: 'category', label: 'Category' },
  { value: 'price', label: 'Price' },
  { value: 'created', label: 'Created' },
]

const selectClass =
  'h-[34px] min-w-0 flex-1 cursor-pointer rounded-[7px] border border-[#eff0f6]/50 bg-surface px-3 text-[12px] font-semibold outline-none focus-visible:border-input-focus'

// Phones and tablets (below 1024px): products as stacked cards, column filters as selects
function ProductsMobileList({ products, sort, onSortKey, onSortDirToggle, category, onCategoryChange, search, onSearch, selected, onToggle, onEdit, onDelete }) {
  return (
    <div className="rounded-[15px] bg-surface p-4 shadow-card lg:hidden">
      <SearchField value={search} onChange={onSearch} className="h-[40px] rounded-[10px] border border-[#eff0f6]/50 px-3" />

      <div className="mt-3 flex gap-2">
        <label className="sr-only" htmlFor="products-category">
          Category
        </label>
        <select id="products-category" value={category} onChange={(e) => onCategoryChange(e.target.value)} className={selectClass}>
          {categoryFilters.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="products-sort">
          Sort by
        </label>
        <select id="products-sort" value={sort.key ?? ''} onChange={(e) => onSortKey(e.target.value || null)} className={selectClass}>
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.value ? `Sort: ${o.label}` : o.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onSortDirToggle}
          disabled={!sort.key}
          className="h-[34px] w-[34px] shrink-0 cursor-pointer rounded-[7px] border border-[#eff0f6]/50 text-[14px] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={sort.dir === 'asc' ? 'Sorted ascending, switch to descending' : 'Sorted descending, switch to ascending'}
        >
          {sort.dir === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {products.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-muted">No products found</p>
      ) : (
        <ul className="mt-3 flex flex-col divide-y divide-white/10" aria-label="Products">
          {products.map((product) => (
            <li key={product.id} className="flex gap-3 py-3">
              <SelectCheck checked={selected.has(product.id)} onChange={() => onToggle(product.id)} label={`Select ${product.name}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[16px] font-bold">
                    {product.name}
                    {!product.published && <span className="ml-2 text-[12px] font-normal text-muted">Draft</span>}
                  </span>
                  <span className="text-[16px]">{formatProductPrice(product.price)}</span>
                </div>
                <p className={`mt-1 text-[12px] font-bold ${categoryColor[product.category]}`}>{product.category}</p>
                <p className="mt-1 truncate text-[12px] font-light opacity-70">
                  {product.payload} · {product.endpoint} · {formatLongDate(product.created)}
                </p>
              </div>
              <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductsMobileList
