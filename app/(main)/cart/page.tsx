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
						name="Монітор 28 Samsung Odyssey G7 S28AG702 (LS28AG702NIXCI) 4K HDR400 / IPS 8-Bit / 144Гц / sRGB 99% / G-SYNC Compatible"
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
