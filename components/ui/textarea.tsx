import React from 'react'
import { ComponentProps, forwardRef } from 'react'

interface TextAreaProps extends ComponentProps<'textarea'> {
	label?: string
	fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function Textarea(
	{ id, label, fullWidth, placeholder, ...props },
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
				<textarea
					ref={ref}
					className="w-full h-[150px] bg-zinc-50 border border-zinc-400 rounded text-md p-2"
					id={id}
					placeholder={placeholder}
					{...props}
				/>
			</div>
		</div>
	)
})
