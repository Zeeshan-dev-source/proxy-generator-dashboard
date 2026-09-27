import { useMemo, useState } from 'react'
import PlanUsageCard from '../../components/user/PlanUsageCard.jsx'
import ProxyConfigCard from '../../components/user/ProxyConfigCard.jsx'
import ProxyOutputCard from '../../components/user/ProxyOutputCard.jsx'
import { PROXY_COUNT, proxyLocations, proxyPlans, proxyPorts } from '../../data/userData.js'

const defaultConfig = { country: '', region: '', city: '', isp: '', username: '', password: '', whitelist: '', rotating: true, duration: 30 }

// Rotating proxies all go through the gateway port; sticky ones get a port per session.
// Credentials are appended when set (host:port:user:pass).
function buildProxies(config) {
  const host = (proxyLocations.find((c) => c.name === config.country) ?? proxyLocations[0]).host
  const auth = config.username ? `:${config.username}:${config.password}` : ''
  const ports = Array.from({ length: PROXY_COUNT }, (_, i) => (config.rotating ? proxyPorts.rotating : proxyPorts.stickyStart + i))
  return {
    host,
    port: config.rotating ? String(proxyPorts.rotating) : `${ports[0]}–${ports.at(-1)}`,
    proxies: ports.map((port) => `${host}:${port}${auth}`),
  }
}

// Proxy generator: plan usage, configuration and the generated list (updated on Save)
function UserGenerator() {
  const [planId, setPlanId] = useState(proxyPlans[0].id)
  const [config, setConfig] = useState(defaultConfig)
  const plan = proxyPlans.find((p) => p.id === planId)
  const output = useMemo(() => buildProxies(config), [config])

  return (
    <div className="max-w-[1002px] xl:pt-[15px] xl:pb-[75px]">
      <h2 className="text-[20px] leading-[28px] font-bold">Proxy Generator</h2>
      <div className="mt-[16px] flex flex-col gap-8 xl:flex-row xl:gap-[34px]">
        <PlanUsageCard plan={plan} plans={proxyPlans} onChangePlan={setPlanId} />
        <ProxyConfigCard initial={defaultConfig} onSave={setConfig} />
      </div>
      <div className="mt-8 xl:mt-[32px]">
        <ProxyOutputCard {...output} />
      </div>
    </div>
  )
}

export default UserGenerator
