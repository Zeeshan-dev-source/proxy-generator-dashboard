import UserActions from './UserActions.jsx'
import { SearchField, SelectCheck } from '../ui/TableControls.jsx'
import { formatLongDate, roleColor } from './userUtils.js'
import { roleFilters } from '../../../data/usersData.js'

const sortOptions = [
  { value: '', label: 'Default order' },
  { value: 'username', label: 'User ID' },
  { value: 'role', label: 'Role Status' },
  { value: 'joinDate', label: 'Join Date' },
  { value: 'lastLogin', label: 'Last Login' },
]

const selectClass =
  'h-[34px] min-w-0 flex-1 cursor-pointer rounded-[7px] border border-[#eff0f6]/50 bg-surface px-3 text-[12px] font-semibold outline-none focus-visible:border-input-focus'

// Phones and tablets (below 1024px): users as stacked cards, column filters as selects
function UsersMobileList({ users, sort, onSortKey, onSortDirToggle, role, onRoleChange, search, onSearch, selected, onToggle, actions }) {
  return (
    <div className="rounded-[15px] bg-surface p-4 shadow-card lg:hidden">
      <SearchField value={search} onChange={onSearch} className="h-[40px] rounded-[10px] border border-[#eff0f6]/50 px-3" />

      <div className="mt-3 flex gap-2">
        <label className="sr-only" htmlFor="users-role">
          Show
        </label>
        <select id="users-role" value={role} onChange={(e) => onRoleChange(e.target.value)} className={selectClass}>
          {roleFilters.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="users-sort">
          Sort by
        </label>
        <select id="users-sort" value={sort.key ?? ''} onChange={(e) => onSortKey(e.target.value || null)} className={selectClass}>
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.value ? `Sort: ${o.label}` : o.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onSortDirToggle}
          disabled={!sort.key}
          className="h-[34px] w-[34px] shrink-0 cursor-pointer rounded-[7px] border border-[#eff0f6]/50 text-[14px] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={sort.dir === 'asc' ? 'Sorted ascending, switch to descending' : 'Sorted descending, switch to ascending'}
        >
          {sort.dir === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {users.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-muted">No users found</p>
      ) : (
        <ul className="mt-3 flex flex-col divide-y divide-white/10" aria-label="Users">
          {users.map((user) => (
            <li key={user.id} className="flex gap-3 py-3">
              <SelectCheck checked={selected.has(user.id)} onChange={() => onToggle(user.id)} label={`Select ${user.username}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[16px] font-bold">{user.username}</span>
                  <span className={`text-[12px] font-bold ${roleColor[user.role]}`}>{user.role}</span>
                </div>
                <p className="mt-1 text-[12px] font-light opacity-70">
                  Joined {formatLongDate(user.joinDate)} · Last login {formatLongDate(user.lastLogin)}
                </p>
                <UserActions user={user} {...actions} className="mt-2" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UsersMobileList
