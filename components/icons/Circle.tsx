import { IconProps } from './types'

export const Circle = (props: IconProps) => {
	const { size = '12', color = 'currentColor' } = props
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color} {...props}>
			<circle cx="12" cy="12" r="12" />
		</svg>
	)
}
