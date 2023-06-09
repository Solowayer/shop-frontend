import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className="flex flex-col items-center gap-6 px-10 mt-6">
				<Link href="/" className="font-bold text-3xl">
					SHOP
				</Link>
				<div className="w-[440px] flex flex-col gap-4">{children}</div>
			</main>
		</>
	)
}
