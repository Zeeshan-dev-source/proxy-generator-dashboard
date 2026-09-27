import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PillButton from '../../components/ui/PillButton.jsx'
import { adminFieldClass } from '../../components/admin/ui/fieldStyles.js'
import { useProducts } from '../../context/ProductsContext.jsx'
import { PRODUCT_CATEGORIES } from '../../data/productsData.js'
import arrowLeft from '../../assets/admin/arrow-alt-left.svg'
import arrowDropDown from '../../assets/icons/arrow-drop-down.svg'

const fieldClass = `${adminFieldClass} px-[17px]`

const EMPTY = { name: '', category: '', price: '', endpoint: '', payload: '', description: '' }

function BackToProducts() {
  return (
    <Link to="/admin/products" className="flex w-fit items-center gap-[3px] text-[12px] leading-[28px] underline hover:text-muted">
      <img src={arrowLeft} alt="" width="24" height="24" />
      Back to Products
    </Link>
  )
}

// Create a product (/admin/products/new) or edit one (/admin/products/:productId/edit)
function ProductEditor() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { getProduct, addProduct, updateProduct } = useProducts()
  const existing = productId ? getProduct(productId) : null
  const isEdit = Boolean(productId)

  const [form, setForm] = useState(() =>
    existing
      ? {
          name: existing.name,
          category: existing.category,
          price: String(existing.price),
          endpoint: existing.endpoint,
          payload: existing.payload,
          description: existing.description ?? '',
        }
      : EMPTY,
  )

  const update = (field) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // "Save" keeps a draft, "Save and Publish" makes it live; both go back to the list
  const handleSubmit = (e) => {
    e.preventDefault()
    const publish = e.nativeEvent.submitter?.value === 'publish'
    const product = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      endpoint: form.endpoint.trim(),
      payload: form.payload.trim(),
      description: form.description.trim(),
      published: publish || (existing?.published ?? false),
    }
    if (isEdit) updateProduct({ ...product, id: existing.id })
    else addProduct(product)
    navigate('/admin/products')
  }

  if (isEdit && !existing) {
    return (
      <div className="pb-16 xl:-mt-[22px]">
        <BackToProducts />
        <h2 className="-mt-[6px] text-[20px] leading-[28px] font-bold">Product not found</h2>
        <p className="mt-4 text-[14px] text-muted">This product doesn’t exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="max-w-[1002px] xl:-mt-[22px] xl:pb-[542px]">
      <BackToProducts />
      <h2 className="-mt-[6px] text-[20px] leading-[28px] font-bold">{isEdit ? 'Edit Product' : 'Create Product'}</h2>

      {/* Fields at 41px / 254px from the card's left edge and buttons bottom-right, as in the design */}
      <form
        onSubmit={handleSubmit}
        className="mt-[23px] flex flex-col gap-5 rounded-[15px] bg-surface p-5 shadow-card md:flex-row md:flex-wrap md:items-start xl:h-[344px] xl:w-[998px] xl:flex-nowrap xl:gap-0 xl:pt-[27px] xl:pr-[19px] xl:pb-[41px] xl:pl-[41px]"
      >
        <div className="flex w-full flex-col gap-[19px] md:w-[176px] md:shrink-0">
          <label className="sr-only" htmlFor="product-name">
            Name
          </label>
          <input id="product-name" required placeholder="Name" value={form.name} onChange={update('name')} className={`${fieldClass} h-[40px]`} />

          <div className="relative">
            <label className="sr-only" htmlFor="product-category">
              Category
            </label>
            <select
              id="product-category"
              required
              value={form.category}
              onChange={update('category')}
              className={`${fieldClass} h-[40px] cursor-pointer appearance-none pr-[36px]`}
            >
              <option value="" disabled>
                Category
              </option>
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <img src={arrowDropDown} alt="" width="33" height="33" className="pointer-events-none absolute top-[7px] right-0" />
          </div>

          <label className="sr-only" htmlFor="product-price">
            Price
          </label>
          <input
            id="product-price"
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={update('price')}
            className={`${fieldClass} h-[40px]`}
          />

          <label className="sr-only" htmlFor="product-endpoint">
            Purchase Endpoint
          </label>
          <input
            id="product-endpoint"
            required
            placeholder="Purchase Endpoint"
            value={form.endpoint}
            onChange={update('endpoint')}
            className={`${fieldClass} h-[40px]`}
          />

          <label className="sr-only" htmlFor="product-payload">
            Purchase Payload
          </label>
          <input
            id="product-payload"
            required
            placeholder="Purchase Payload"
            value={form.payload}
            onChange={update('payload')}
            className={`${fieldClass} h-[40px]`}
          />
        </div>

        <div className="w-full md:min-w-0 md:flex-1 xl:ml-[37px] xl:w-[538px] xl:flex-none">
          <label className="sr-only" htmlFor="product-description">
            Description
          </label>
          <textarea
            id="product-description"
            placeholder="Description"
            value={form.description}
            onChange={update('description')}
            className={`${fieldClass} block h-[180px] resize-none py-[10px] md:h-[276px]`}
          />
        </div>

        <div className="flex flex-wrap gap-[15px] md:w-full md:justify-end xl:ml-auto xl:w-[160px] xl:flex-col xl:self-end">
          <PillButton type="submit" value="save" variant="green">
            Save
          </PillButton>
          <PillButton type="submit" value="publish">
            Save and Publish
          </PillButton>
        </div>
      </form>
    </div>
  )
}

export default ProductEditor
