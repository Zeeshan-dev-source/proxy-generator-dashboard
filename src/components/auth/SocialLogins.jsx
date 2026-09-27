import dividerOr from '../../assets/icons/divider-or.svg'
import googleIcon from '../../assets/icons/google.svg'
import metaIcon from '../../assets/icons/infinite.svg'
import appleIcon from '../../assets/icons/apple.svg'

// Icon boxes are sized so the visible logo matches the Figma file (each SVG has some padding in its viewBox)
const providers = [
  { name: 'Google', button: 'h-[67px] sm:w-[131px]', icon: googleIcon, size: 55 },
  { name: 'Meta', button: 'h-[71px] sm:ml-[21px] sm:w-[136px]', icon: metaIcon, size: 62 },
  { name: 'Apple', button: 'h-[71px] sm:ml-[15px] sm:w-[137px]', icon: appleIcon, size: 52 },
]

function SocialLogins({ className = 'mt-[47px]' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-[11px]">
        <p className="shrink-0 text-[16px] text-muted">Or continue with</p>
        <img src={dividerOr} alt="" width="304" height="0.5" className="h-[0.5px] min-w-0 flex-1" />
      </div>

      <div className="mt-[32px] flex items-end gap-3 sm:gap-0">
        {providers.map(({ name, button, icon, size }) => (
          <button
            key={name}
            type="button"
            aria-label={`Continue with ${name}`}
            className={`flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-[4px] bg-social transition hover:brightness-95 sm:flex-none ${button}`}
          >
            <img src={icon} alt="" width={size} height={size} className="shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default SocialLogins
