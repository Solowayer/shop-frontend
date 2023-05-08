import { SVGAttributes } from 'react'

export type IconProps = SVGAttributes<SVGElement> & {
	name?: string
	size?: '16' | '20' | '24'
	color?: string | 'currentColor'
	width?: string
	height?: string
}
