import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/Button'
import React from 'react'

export default function Cart() {
	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-4xl font-bold">Корзина</h1>
			<div className="flex gap-10">
				<div className="flex flex-col gap-8 w-full">
					<CartItem
						image="https://m.media-amazon.com/images/I/51HqC0rU9HL._AC_AA180_.jpg"
						name="AMD Ryzen 7 7800X3D 8-Core, 16-Thread Desktop Processor"
						price={717}
						quantity={0}
					/>
				</div>
				<div className="flex flex-col w-[400px] gap-4">
					<div className="flex justify-between">
						<span>Всього (2 товари):</span>
						<span className="text-lg font-bold">400 ₴</span>
					</div>
					<Button>Оформити замовлення</Button>
				</div>
			</div>
		</div>
	)
}
