import { useState } from 'react'
import PillButton from '../ui/PillButton.jsx'
import { adminFieldClass } from '../admin/ui/fieldStyles.js'
import useFlash from '../../hooks/useFlash.js'
import arrowIcon from '../../assets/user/arrow-drop-down.svg'
import refreshIcon from '../../assets/user/refresh.svg'
import knobImg from '../../assets/user/switch-knob.svg'
import { proxyLocations } from '../../data/userData.js'

const DURATION = { min: 1, max: 40 }
const SLIDER_WIDTH = 125
const THUMB_WIDTH = 40
const IPV4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/

const fieldClass = `${adminFieldClass} h-[40px] px-[18px]`

// Outlined select with the design's arrow; the label doubles as the empty option
function SelectField({ id, label, value, onChange, options, emptyHint }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${fieldClass} cursor-pointer appearance-none pr-[40px] [&>option]:bg-surface`}>
        <option value="">{label}</option>
        {options.length === 0 && emptyHint && <option disabled>{emptyHint}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <img src={arrowIcon} alt="" width="33" height="33" className="pointer-events-none absolute top-[6px] right-[7px]" />
    </div>
  )
}

// Rotating on/off: 131x28 control with the refresh icon, label and a 45x20 switch
function RotatingSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative h-[28px] w-[131px] shrink-0 cursor-pointer rounded-[6px] outline-none focus-visible:ring-2 focus-visible:ring-input-focus"
    >
      <img src={refreshIcon} alt="" width="24" height="24" className="absolute top-[2px] left-0" />
      <span className="absolute top-0 left-[31px] text-[12px] leading-[28px]">Rotating</span>
      <span
        className={`absolute top-[4px] left-[86px] h-[20.25px] w-[45px] rounded-full shadow-[inset_0px_-6px_8px_3px_rgba(0,0,0,0.1)] transition-colors ${
          checked ? 'bg-datacenter' : 'bg-white/20'
        }`}
      >
        <img
          src={knobImg}
          alt=""
          width="27.75"
          height="27.75"
          className={`absolute top-[-3px] max-w-none transition-[left] duration-200 ${checked ? 'left-[25px]' : 'left-[-2px]'}`}
        />
      </span>
    </button>
  )
}

// 648x321 card: location targeting, credentials, whitelisted IPs, rotation settings and Save.
// Saving validates the form and hands the settings to the page, which rebuilds the proxy list.
function ProxyConfigCard({ initial, onSave }) {
  const [form, setForm] = useState(initial)
  const [error, setError] = useState(null)
  const [saved, flashSaved] = useFlash()
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))

  const country = proxyLocations.find((c) => c.name === form.country)
  const region = country?.regions.find((r) => r.name === form.region)

  // Changing a parent clears the choices that depended on it
  const setCountry = (name) => setForm((f) => ({ ...f, country: name, region: '', city: '', isp: '' }))
  const setRegion = (name) => setForm((f) => ({ ...f, region: name, city: '' }))

  const fill = ((form.duration - DURATION.min) / (DURATION.max - DURATION.min)) * (SLIDER_WIDTH - THUMB_WIDTH) + THUMB_WIDTH

  const handleSubmit = (e) => {
    e.preventDefault()
    const ips = form.whitelist.split(/[\s,]+/).filter(Boolean)
    const badIp = ips.find((ip) => !IPV4.test(ip))
    if (badIp) return setError(`“${badIp}” isn’t a valid IPv4 address.`)
    if (Boolean(form.username.trim()) !== Boolean(form.password)) return setError('Enter both a username and a password, or neither.')
    setError(null)
    onSave({ ...form, username: form.username.trim(), whitelist: ips.join('\n') })
    flashSaved()
    return undefined
  }

  return (
    <section aria-labelledby="config-title" className="min-w-0 rounded-[15px] bg-surface px-4 pt-[16px] pb-6 shadow-card sm:pr-[22px] sm:pl-[24px] xl:h-[321px] xl:w-[648px] xl:shrink-0 xl:pb-0">
      <div className="flex items-start justify-between gap-4">
        <h3 id="config-title" className="text-[16px] leading-[28px] font-bold">
          Configurations
        </h3>
        <RotatingSwitch checked={form.rotating} onChange={set('rotating')} />
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-[16px] flex flex-col gap-8 lg:flex-row lg:gap-4">
        {/* Column by column: the four location selects, then the credentials */}
        <div className="grid grid-cols-1 gap-y-[20px] sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4 sm:gap-x-[32px] xl:grid-cols-[176px_176px]">
          <SelectField id="gen-country" label="Country" value={form.country} onChange={setCountry} options={proxyLocations.map((c) => c.name)} />
          <SelectField
            id="gen-region"
            label="State/Region"
            value={form.region}
            onChange={setRegion}
            options={country ? country.regions.map((r) => r.name) : []}
            emptyHint="Choose a country first"
          />
          <SelectField id="gen-city" label="City" value={form.city} onChange={set('city')} options={region ? region.cities : []} emptyHint="Choose a region first" />
          <SelectField id="gen-isp" label="ISP" value={form.isp} onChange={set('isp')} options={country ? country.isps : []} emptyHint="Choose a country first" />

          <label htmlFor="gen-username" className="sr-only">
            Proxy username
          </label>
          <input id="gen-username" placeholder="Username" autoComplete="off" value={form.username} onChange={(e) => set('username')(e.target.value)} className={fieldClass} />
          <label htmlFor="gen-password" className="sr-only">
            Proxy password
          </label>
          <input
            id="gen-password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => set('password')(e.target.value)}
            className={fieldClass}
          />
          <label htmlFor="gen-whitelist" className="sr-only">
            Whitelisted IPs, one per line
          </label>
          <textarea
            id="gen-whitelist"
            placeholder="Whitelisted IP’s"
            value={form.whitelist}
            onChange={(e) => set('whitelist')(e.target.value)}
            className={`${adminFieldClass} h-[100px] resize-none px-[18px] pt-[10px] sm:row-span-2`}
          />
        </div>

        {/* Rotation duration and Save; the text column is centred at x 541 of the design card */}
        <div className="relative flex flex-col items-center lg:mr-[5px] lg:ml-auto lg:w-[160px]">
          <p className={`h-[28px] text-[24px] leading-[28px] font-bold transition-opacity lg:mt-[65px] ${form.rotating ? '' : 'opacity-50'}`} aria-live="polite">
            {form.duration} minutes
          </p>
          <label htmlFor="gen-duration" className="text-[12px] leading-[28px] text-muted">
            Rotation Duration
          </label>
          <input
            id="gen-duration"
            type="range"
            min={DURATION.min}
            max={DURATION.max}
            value={form.duration}
            disabled={!form.rotating}
            onChange={(e) => set('duration')(Number(e.target.value))}
            aria-valuetext={`${form.duration} minutes`}
            title={form.rotating ? undefined : 'Turn on Rotating to change the duration'}
            className="mt-[6px] w-[125px] range-pill lg:ml-[14px] lg:self-start"
            style={{ '--fill': `${(fill / SLIDER_WIDTH) * 100}%` }}
          />
          <PillButton type="submit" className="mt-8 lg:mt-auto">
            {saved ? 'Saved ✓' : 'Save'}
          </PillButton>
          <p role="status" className="mt-2 text-center text-[12px] leading-[16px] text-residential lg:absolute lg:top-full lg:right-0 lg:mt-[6px] lg:w-[220px] lg:text-right">
            {error}
          </p>
        </div>
      </form>
    </section>
  )
}

export default ProxyConfigCard
