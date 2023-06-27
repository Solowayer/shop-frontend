'use client'

import { useEffect } from 'react'
import { ReactPortal } from '../ReactPortal'

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
		<ReactPortal wrapperId="portal-modal">
			<div className="absolute z-10 w-full h-full bg-blend-overlay">
				<div>{children}</div>
			</div>
		</ReactPortal>
	)
}
