'use client'

import React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

type RadioItemProps = {
	label: string
}

const RadioGroup = RadioGroupPrimitive.Root

// ITEM
const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & RadioItemProps
>(({ className, id, label, ...props }, ref) => (
	<div className="flex items-center">
		<RadioGroupPrimitive.Item
			ref={ref}
			id={id}
			className="data-[state=checked]:bg-black focus:border-black data-[state=checked]:border-black w-[20px] h-[20px] rounded-full outline-none border-4 border-zinc-500  cursor-default"
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-white" />
		</RadioGroupPrimitive.Item>
		<label className="pl-2" htmlFor={id}>
			{label}
		</label>
	</div>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
