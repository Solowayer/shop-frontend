import React from 'react'
import { ComponentProps, forwardRef } from 'react'

const inputStyles = ['w-full px-4 bg-zinc-50 border rounded overflow', 'text-md h-10']

interface InputProps extends ComponentProps<'input'> {
	label?: string
	icon?: React.ReactNode
	fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ id, label, icon, fullWidth, type = 'text', placeholder, ...props },
	ref
) {
	return (
		<div className={`inline-flex flex-col ${fullWidth ? 'w-full' : ''}`}>
			{label && (
				<label className={`text-md mb-2`} htmlFor={id}>
					{label}
				</label>
			)}
			<div className="inline-flex w-full relative items-center">
				{icon && <div className="absolute left-4">{icon}</div>}
				<input
					className={`${inputStyles} ${icon && '!pl-12'}`}
					id={id}
					type={type}
					placeholder={placeholder}
					ref={ref}
					{...props}
				/>
			</div>
		</div>
	)
})
