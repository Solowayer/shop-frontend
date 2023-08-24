'use client'

import React, { useRef, useState } from 'react'
import { Close, ExpandMore, Search } from '../icons'
import { useClickOutside } from '@/lib/hooks/useClickOutside'

export interface ComboboxProps extends React.HTMLProps<HTMLDivElement> {
	value?: string
	defaultValue: string
}

export const Combobox = ({ children, value, defaultValue, ...props }: ComboboxProps) => {
	const [open, setOpen] = useState(false)
	const comboboxRef = useRef<HTMLDivElement>(null)

	useClickOutside(comboboxRef, () => setOpen(false))

	return (
		<div ref={comboboxRef} {...props} className="flex flex-col gap-2 relative">
			<ComboboxButton onClick={() => setOpen(!open)}>{value === undefined ? defaultValue : value}</ComboboxButton>
			{open && <ComboboxContent>{children}</ComboboxContent>}
		</div>
	)
}
Combobox.displayName = 'Combobox'

export interface ComboboxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

export const ComboboxButton = React.forwardRef<HTMLButtonElement, ComboboxButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				className="py-2 px-4 rounded border flex items-center justify-between bg-zinc-50"
				{...props}
			>
				{children}
				<ExpandMore size="24" />
			</button>
		)
	}
)
ComboboxButton.displayName = 'ComboboxButton'

export interface ComboboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value: string
	onValueChange: (value: string) => void
}

export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
	({ children, value, onValueChange, ...props }, ref) => {
		const handleClearClick = () => {
			onValueChange('')
		}

		return (
			<div className="inline-flex w-full relative items-center">
				<div className="absolute left-4">
					<Search />
				</div>

				<div className="absolute right-4 cursor-pointer" onClick={handleClearClick}>
					<Close />
				</div>
				<input
					placeholder="Шукати"
					className={`w-full bg-zinc-50 outline-none py-2 pl-12 pr-4`}
					ref={ref}
					value={value}
					onChange={e => onValueChange(e.target.value)}
					{...props}
				/>
			</div>
		)
	}
)
ComboboxInput.displayName = 'ComboboxInput'

export interface ComboboxContentProps extends React.HTMLProps<HTMLDivElement> {}

export const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
	({ title, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				className={`absolute w-full flex flex-col bg-white border rounded z-50 top-12 overflow-hidden max-h-[300px]`}
			>
				{children}
			</div>
		)
	}
)
ComboboxContent.displayName = 'ComboboxContent'

export interface ComboboxOptionsProps extends React.HTMLProps<HTMLDivElement> {}

export const ComboboxOptions = React.forwardRef<HTMLDivElement, ComboboxOptionsProps>(({ children, ...props }, ref) => {
	return (
		<div ref={ref} {...props} className="flex flex-col overflow-x-auto">
			{children}
		</div>
	)
})
ComboboxOptions.displayName = 'ComboboxOptions'

export interface ComboboxOptionProps extends React.HTMLProps<HTMLDivElement> {
	value?: string
	selected?: boolean
}

export const ComboboxOption = React.forwardRef<HTMLDivElement, ComboboxOptionProps>(
	({ title, children, selected, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				className={`px-4 py-2 hover:bg-zinc-50 cursor-pointer ${selected && 'text-green-600 font-medium'}`}
			>
				<span>{children}</span>
			</div>
		)
	}
)
ComboboxOption.displayName = 'ComboboxOption'
