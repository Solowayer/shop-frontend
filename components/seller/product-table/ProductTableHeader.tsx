import React from 'react'

function TH({ children }: { children: React.ReactNode }) {
	return (
		<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
			{children}
		</th>
	)
}

export default function ProductTableHeader() {
	return (
		<thead className="bg-gray-50">
			<tr>
				<TH>Slug</TH>
				<TH>Назва</TH>
				<TH>Ціна</TH>
				<TH>Рейтинг</TH>
			</tr>
		</thead>
	)
}
