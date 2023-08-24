import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { ExpandMore, Search } from '../icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '@/lib/hooks/useDebounce'
import CategoryService from '@/services/category-service'
import { Input } from './input'

interface Option {
	value: string
	label: string
}

interface ComboBoxProps {
	options: Option[]
	onSelect: (selectedValue: string) => void
}

export const ComboboxItem = () => {
	return <span className="py-2 px-4">Info</span>
}

export const ComboboxTest = () => {
	const queryClient = useQueryClient()

	const [selectedValue, setSelectedValue] = useState<string | null>(null)
	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debouncedSearch = useDebounce(searchTerm)

	const { data: categories, isLoading } = useQuery(['all-categories', debouncedSearch], () =>
		CategoryService.findAllCategories({ q: debouncedSearch })
	)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value

		setSearchTerm(newSearchTerm)
		queryClient.invalidateQueries(['all-categories', newSearchTerm])
	}

	return (
		<Combobox>
			<ComboboxButton onClick={() => setOpen(!open)}>{selectedValue}</ComboboxButton>
			<ComboboxContent open={open}>
				<ComboboxInput icon={<Search />} onChange={e => handleInputChange(e)} />
				<ComboboxOptions>
					{categories &&
						categories.map(item => (
							<ComboboxOption key={item.id} onClick={() => setSelectedValue(item.name)} className="cursor-pointer">
								{item.name}
							</ComboboxOption>
						))}
				</ComboboxOptions>
			</ComboboxContent>
		</Combobox>
	)
}

export interface ComboboxProps extends React.HTMLProps<HTMLDivElement> {}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(({ children, ...props }, ref) => {
	return (
		<div ref={ref} {...props} className="flex flex-col gap-2 relative">
			{children}
		</div>
	)
})
Combobox.displayName = 'Combobox'

export interface ComboboxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}

export const ComboboxButton = React.forwardRef<HTMLButtonElement, ComboboxButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<button ref={ref} type="button" className="py-2 px-4 rounded border flex items-center justify-between" {...props}>
				{children}
				<ExpandMore size="24" />
			</button>
		)
	}
)
ComboboxButton.displayName = 'ComboboxButton'

export interface ComboboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode
}

export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
	({ children, icon, ...props }, ref) => {
		return (
			<div className="inline-flex w-full relative items-center">
				{icon && <div className="absolute left-4">{icon}</div>}
				<input
					placeholder="Шукати"
					className={`${icon && '!pl-12'} w-full bg-zinc-50 outline-none py-2 px-4`}
					ref={ref}
					{...props}
				/>
			</div>
		)
	}
)
ComboboxInput.displayName = 'ComboboxInput'

export interface ComboboxContentProps extends React.HTMLProps<HTMLDivElement> {
	open: boolean
}

export const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
	({ title, open, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				className={`${
					open ? 'absolute' : 'hidden'
				} w-full flex flex-col gap-2 bg-white border rounded z-50 top-12 overflow-hidden max-h-[300px]`}
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
}

export const ComboboxOption = React.forwardRef<HTMLDivElement, ComboboxOptionProps>(
	({ title, children, ...props }, ref) => {
		return (
			<div ref={ref} {...props} className="px-4 py-2 hover:bg-zinc-50">
				<span className="cursor-pointer">{children}</span>
			</div>
		)
	}
)
ComboboxOption.displayName = 'ComboboxOption'
