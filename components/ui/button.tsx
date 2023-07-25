'use client'

import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'

export const buttonStyles = cva(
	[
		'relative',
		'select-none',
		'inline-flex items-center',
		'font-medium',
		'focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2',
		'focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-300 focus-visible:ring-offset-2',
		'disabled:bg-gray-200',
		'disabled:text-gray-400',
		'disabled:hover:cursor-not-allowed'
	],
	{
		variants: {
			intent: {
				primary: 'bg-black text-white hover:bg-zinc-800 active:bg-zinc-600',
				secondary: 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200 border',
				danger: 'text-white bg-red-700 hover:bg-red-800 active:bg-red-900',
				positive: 'text-white bg-green-600 hover:bg-green-700 active:bg-green-800'
			},
			align: {
				start: 'justify-start',
				center: 'justify-center',
				end: 'justify-end'
			},
			size: {
				small: 'px-3 gap-2 text-sm h-8',
				medium: 'px-4 gap-3 text-md h-10',
				large: 'px-5 gap-4 text-lg h-12'
			},
			shape: {
				rectangle: 'rounded',
				round: 'rounded-full',
				square: 'rounded',
				circle: 'rounded-full'
			},
			fullWidth: {
				true: 'w-full'
			}
		},
		defaultVariants: {
			intent: 'primary',
			align: 'center',
			size: 'medium',
			shape: 'rectangle'
		},
		compoundVariants: [
			{
				size: 'small',
				shape: ['circle', 'square'],
				className: '!p-2'
			},
			{
				size: 'medium',
				shape: ['circle', 'square'],
				className: '!p-2.5'
			},
			{
				size: 'large',
				shape: ['circle', 'square'],
				className: '!p-3'
			}
		]
	}
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
	children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ intent, align, size, shape, fullWidth, children, ...props },
	ref
) {
	return (
		<button ref={ref} className={buttonStyles({ intent, align, size, shape, fullWidth })} {...props}>
			{children}
		</button>
	)
})
