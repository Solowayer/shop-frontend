import { Close } from '@/components/icons'
import React from 'react'

type NotificationProps = {
	text: string
	isError?: boolean
	isSuccess?: boolean
	isWarn?: boolean
}

export function Notification({ text, isError, isSuccess, isWarn }: NotificationProps) {
	return (
		<div className="absolute flex bottom-0 right-0 z-10 items-end justify-center p-6 w-[400px]">
			<div
				className={`inline-flex overflow-hidden bg-white drop-shadow-md border-2 rounded w-full ${
					isError ? 'border-red-300' : isSuccess ? 'border-green-300' : isWarn ? 'border-orange-300' : 'border-zinc-500'
				}`}
			>
				<div className="w-full flex items-center justify-between">
					<span
						className={`font-medium p-4 ${
							isError ? 'text-red-500' : isSuccess ? 'text-green-500' : isWarn ? 'text-orange-500' : 'text-black'
						}`}
					>
						{text}
					</span>
					<div
						className={`flex items-center justify-center text-white w-[40px] h-full cursor-pointer ${
							isError ? 'bg-red-500' : isSuccess ? 'bg-green-500' : isWarn ? 'bg-orange-500' : 'bg-zinc-500'
						}`}
					>
						<Close />
					</div>
				</div>
			</div>
		</div>
	)
}
