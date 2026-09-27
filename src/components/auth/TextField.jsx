// 69px outlined input from the auth designs; the label is visually hidden
function TextField({ id, label, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        className="h-[69px] w-full rounded-[10px] border border-input-border bg-surface px-[35px] text-[16px] text-input-text outline-none transition-colors placeholder:text-input-placeholder focus:border-input-focus"
        {...props}
      />
    </div>
  )
}

export default TextField
