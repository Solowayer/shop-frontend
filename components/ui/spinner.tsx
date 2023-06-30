import React from 'react'

type Props = {
	width?: 'full'
}

export function Spinner({ width }: Props) {
	return (
		<div className={`flex justify-center items-center ${width === 'full' && 'w-full'}`}>
			<div
				className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full"
				role="status"
				aria-label="loading"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}
