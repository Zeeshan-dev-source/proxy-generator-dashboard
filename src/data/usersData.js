import statBarGreen from '../assets/admin/stat-bar-green.svg'
import statBarLavender from '../assets/admin/stat-bar-lavender.svg'

export const usersSummary = [
  { value: '500', label: 'Total Users', bar: statBarGreen },
  { value: '$500', label: 'Total Balance', bar: statBarGreen },
  { value: '5:1', label: 'User/Order Ratio', bar: statBarLavender },
]

export const USER_ROLE = { admin: 'Admin', user: 'User', banned: 'Banned' }

// Options in the "Role Status" column popup
export const roleFilters = [
  { value: 'all', label: 'All Users' },
  { value: USER_ROLE.admin, label: 'Admin' },
  { value: USER_ROLE.user, label: 'User' },
  { value: USER_ROLE.banned, label: 'Banned' },
]

// Sample users until the API is connected. The first eight are the customers on the orders pages.
const handles = [
  'CoolCoder', 'ProxyKing', 'DataMiner', 'NetRunner', 'ByteSmith', 'CloudNinja', 'ScrapeMaster', 'PacketPro',
  'HexHunter', 'LatencyLord', 'PingPilot', 'SocketSage', 'TunnelVision', 'RouteRider', 'CacheQueen', 'FirewallFox',
  'BandwidthBoss', 'GeoGhost', 'IPWizard', 'CrawlCraft', 'NodeNomad', 'VPNViking', 'SubnetSam', 'ProtoPanda',
  'AsyncAce', 'DnsDiver', 'EdgeEagle', 'FlowFinch', 'GatewayGus', 'HostHawk', 'JsonJay', 'KernelKai',
  'LoopLynx', 'MeshMole', 'NatNinja', 'OctetOwl', 'PortPuma', 'QueueQuail', 'RelayRaven', 'ShardShark',
  'TcpTiger', 'UdpUrchin', 'VlanVole', 'WireWolf', 'XmlXerus', 'YamlYak', 'ZoneZebra', 'AgentApe',
]

function buildUsers() {
  const joined = new Date(2023, 7, 29) // 29 August 2023
  const lastSeen = new Date(2023, 10, 29) // 29 November 2023
  const day = 24 * 60 * 60 * 1000
  return handles.map((handle, i) => {
    // As in the design: first user is an admin, third is banned
    const role =
      i === 0 || i % 11 === 5 ? USER_ROLE.admin : i === 2 || i % 7 === 6 ? USER_ROLE.banned : USER_ROLE.user
    return {
      id: handle,
      username: handle,
      email: `${handle.toLowerCase()}@mail.com`,
      role,
      joinDate: new Date(joined.getTime() - i * 9 * day).toISOString(),
      lastLogin: new Date(lastSeen.getTime() - i * 2 * day).toISOString(),
    }
  })
}

export const users = buildUsers()
