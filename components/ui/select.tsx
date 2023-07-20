'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ExpandMore } from '../icons'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className="flex h-10 items-center justify-between rounded-md bg-zinc-100 px-3 py-2 placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<ExpandMore />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'item-aligned', ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md p-2 ${
				position === 'popper' && 'translate-y-1'
			}`}
			position={position}
			{...props}
		>
			<SelectPrimitive.Viewport
				className={`${
					position === 'popper'
						? 'w-full h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]'
						: 'p-1'
				} `}
			>
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label ref={ref} className="py-1.5 pl-8 pr-2 text-sm font-semibold" {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className="relative flex w-full items-center rounded-sm pl-8 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none hover:cursor-pointer data-[disabled]:opacity-50 data-[highlighted]:bg-zinc-100"
		{...props}
	>
		<SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
			<Check />
		</SelectPrimitive.ItemIndicator>

		<SelectPrimitive.ItemText className="data-[selected]:font-bold">{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator ref={ref} className="m-[5px] h-px bg-zinc-300" {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }
