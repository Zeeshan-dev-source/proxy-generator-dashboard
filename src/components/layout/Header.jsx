import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import Button from '../ui/Button.jsx'
import { navLinks } from '../../data/siteData.js'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative z-10 flex h-[82.932px] w-full items-center justify-between rounded-b-[15px] bg-surface px-4 shadow-card sm:px-6 md:pr-[90px] md:pl-[40px]">
      <Link to="/" className="block h-[51.25px] w-[150px] shrink-0" aria-label="ProxySmart home">
        <img src={logo} alt="ProxySmart" width="150" height="51.25" className="block h-full w-full" />
      </Link>

      <nav className="hidden items-center gap-10 md:flex lg:gap-[96px]">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end
            className="text-[20px] leading-[28px] font-bold text-cream transition hover:text-primary"
          >
            {link.label}
          </NavLink>
        ))}
        <Button to="/signup" className="w-[159px]">Sign Up Now</Button>
      </nav>

      <button
        type="button"
        className="flex size-10 cursor-pointer flex-col items-center justify-center gap-[6px] md:hidden"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={`h-[3px] w-7 rounded-full bg-cream transition ${menuOpen ? 'translate-y-[9px] rotate-45' : ''}`} />
        <span className={`h-[3px] w-7 rounded-full bg-cream transition ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`h-[3px] w-7 rounded-full bg-cream transition ${menuOpen ? '-translate-y-[9px] -rotate-45' : ''}`} />
      </button>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="absolute inset-x-4 top-full mt-2 flex animate-fade-in flex-col gap-4 rounded-[15px] bg-surface p-6 shadow-card sm:inset-x-6 md:hidden"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end
              className="text-[20px] leading-[28px] font-bold text-cream transition hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Button to="/signup" className="w-full" onClick={() => setMenuOpen(false)}>
            Sign Up Now
          </Button>
        </nav>
      )}
    </header>
  )
}

export default Header
