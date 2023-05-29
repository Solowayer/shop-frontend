import React from 'react'

type Props = {
	width?: 'full'
}

export default function Spinner({ width }: Props) {
	return (
		<div className={`flex justify-center items-center ${width === 'full' && 'w-full'}`}>
			<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
		</div>
	)
}
