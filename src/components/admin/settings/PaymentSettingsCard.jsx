import { useState } from 'react'
import { adminFieldClass } from '../ui/fieldStyles.js'
import shieldOn from '../../../assets/admin/shield-fill-lg.svg'
import shieldOff from '../../../assets/admin/shield-outline.svg'
import { paymentMethods } from '../../../data/settingsData.js'

// Payment badge from the design. The raw SVG is rendered so its top-level opacity can follow the on/off state.
function PaymentBadge({ method }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block h-[47px] shrink-0 [&>svg]:absolute [&>svg]:top-[-20px] [&>svg]:left-[-20px] [&>svg]:max-w-none [&>svg>g]:transition-opacity ${
        method.enabled ? '[&>svg>g]:opacity-100' : '[&>svg>g]:opacity-50'
      }`}
      style={{ width: method.width }}
      dangerouslySetInnerHTML={{ __html: method.svg }}
    />
  )
}

// 478x352 card: one row per payment method — on/off shield, badge and API key
function PaymentSettingsCard({ className = '' }) {
  const [methods, setMethods] = useState(paymentMethods)

  const updateMethod = (id, changes) => setMethods((list) => list.map((m) => (m.id === id ? { ...m, ...changes } : m)))

  return (
    <section aria-labelledby="payment-settings-title" className={className}>
      <h2 id="payment-settings-title" className="text-[20px] leading-[28px] font-bold xl:-ml-[6px]">
        Payment Settings
      </h2>
      <ul className="mt-[23px] flex flex-col gap-[15.75px] rounded-[15px] bg-surface p-4 shadow-card sm:pt-[26px] sm:pr-[17px] sm:pb-6 sm:pl-[12px] xl:h-[352px]">
        {methods.map((method) => (
          <li key={method.id} className="flex items-center">
            <button
              type="button"
              aria-pressed={method.enabled}
              aria-label={`${method.enabled ? 'Disable' : 'Enable'} ${method.name}`}
              title={method.enabled ? 'Enabled' : 'Disabled'}
              onClick={() => updateMethod(method.id, { enabled: !method.enabled })}
              className="flex size-[35px] shrink-0 cursor-pointer items-center justify-center rounded-full outline-none transition hover:brightness-90 focus-visible:ring-2 focus-visible:ring-input-focus"
            >
              <img src={method.enabled ? shieldOn : shieldOff} alt="" width={method.enabled ? 35 : 26} height={method.enabled ? 35 : 26} />
            </button>
            <span className="ml-[1px]">
              <PaymentBadge method={method} />
            </span>
            <label htmlFor={`pay-key-${method.id}`} className="sr-only">
              {method.name} API key
            </label>
            <input
              id={`pay-key-${method.id}`}
              value={method.key}
              onChange={(e) => updateMethod(method.id, { key: e.target.value })}
              placeholder="API key"
              spellCheck={false}
              className={`${adminFieldClass} ml-[11px] h-[40px] min-w-0 flex-1 px-[15px] disabled:opacity-60`}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PaymentSettingsCard
