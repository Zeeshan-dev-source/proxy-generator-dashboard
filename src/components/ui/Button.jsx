import { Link } from 'react-router-dom'

// Green primary button. Renders a router Link when `to` is given.
function Button({ children, to, className = '', ...props }) {
  const classes = `inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[10px] bg-primary text-[20px] font-bold whitespace-nowrap text-surface transition hover:brightness-110 ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
