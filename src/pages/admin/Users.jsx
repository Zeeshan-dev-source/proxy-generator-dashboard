import { useCallback, useMemo, useState } from 'react'
import SummaryStat, { SummaryCard } from '../../components/admin/ui/SummaryStat.jsx'
import ConfirmDialog from '../../components/admin/ui/ConfirmDialog.jsx'
import UsersTable from '../../components/admin/users/UsersTable.jsx'
import UsersMobileList from '../../components/admin/users/UsersMobileList.jsx'
import { matchesUserSearch, sortUsers } from '../../components/admin/users/userUtils.js'
import { users as sampleUsers, usersSummary, USER_ROLE } from '../../data/usersData.js'

function Users() {
  const [userList, setUserList] = useState(sampleUsers)
  const [role, setRole] = useState('all')
  // No pill is active in the design, so the list starts in its original order
  const [sort, setSort] = useState({ key: null, dir: 'asc' })
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(() => new Set())
  const [pendingDelete, setPendingDelete] = useState(null)
  const cancelDelete = useCallback(() => setPendingDelete(null), [])

  const visibleUsers = useMemo(() => {
    const filtered = userList.filter((u) => (role === 'all' || u.role === role) && matchesUserSearch(u, search))
    return sortUsers(filtered, sort)
  }, [userList, role, sort, search])

  // Same column again flips the direction; dates start newest first, text A→Z
  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: key === 'joinDate' || key === 'lastLogin' ? 'desc' : 'asc' },
    )
  }

  const setUserRole = (id, next) => setUserList((list) => list.map((u) => (u.id === id ? { ...u, role: next } : u)))

  const actions = {
    onToggleAdmin: (id) => {
      const user = userList.find((u) => u.id === id)
      setUserRole(id, user.role === USER_ROLE.admin ? USER_ROLE.user : USER_ROLE.admin)
    },
    onToggleBan: (id) => {
      const user = userList.find((u) => u.id === id)
      setUserRole(id, user.role === USER_ROLE.banned ? USER_ROLE.user : USER_ROLE.banned)
    },
    onDelete: (user) => setPendingDelete(user),
  }

  const confirmDelete = () => {
    const id = pendingDelete.id
    setUserList((list) => list.filter((u) => u.id !== id))
    setSelected((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setPendingDelete(null)
  }

  const toggleSelected = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const listProps = {
    users: visibleUsers,
    sort,
    role,
    onRoleChange: setRole,
    search,
    onSearch: setSearch,
    selected,
    onToggle: toggleSelected,
    actions,
  }

  return (
    <div className="max-w-[1002px] xl:pb-[282px]">
      <h2 className="text-[20px] leading-[28px] font-bold">Users</h2>
      <SummaryCard className="mt-[16px]">
        {usersSummary.map((stat) => (
          <SummaryStat key={stat.label} bar={stat.bar} value={stat.value} label={stat.label} />
        ))}
      </SummaryCard>

      <section aria-labelledby="all-users-title" className="mt-10 xl:mt-[73px]">
        <h2 id="all-users-title" className="text-[20px] leading-[28px] font-bold xl:pl-[10px]">
          All Users
        </h2>
        <div className="mt-[14px]">
          <UsersTable {...listProps} onSort={handleSort} />
          <UsersMobileList
            {...listProps}
            onSortKey={(key) => setSort((prev) => ({ key, dir: prev.dir }))}
            onSortDirToggle={() => setSort((prev) => ({ ...prev, dir: prev.dir === 'asc' ? 'desc' : 'asc' }))}
          />
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete user?"
        message={pendingDelete ? `${pendingDelete.username} will be removed. This can’t be undone.` : ''}
        confirmLabel="Delete user"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}

export default Users
