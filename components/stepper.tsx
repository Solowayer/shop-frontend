import React from 'react'
import { Delete } from './icons'
import { Button } from './ui'

type StepperProps = {
	value: number
	setValue: (value: number) => void
	onDeleteButton: () => void
	min?: number
	max?: number
}

export default function Stepper({ value, setValue, onDeleteButton, min = 1, max }: StepperProps) {
	const handleValueDecrease = () => {
		const newValue = Math.max(value - 1, min)
		setValue(newValue)
		if (value === min) {
			onDeleteButton()
		}
	}

	const handleValueIncrease = () => {
		const newValue = max !== undefined ? Math.min(value + 1, max) : value + 1
		setValue(newValue)
	}

	console.log(value)

	return (
		<div>
			<div className="flex items-center gap-6 bg-zinc-100 rounded-full p-1.5">
				<Button shape="circle" intent={value > 1 ? 'secondary' : 'danger'} onClick={handleValueDecrease}>
					{value > 1 ? <span className="flex items-center justify-center h-[20px] w-[20px]">-</span> : <Delete />}
				</Button>
				<span className="font-medium">{value}</span>
				<Button shape="circle" intent="secondary" onClick={handleValueIncrease} disabled={value === max}>
					<span className="flex items-center justify-center h-[20px] w-[20px]">+</span>
				</Button>
			</div>
		</div>
	)
}
