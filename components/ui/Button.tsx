import React, { ComponentProps } from 'react'

export interface ButtonProps extends ComponentProps<'button'> {
	children: React.ReactNode
	fullWidth?: boolean
}

const buttonStyles = [
	'inline-flex items-center justify-center',
	'font-medium',
	'disabled:bg-button-disabled',
	'disabled:text-content-muted',
	'disabled:hover:cursor-not-allowed',
	'bg-black',
	'text-white',
	'py-2 px-4',
	'rounded',
	'hover:bg-zinc-800',
	'active:bg-zinc-600'
].join(' ')

export function Button({ fullWidth, children }: ButtonProps) {
	return <button className={`${fullWidth ? `w-full` : ''} ${buttonStyles} `}>{children}</button>
}
