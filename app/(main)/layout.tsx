import Header from '@/components/layouts/site-header'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="px-10 my-6 max-w-[1500px] m-auto">{children}</main>
		</>
	)
}
