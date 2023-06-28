'use client'

import { useEffect } from 'react'

export function Modal({
	children,
	isOpen,
	handleClose
}: {
	children: React.ReactNode
	isOpen: boolean
	handleClose: () => void
}) {
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null)
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [handleClose])

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return (): void => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className="absolute z-10 w-full h-full bg-zinc-100 bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 drop-shadow-lg rounded">{children}</div>
		</div>
	)
}
