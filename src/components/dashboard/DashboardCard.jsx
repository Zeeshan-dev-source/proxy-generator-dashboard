// Section title + dark card used across the admin dashboard
function DashboardCard({ title, className = '', titleClassName = '', cardClassName = 'mt-[16px]', children }) {
  return (
    <section className={className}>
      <h2 className={`text-[20px] leading-[28px] font-bold ${titleClassName}`}>{title}</h2>
      <div className={`relative rounded-[15px] bg-surface shadow-card ${cardClassName}`}>{children}</div>
    </section>
  )
}

export default DashboardCard
