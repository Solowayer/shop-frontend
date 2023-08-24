import { useEffect } from 'react'

export function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [ref, callback])
}
