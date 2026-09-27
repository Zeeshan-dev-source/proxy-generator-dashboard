import { useState } from 'react'
import PillButton from '../../ui/PillButton.jsx'
import { adminFieldClass } from '../ui/fieldStyles.js'
import useFlash from '../../../hooks/useFlash.js'
import arrowDropDown from '../../../assets/icons/arrow-drop-down.svg'
import { resellers as sampleResellers } from '../../../data/settingsData.js'

// 1015x219 card: pick a reseller, edit its API credentials and save
function ResellerSettingsCard({ className = '' }) {
  const [resellers, setResellers] = useState(sampleResellers)
  const [activeId, setActiveId] = useState(sampleResellers[0].id)
  const [saved, flashSaved] = useFlash()
  const active = resellers.find((r) => r.id === activeId)

  const update = (field) => (e) => {
    const { value } = e.target
    setResellers((list) => list.map((r) => (r.id === activeId ? { ...r, [field]: value } : r)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: send to the reseller API settings endpoint
    flashSaved()
  }

  return (
    <section aria-labelledby="reseller-settings-title" className={className}>
      <h2 id="reseller-settings-title" className="text-[20px] leading-[28px] font-bold">
        Reseller API Settings
      </h2>
      <form
        onSubmit={handleSubmit}
        className="relative mt-[23px] rounded-[15px] bg-surface p-5 shadow-card md:pt-[48px] md:pr-5 md:pb-[18px] md:pl-[153px] xl:h-[219px]"
      >
        {/* "Reseller 1" dropdown sits in the card's top-left corner */}
        <div className="relative mb-4 w-fit md:absolute md:top-[12px] md:left-[26px] md:mb-0">
          <label htmlFor="reseller-select" className="sr-only">
            Reseller
          </label>
          <select
            id="reseller-select"
            value={activeId}
            onChange={(e) => setActiveId(e.target.value)}
            className="h-[33px] min-w-[104px] cursor-pointer appearance-none bg-transparent pr-[36px] text-[12px] leading-[28px] text-muted outline-none focus-visible:ring-2 focus-visible:ring-input-focus"
          >
            {resellers.map((r) => (
              <option key={r.id} value={r.id} className="bg-surface text-cream">
                {r.name}
              </option>
            ))}
          </select>
          <img src={arrowDropDown} alt="" width="33" height="33" className="pointer-events-none absolute top-0 right-0" />
        </div>

        <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-x-[41px] xl:w-[709px]">
          <label htmlFor="reseller-username" className="sr-only">
            API Username
          </label>
          <input
            id="reseller-username"
            placeholder="API Username"
            value={active.username}
            onChange={update('username')}
            autoComplete="off"
            className={`${adminFieldClass} h-[40px] px-[17px]`}
          />
          <label htmlFor="reseller-key" className="sr-only">
            API Key
          </label>
          <input
            id="reseller-key"
            placeholder="API Key"
            value={active.apiKey}
            onChange={update('apiKey')}
            autoComplete="off"
            spellCheck={false}
            className={`${adminFieldClass} h-[40px] px-[17px]`}
          />
          <label htmlFor="reseller-endpoint" className="sr-only">
            Endpoint
          </label>
          <input
            id="reseller-endpoint"
            type="url"
            placeholder="Endpoint"
            value={active.endpoint}
            onChange={update('endpoint')}
            className={`${adminFieldClass} h-[40px] px-[15px] md:col-span-2`}
          />
          <PillButton type="submit" variant="purple" className="mt-[11px] justify-self-center md:col-span-2">
            {saved ? 'Saved ✓' : 'Save'}
          </PillButton>
        </div>
      </form>
    </section>
  )
}

export default ResellerSettingsCard
