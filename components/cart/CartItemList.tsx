import React from 'react'
import CartItem from './CartItem'

export default function CartItemList({ cartItems }: { cartItems: CartItem[] }) {
	return (
		<div className="flex flex-col gap-8 w-full">
			{cartItems.map((cartItem, index) => (
				<CartItem
					key={index}
					id={cartItem.id}
					image={cartItem.image}
					name={cartItem.name}
					price={cartItem.price}
					quantity={cartItem.quantity}
					productId={cartItem.productId}
				/>
			))}
		</div>
	)
}
