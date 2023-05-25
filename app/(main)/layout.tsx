import Header from '@/components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="px-10 my-6 max-w-[1500px] m-auto">{children}</main>
		</>
	)
}
