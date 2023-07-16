import { IconProps } from './types'

export const Check = (props: IconProps) => {
	const { size = '20', color = 'currentColor' } = props
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color} {...props}>
			<path d="M9.00016 16.17L4.83016 12L3.41016 13.41L9.00016 19L21.0002 6.99997L19.5902 5.58997L9.00016 16.17Z" />
		</svg>
	)
}
