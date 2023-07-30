import { IconProps } from './types'

export const Add = (props: IconProps) => {
	const { size = '20', color = 'currentColor' } = props
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color} {...props}>
			<path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
		</svg>
	)
}
