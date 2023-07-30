import { SVGAttributes } from 'react'

export type IconProps = SVGAttributes<SVGElement> & {
	name?: string
	size?: '16' | '20' | '24' | '48'
	color?: string | 'currentColor'
}
