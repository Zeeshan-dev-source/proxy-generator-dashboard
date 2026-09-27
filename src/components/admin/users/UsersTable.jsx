import FilterPill from '../ui/FilterPill.jsx'
import FilterMenuPill from '../ui/FilterMenuPill.jsx'
import UserActions from './UserActions.jsx'
import { SearchField, SelectCheck, SortButton } from '../ui/TableControls.jsx'
import { formatLongDate, roleColor } from './userUtils.js'
import { roleFilters } from '../../../data/usersData.js'

// At the 998px design width the fr columns resolve to 183/183/183/208px, putting the columns where the design has them
// (check 374, user 410, role 593, join 776, last login 959, actions 1167); on narrower screens they shrink
const GRID =
  'grid grid-cols-[36px_minmax(139px,183fr)_minmax(139px,183fr)_minmax(139px,183fr)_minmax(139px,208fr)_152px] items-center pl-[28px]'

// Desktop table (1024px and up): 998x582 card, sticky header, 16 rows visible and the rest scroll
function UsersTable({ users, sort, onSort, role, onRoleChange, search, onSearch, selected, onToggle, actions }) {
  const pillState = (key) => (sort.key === key ? 'active' : 'idle')

  return (
    <div className="hidden rounded-[15px] shadow-card lg:block xl:w-[998px]">
      <div className="relative h-[582px] w-full rounded-[15px] bg-surface">
        <div className="absolute top-[16px] right-[10px] bottom-[14px] left-0 scrollbar-panel overflow-y-auto [scrollbar-gutter:stable]">
          <div className={`sticky top-0 z-20 h-[27px] bg-surface ${GRID}`}>
            <span />
            <div className="flex items-center">
              <FilterPill label="User ID" align="center" state={pillState('username')} dir={sort.dir} onClick={() => onSort('username')} aria-label="Sort by user" />
              <SortButton label="Sort by user" className="ml-[9px]" onClick={() => onSort('username')} />
            </div>
            <div className="flex items-center">
              <FilterMenuPill
                label="Role Status"
                align="center"
                menuLabel="Show users"
                options={roleFilters}
                value={role}
                onChange={onRoleChange}
                popupClassName="top-[25px] left-0"
              />
              <SortButton label="Sort by role" className="ml-[9px]" onClick={() => onSort('role')} />
            </div>
            <div className="flex items-center">
              <FilterPill label="Join Date" align="center" state={pillState('joinDate')} dir={sort.dir} onClick={() => onSort('joinDate')} aria-label="Sort by join date" />
              <SortButton label="Sort by join date" className="ml-[9px]" onClick={() => onSort('joinDate')} />
            </div>
            <div className="flex items-center">
              <FilterPill label="Last Login" align="center" state={pillState('lastLogin')} dir={sort.dir} onClick={() => onSort('lastLogin')} aria-label="Sort by last login" />
              <SortButton label="Sort by last login" className="ml-[9px]" onClick={() => onSort('lastLogin')} />
            </div>
            <SearchField value={search} onChange={onSearch} className="-ml-[3px] pr-2" />
          </div>

          {users.length === 0 ? (
            <p className="py-10 text-center text-[14px] text-muted">No users found</p>
          ) : (
            <ul className="mt-[21px] flex flex-col gap-[8px] pb-2" aria-label="Users">
              {users.map((user) => (
                <li key={user.id} className={`${GRID} h-[24px] text-[14px]`}>
                  <SelectCheck checked={selected.has(user.id)} onChange={() => onToggle(user.id)} label={`Select ${user.username}`} />
                  <span className="truncate">{user.username}</span>
                  <span className={`font-bold ${roleColor[user.role]}`}>{user.role}</span>
                  <span className="font-light">{formatLongDate(user.joinDate)}</span>
                  <span className="font-light">{formatLongDate(user.lastLogin)}</span>
                  <UserActions user={user} {...actions} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default UsersTable
