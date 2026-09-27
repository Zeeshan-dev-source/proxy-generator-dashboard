// Cream 312x62 submit button centred in the auth card (card padding is 80px left / 65px right)
function SubmitButton({ children, className = '' }) {
  return (
    <button
      type="submit"
      className={`mx-auto mt-[47px] flex h-[62px] w-full max-w-[312px] cursor-pointer items-center justify-center rounded-[8px] bg-cream text-[16px] text-surface transition hover:brightness-95 sm:mr-0 sm:ml-[56px] ${className}`}
    >
      {children}
    </button>
  )
}

export default SubmitButton
