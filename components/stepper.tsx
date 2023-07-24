import React from 'react'
import { Delete } from './icons'
import { Button } from './ui'

type StepperProps = {
	quantity: number
	handleUpdate: (quantity: number) => void
	handleDelete: () => void
}

export default function Stepper({ quantity, handleUpdate, handleDelete }: StepperProps) {
	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1
			handleUpdate(newQuantity)
		} else {
			handleDelete()
		}
	}

	const handleIncreaseQuantity = () => {
		const newQuantity = quantity + 1
		handleUpdate(newQuantity)
	}

	return (
		<div className="flex items-center gap-6 bg-zinc-100 rounded-full p-1.5">
			<Button shape="circle" intent={quantity > 1 ? 'secondary' : 'danger'} onClick={handleDecreaseQuantity}>
				{quantity > 1 ? <span className="flex items-center justify-center h-[20px] w-[20px]">-</span> : <Delete />}
			</Button>
			<span className="font-medium">{quantity}</span>
			<Button shape="circle" intent="secondary" onClick={handleIncreaseQuantity}>
				<span className="flex items-center justify-center h-[20px] w-[20px]">+</span>
			</Button>
		</div>
	)
}
