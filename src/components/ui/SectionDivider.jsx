import dividerLine from '../../assets/icons/divider-line.svg'

function SectionDivider({ className = '' }) {
  return (
    <div className={`mx-auto h-[2px] w-[calc(100%-2rem)] max-w-[1013px] overflow-hidden ${className}`}>
      <img src={dividerLine} alt="" width="1013" height="2" className="block h-[2px] w-full max-w-none" />
    </div>
  )
}

export default SectionDivider
