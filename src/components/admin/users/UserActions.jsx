import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IconButton from '../ui/IconButton.jsx'
import PopupMenu from '../ui/PopupMenu.jsx'
import useDismiss from '../../../hooks/useDismiss.js'
import menuIcon from '../../../assets/admin/menu.svg'
import shieldIcon from '../../../assets/admin/shield-check.svg'
import removeIcon from '../../../assets/admin/remove-fill.svg'
import closeIcon from '../../../assets/admin/close-round-fill.svg'
import { USER_ROLE } from '../../../data/usersData.js'

const menuItemClass = 'cursor-pointer px-[16px] py-[8px] text-left text-[14px] tracking-[-0.154px] hover:bg-white/5'

// Options · make/remove admin · ban/unban · delete — spaced as in the design (icons at 0, 41, 80, 123px)
function UserActions({ user, onToggleAdmin, onToggleBan, onDelete, className = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useDismiss(menuRef, closeMenu, menuOpen)

  const isAdmin = user.role === USER_ROLE.admin
  const isBanned = user.role === USER_ROLE.banned

  return (
    <div className={`flex items-center ${className}`}>
      <div ref={menuRef} className="relative">
        <IconButton
          icon={menuIcon}
          label="Options"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        />
        {menuOpen && (
          <PopupMenu role="menu" className="top-[30px] right-[-12px] min-w-[170px]">
            <Link to={`/admin/orders?search=${encodeURIComponent(user.username)}`} role="menuitem" className={menuItemClass}>
              View orders
            </Link>
            <button
              type="button"
              role="menuitem"
              className={menuItemClass}
              onClick={() => {
                navigator.clipboard?.writeText(user.email)
                setMenuOpen(false)
              }}
            >
              Copy e-mail
            </button>
          </PopupMenu>
        )}
      </div>
      <IconButton
        icon={shieldIcon}
        label={isAdmin ? 'Remove admin' : 'Make admin'}
        aria-pressed={isAdmin}
        className="ml-[17px]"
        onClick={() => onToggleAdmin(user.id)}
      />
      <IconButton
        icon={removeIcon}
        label={isBanned ? 'Unban user' : 'Ban user'}
        aria-pressed={isBanned}
        className="ml-[15px]"
        onClick={() => onToggleBan(user.id)}
      />
      <IconButton icon={closeIcon} label="Delete user" className="ml-[19px]" onClick={() => onDelete(user)} />
    </div>
  )
}

export default UserActions
