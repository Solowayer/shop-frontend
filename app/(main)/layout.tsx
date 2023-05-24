import Header from '@/components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="flex flex-col items-center gap-6 px-10 mt-6">
				<main className="px-10 my-6 max-w-[1500px] m-auto">{children}</main>
			</main>
		</>
	)
}
