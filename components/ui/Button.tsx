'use client'

import React, { ComponentProps } from 'react'

export interface ButtonProps extends ComponentProps<'button'> {
	children: React.ReactNode
	fullWidth?: boolean
	variant?: 'primary' | 'secondary'
	onClick?: () => void
}

const primary = ['text-white', 'bg-black', 'hover:bg-zinc-800', 'active:bg-zinc-600'].join(' ')

const secondary = [
	'text-black',
	'bg-transparent',
	'hover:bg-zinc-100',
	'active:bg-zinc-200',
	'border border-zinc-300'
].join(' ')

const buttonStyles = [
	'relative',
	'inline-flex max-h-[40px] items-center justify-center',
	'gap-2',
	'font-medium',
	'py-2 px-4',
	'rounded',
	'disabled:bg-gray-200',
	'disabled:text-gray-400',
	'disabled:hover:!cursor-not-allowed',
	'disabled:hover:!bg-gray-200',
	'disabled:hover:!text-gray-400'
].join(' ')

export function Button({ fullWidth, children, variant = 'primary', onClick, ...props }: ButtonProps) {
	return (
		<button
			className={`${fullWidth ? `w-full` : ''} ${variant === 'primary' ? primary : secondary}  ${buttonStyles} `}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	)
}
