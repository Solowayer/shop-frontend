export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className="max-w-[1500px] m-auto">{children}</main>
		</>
	)
}
