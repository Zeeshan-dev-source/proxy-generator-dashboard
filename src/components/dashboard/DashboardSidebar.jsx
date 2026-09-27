import { NavLink } from 'react-router-dom'

// Desktop: vertical sidebar with the active pill from the design.
// Below xl: a horizontal, scrollable tab bar.
// `rootPath` is the dashboard home, which should only be active on its own page.
function DashboardSidebar({ items, label, rootPath }) {
  return (
    <>
      <nav aria-label={label} className="hidden shrink-0 pt-[102px] xl:block xl:w-[220px] wide:w-[299px]">
        <ul className="flex flex-col gap-[37px]">
          {items.map((item) => (
            <li key={item.to} className={item.className ?? ''}>
              <NavLink
                to={item.to}
                end={item.to === rootPath}
                className={({ isActive }) =>
                  `relative flex h-[74px] items-center rounded-r-[15px] text-[24px] leading-[28px] transition-colors ${
                    isActive ? 'bg-surface font-bold backdrop-blur-[1.85px]' : 'hover:bg-surface/40'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="absolute top-[-1px] left-0 h-[75px] w-[8px] bg-cream" />}
                    <span className="ml-[32px] flex w-[30px] justify-center">
                      <img src={item.icon} alt="" width={item.width} height={item.height} />
                    </span>
                    <span className="ml-[20px]">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label={label} className="flex gap-2 overflow-x-auto px-4 pb-2 sm:px-6 xl:hidden">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === rootPath}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 rounded-[10px] px-4 py-2 text-[16px] transition-colors ${
                isActive ? 'bg-surface font-bold' : 'hover:bg-surface/40'
              }`
            }
          >
            <img src={item.icon} alt="" width={item.width * 0.7} height={item.height * 0.7} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default DashboardSidebar
