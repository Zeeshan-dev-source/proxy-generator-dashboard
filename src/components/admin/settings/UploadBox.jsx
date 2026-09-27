import { useEffect, useId, useState } from 'react'
import exportIcon from '../../../assets/admin/export-fill.svg'

// 83x41 dashed upload box from the design; shows a preview once an image is picked
function UploadBox({ label, accept = 'image/*', onChange }) {
  const id = useId()
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState('')

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setFileName(file.name)
    onChange?.(file)
  }

  return (
    <div>
      <label htmlFor={id} className="block text-[12px] leading-[28px]">
        {label}
      </label>
      <label
        htmlFor={id}
        title={fileName || `Upload ${label.toLowerCase()}`}
        className="mt-[3px] flex h-[41px] w-[83px] cursor-pointer items-center justify-center overflow-hidden border border-dashed border-primary bg-dot-active transition hover:brightness-125 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-input-focus"
      >
        {preview ? (
          <img src={preview} alt={`${label} preview`} className="max-h-[35px] max-w-[77px] object-contain" />
        ) : (
          <img src={exportIcon} alt="" width="24" height="24" />
        )}
        <input id={id} type="file" accept={accept} onChange={handleChange} className="sr-only" />
      </label>
    </div>
  )
}

export default UploadBox
