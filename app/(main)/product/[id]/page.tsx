import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import React from 'react'

export default function Product() {
	return (
		<div className="flex gap-10">
			<div className="relative flex w-[400px] h-[400px]">
				<Image
					src="https://m.media-amazon.com/images/I/61tgzb04gQL._SX522_.jpg"
					alt={''}
					fill
					className="object-contain p-4"
				/>
			</div>
			<div className="flex flex-1 gap-8 items-start justify-between">
				<div className="w-full flex flex-col gap-4">
					<span className="font-medium text-2xl">Xbox Series S - Holiday Console</span>
					<span className="font-bold">Про товар:</span>
					<span className="text-md text-zinc-600">
						About this item Go all digital with Xbox Series S and experience next-gen speed and performance at a great
						price. Bundle includes: Xbox Series S console, one Xbox Wireless Controller, a high-speed HDMI cable, power
						cable, and 2 AA batteries. Make the most of every gaming minute with Quick Resume, lightning-fast load
						times, and gameplay of up to 120 FPS—all powered by Xbox Velocity Architecture.* Enjoy digital games from
						four generations of Xbox, with hundreds of optimized titles that look and play better than ever. Add Xbox
						Game Pass Ultimate (membership sold separately) to play new games day one. Enjoy hundreds of high-quality
						games with friends on console, PC, and cloud. Plus, now you can skip the install and jump in with cloud
						gaming.* 
					</span>
				</div>
				<div className="flex flex-col gap-4 w-[372px] p-4 border">
					<span className="text-xl">718 ₴</span>
					<Button fullWidth>Додати в корзину</Button>
				</div>
			</div>
		</div>
	)
}
