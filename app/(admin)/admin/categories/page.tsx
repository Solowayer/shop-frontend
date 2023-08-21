import { Button, Input } from '@/components/ui'
import React from 'react'

export default function Page() {
	return (
		<div className="w-full">
			<form className="flex flex-col gap-6" action="">
				<Input label="Назва категорії" />
				<Input label="Slug" />
				<Input label="Батьківська категорія" />
				<Button type="submit">Відправити</Button>
			</form>
		</div>
	)
}
