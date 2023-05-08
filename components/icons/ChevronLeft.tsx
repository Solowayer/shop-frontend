import { IconProps } from './types'

export const ChevronLeft = (props: IconProps) => {
  const { size = '20', color = 'currentColor' } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      {...props}
    >
      <path d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6Z" />
    </svg>
  )
}
