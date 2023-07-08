'use client'

import DefaultError from '@/components/layouts/default-error'
import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return <DefaultError reset={reset} />
}
