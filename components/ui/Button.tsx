import React, { ComponentProps } from 'react'

export interface ButtonProps extends ComponentProps<'button'> {
	children: React.ReactNode
	fullWidth?: boolean
	variant?: 'primary' | 'secondary'
}

const primary = ['text-black', 'bg-[#ffd814]', 'hover:bg-[#eec90f]', 'active:bg-[#c0a108]'].join(' ')
const secondary = [
	'text-black',
	'bg-transparent',
	'hover:bg-zinc-100',
	'active:bg-zinc-200',
	'border border-zinc-300'
].join(' ')

const buttonStyles = [
	'inline-flex max-h-[40px] items-center justify-center',
	'font-medium',
	'disabled:bg-button-disabled',
	'disabled:text-content-muted',
	'disabled:hover:cursor-not-allowed',
	'py-2 px-4',
	'rounded'
].join(' ')

export function Button({ fullWidth, children, variant = 'primary' }: ButtonProps) {
	return (
		<button className={`${fullWidth ? `w-full` : ''} ${variant === 'primary' ? primary : secondary}  ${buttonStyles} `}>
			{children}
		</button>
	)
}
