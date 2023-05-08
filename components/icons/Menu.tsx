import { IconProps } from './types'

export const Menu = (props: IconProps) => {
	const { size = '20', color = 'currentColor' } = props
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color} {...props}>
			<path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
		</svg>
	)
}
