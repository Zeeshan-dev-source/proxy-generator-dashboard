import { Link } from 'react-router-dom'
import creamButtonBg from '../../assets/icons/btn-bg-cream.svg'
import pinkButtonBg from '../../assets/icons/btn-bg-pink.svg'
import pinkSmallButtonBg from '../../assets/admin/btn-bg-pink-160.svg'
import tealButtonBg from '../../assets/admin/btn-bg-teal.svg'
import greenButtonBg from '../../assets/admin/btn-bg-green.svg'
import purpleButtonBg from '../../assets/admin/btn-bg-purple.svg'

const variants = {
  cream: { bg: creamButtonBg, width: 160, className: 'w-[160px]' },
  pink: { bg: pinkButtonBg, width: 209, className: 'w-[209px]' },
  'pink-sm': { bg: pinkSmallButtonBg, width: 160, className: 'w-[160px]' },
  teal: { bg: tealButtonBg, width: 160, className: 'w-[160px]' },
  green: { bg: greenButtonBg, width: 160, className: 'w-[160px]' },
  purple: { bg: purpleButtonBg, width: 160, className: 'w-[160px]' },
}

// Small 32px-tall button from the design. Renders a router Link when `to` is given.
function PillButton({ children, to, variant = 'cream', className = '', ...props }) {
  const v = variants[variant]
  const classes = `relative inline-flex h-[32px] cursor-pointer items-center justify-center transition hover:brightness-95 disabled:cursor-not-allowed disabled:hover:brightness-100 ${v.className} ${className}`
  const content = (
    <>
      <img src={v.bg} alt="" width={v.width} height="32" className="absolute inset-0" />
      <span className="relative font-inter text-[14px] font-medium whitespace-nowrap text-surface">{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}

export default PillButton
