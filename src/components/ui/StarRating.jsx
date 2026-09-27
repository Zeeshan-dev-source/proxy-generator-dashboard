import star from '../../assets/icons/star-lg.svg'
import starEmpty from '../../assets/icons/star-lg-empty.svg'

function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex shrink-0 gap-[4px]" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <img key={i} src={i < rating ? star : starEmpty} alt="" width="22" height="22" />
      ))}
    </div>
  )
}

export default StarRating
