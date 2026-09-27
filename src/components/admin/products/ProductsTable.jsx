import FilterPill from '../ui/FilterPill.jsx'
import FilterMenuPill from '../ui/FilterMenuPill.jsx'
import { SelectCheck, SortButton } from '../ui/TableControls.jsx'
import ProductActions from './ProductActions.jsx'
import ProductSearch from './ProductSearch.jsx'
import { categoryColor, formatLongDate, formatProductPrice } from './productUtils.js'
import { categoryFilters } from '../../../data/productsData.js'

// At the 998px design width the columns land where the design has them
// (check 374, product 410, category 583, payload 748, endpoint 927, price 1091, created 1177, options 1307)
const GRID =
  'grid grid-cols-[36px_minmax(120px,173fr)_minmax(110px,165fr)_minmax(120px,179fr)_minmax(120px,164fr)_86px_130px_24px] items-center pl-[28px]'

// Desktop table (1024px and up): 998x575 card with a sticky header; more products scroll inside it
function ProductsTable({ products, sort, onSort, category, onCategoryChange, search, onSearch, selected, onToggle, onEdit, onDelete }) {
  const pill = (key, label, extra = {}) => (
    <FilterPill
      label={label}
      align="center"
      state={sort.key === key ? 'active' : 'idle'}
      dir={sort.dir}
      onClick={() => onSort(key)}
      aria-label={`Sort by ${label.toLowerCase()}`}
      {...extra}
    />
  )

  return (
    <div className="hidden rounded-[15px] shadow-card lg:block xl:w-[998px]">
      <div className="relative h-[575px] w-full rounded-[15px] bg-surface">
        <div className="absolute top-[16px] right-[13px] bottom-[14px] left-0 scrollbar-panel overflow-y-auto">
          <div className={`sticky top-0 z-20 h-[27px] bg-surface ${GRID}`}>
            <span />
            <div className="flex items-center">
              {pill('name', 'Product')}
              <SortButton label="Sort by product" className="ml-[9px]" onClick={() => onSort('name')} />
            </div>
            <div className="flex items-center">
              <FilterMenuPill
                label="Category"
                align="center"
                menuLabel="Show categories"
                options={categoryFilters}
                value={category}
                onChange={onCategoryChange}
                popupClassName="top-[25px] left-0"
              />
              <SortButton label="Sort by category" className="ml-[9px]" onClick={() => onSort('category')} />
            </div>
            <div className="flex items-center">
              {pill('payload', 'Payload')}
              <SortButton label="Sort by payload" className="ml-[9px]" onClick={() => onSort('payload')} />
            </div>
            <div className="flex items-center">
              {pill('endpoint', 'Endpoint')}
              <SortButton label="Sort by endpoint" className="ml-[9px]" onClick={() => onSort('endpoint')} />
            </div>
            <div className="flex items-center pl-[1px]">
              {pill('price', 'Price', { width: 76 })}
              <SortButton label="Sort by price" className="ml-[9px]" onClick={() => onSort('price')} />
            </div>
            <div className="flex items-center pl-[23px]">
              {pill('created', 'Created', { width: 82 })}
              <SortButton label="Sort by created date" className="ml-[3px]" onClick={() => onSort('created')} />
            </div>
            <ProductSearch value={search} onChange={onSearch} />
          </div>

          {products.length === 0 ? (
            <p className="py-10 text-center text-[14px] text-muted">No products found</p>
          ) : (
            <ul className="mt-[20px] flex flex-col gap-[8px] pb-2" aria-label="Products">
              {products.map((product) => (
                <li key={product.id} className={`${GRID} h-[24px] text-[14px]`}>
                  <SelectCheck checked={selected.has(product.id)} onChange={() => onToggle(product.id)} label={`Select ${product.name}`} />
                  <span className="truncate pr-2">
                    {product.name}
                    {!product.published && <span className="ml-2 text-[12px] text-muted">Draft</span>}
                  </span>
                  <span className={`font-bold ${categoryColor[product.category]}`}>{product.category}</span>
                  <span className="truncate pr-2 font-light">{product.payload}</span>
                  <span className="truncate pr-2 font-light">{product.endpoint}</span>
                  <span className="font-light">{formatProductPrice(product.price)}</span>
                  <span className="font-light">{formatLongDate(product.created)}</span>
                  <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsTable
