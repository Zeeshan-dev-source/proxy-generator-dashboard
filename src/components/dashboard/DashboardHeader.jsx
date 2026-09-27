import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import settingIcon from '../../assets/admin/setting-fill.svg'

// Header shared by the admin and user dashboards: logo, settings, avatar, name and log out
function DashboardHeader({ homeTo, homeLabel, settingsTo, user }) {
  return (
    <header className="relative z-10 flex h-[82.93px] w-full items-center justify-between px-4 sm:px-6 md:pr-[50px] md:pl-[40px]">
      <Link to={homeTo} className="block h-[51.25px] w-[150px] shrink-0" aria-label={homeLabel}>
        <img src={logo} alt="ProxySmart" width="150" height="51.25" className="block h-full w-full" />
      </Link>

      <div className="flex items-center">
        <Link to={settingsTo} aria-label="Settings" className="transition hover:opacity-80">
          <img src={settingIcon} alt="" width="40" height="41" />
        </Link>
        <img
          src={user.avatar}
          alt={user.name}
          width="50"
          height="55"
          className="ml-6 h-[55px] w-[50px] rounded-[25px] object-cover shadow-cta md:ml-[47px]"
        />
        <div className="ml-[26px] hidden w-[168px] text-[14px] leading-[18.5px] sm:block">
          <p>{user.name}</p>
          <Link to="/login" className="text-muted transition hover:text-cream">
            Log out
          </Link>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
