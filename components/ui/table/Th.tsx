export function TH({ children }: { children: React.ReactNode }) {
	return (
		<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500">
			{children}
		</th>
	)
}
