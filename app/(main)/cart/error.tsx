'use client'

import { Button } from '@/ui'
import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<h2 className="font-bold text-xl">Щось не так, бляха!</h2>
			<Button onClick={() => reset()}>Спробувати ще разок</Button>
		</div>
	)
}
