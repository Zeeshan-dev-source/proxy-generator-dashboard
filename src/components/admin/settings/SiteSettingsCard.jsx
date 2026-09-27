import { useState } from 'react'
import PillButton from '../../ui/PillButton.jsx'
import UploadBox from './UploadBox.jsx'
import { adminFieldClass } from '../ui/fieldStyles.js'
import useFlash from '../../../hooks/useFlash.js'
import { siteDefaults } from '../../../data/settingsData.js'

// 478x352 card: title, meta description, favicon + logo uploads and Save
function SiteSettingsCard({ className = '' }) {
  const [form, setForm] = useState(siteDefaults)
  const [saved, flashSaved] = useFlash()

  const update = (field) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: send to the settings API
    flashSaved()
  }

  return (
    <section aria-labelledby="site-settings-title" className={className}>
      <h2 id="site-settings-title" className="text-[20px] leading-[28px] font-bold">
        Site Settings
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-[23px] flex flex-col rounded-[15px] bg-surface p-5 shadow-card sm:pt-[27px] sm:pr-[54px] sm:pb-[17px] sm:pl-[41px] xl:h-[352px]"
      >
        <label htmlFor="site-title" className="sr-only">
          Website Title
        </label>
        <input id="site-title" placeholder="Website Title" value={form.title} onChange={update('title')} className={`${adminFieldClass} h-[40px] px-[17px]`} />

        <label htmlFor="site-description" className="sr-only">
          Meta Description
        </label>
        <textarea
          id="site-description"
          placeholder="Meta Description"
          value={form.description}
          onChange={update('description')}
          className={`${adminFieldClass} mt-[15px] block h-[125px] resize-none px-[17px] py-[9px]`}
        />

        <div className="mt-[4px] grid grid-cols-2 sm:grid-cols-[234px_1fr]">
          <UploadBox label="Favicon" accept="image/png,image/x-icon,image/svg+xml" />
          <UploadBox label="Logo" />
        </div>

        {/* Centred on the card, as in the design (the card's padding is uneven) */}
        <PillButton type="submit" variant="green" className="mx-auto mt-[20px] sm:mr-0 sm:ml-[118px]">
          {saved ? 'Saved ✓' : 'Save'}
        </PillButton>
      </form>
    </section>
  )
}

export default SiteSettingsCard
