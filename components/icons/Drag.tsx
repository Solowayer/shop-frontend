import { IconProps } from './types'

export const Drag = (props: IconProps) => {
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
      <path d="M4 15v-2h16v2Zm0-4V9h16v2Z" />
    </svg>
  )
}
