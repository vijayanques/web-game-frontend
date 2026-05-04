import { IconStar } from './Icons'

interface StarRatingProps {
  value: number
  size?: number
}

export default function StarRating({ value, size = 14 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar
          key={i}
          size={size}
          filled={i <= Math.round(value)}
          className="text-orange-500"
        />
      ))}
    </div>
  )
}
