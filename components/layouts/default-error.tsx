import React from 'react'
import { Button } from '../ui'

type Props = {
	reset: () => void
}

export default function DefaultError({ reset }: Props) {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<h2 className="font-bold text-xl">Щось пішло не так!</h2>
			<Button onClick={() => reset()}>Спробувати ще раз</Button>
		</div>
	)
}
