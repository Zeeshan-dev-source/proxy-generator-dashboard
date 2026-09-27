import { useState } from 'react'
import IconButton from '../admin/ui/IconButton.jsx'
import { adminFieldClass } from '../admin/ui/fieldStyles.js'
import serverIcon from '../../assets/user/server-fill.svg'
import portIcon from '../../assets/user/line-fill.svg'
import copyIcon from '../../assets/user/copy.svg'
import downloadIcon from '../../assets/user/archive-load.svg'

// Host / port row: 24px icon, 8px gap, 176x40 read-only field
function InfoField({ id, icon, label, value }) {
  return (
    <div className="flex items-center gap-[8px]">
      <img src={icon} alt="" width="24" height="24" className="shrink-0" />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input id={id} readOnly value={value} className={`${adminFieldClass} h-[40px] px-[18px] sm:w-[176px]!`} />
    </div>
  )
}

// 998x138 card with the generated proxies. The box shows them run together as in the design;
// Copy and Download give one proxy per line.
function ProxyOutputCard({ host, port, proxies }) {
  const [copied, setCopied] = useState(false)
  const text = proxies.join('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard blocked (e.g. insecure context): select the text so the user can copy it by hand
      document.getElementById('gen-output')?.select()
    }
  }

  const download = () => {
    const url = URL.createObjectURL(new Blob([`${text}\n`], { type: 'text/plain' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'proxies.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section
      aria-label="Generated proxies"
      className="flex flex-col gap-4 rounded-[15px] bg-surface p-4 shadow-card lg:flex-row lg:gap-[16px] lg:py-[21px] lg:pr-[11px] lg:pl-[23px] xl:w-[998px]"
    >
      <div className="grid gap-[16px] sm:grid-cols-2 lg:flex lg:shrink-0 lg:flex-col">
        <InfoField id="gen-host" icon={serverIcon} label="Proxy host" value={host} />
        <InfoField id="gen-port" icon={portIcon} label="Port" value={port} />
      </div>
      <label htmlFor="gen-output" className="sr-only">
        Proxy list
      </label>
      <textarea
        id="gen-output"
        readOnly
        value={proxies.join('')}
        className={`${adminFieldClass} h-[96px] min-w-0 shrink-0 resize-none break-all lg:flex-1 lg:shrink pt-[11px] pr-[27px] pl-[18px] leading-[normal]`}
      />
      <div className="flex items-end justify-end gap-[7px] lg:self-end">
        <IconButton icon={copyIcon} label={copied ? 'Copied!' : 'Copy list'} onClick={copy} className="lg:mb-[-1px]" />
        <IconButton icon={downloadIcon} label="Download .txt" onClick={download} />
      </div>
      <p role="status" className="sr-only">
        {copied ? 'Proxy list copied' : ''}
      </p>
    </section>
  )
}

export default ProxyOutputCard
