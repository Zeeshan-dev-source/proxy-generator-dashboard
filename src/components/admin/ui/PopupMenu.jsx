// Dark popup panel from the design (rounded 10, 12px vertical padding, soft shadow)
function PopupMenu({ children, className = '', ...props }) {
  return (
    <div
      className={`absolute z-30 flex animate-fade-in flex-col rounded-[10px] bg-surface py-[12px] drop-shadow-[0px_2px_12px_rgba(0,0,0,0.1)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default PopupMenu
