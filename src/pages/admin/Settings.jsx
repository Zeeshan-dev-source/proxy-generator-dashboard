import SiteSettingsCard from '../../components/admin/settings/SiteSettingsCard.jsx'
import PaymentSettingsCard from '../../components/admin/settings/PaymentSettingsCard.jsx'
import ResellerSettingsCard from '../../components/admin/settings/ResellerSettingsCard.jsx'

// Two 478px cards side by side (59px apart at 1440), the reseller card full width below
function Settings() {
  return (
    <div className="max-w-[1015px] xl:pb-[152px]">
      <div className="flex flex-col gap-10 xl:flex-row xl:justify-between xl:gap-4">
        <SiteSettingsCard className="w-full xl:w-[478px]" />
        <PaymentSettingsCard className="w-full xl:w-[478px]" />
      </div>
      <ResellerSettingsCard className="mt-10 xl:mt-[43px]" />
    </div>
  )
}

export default Settings
