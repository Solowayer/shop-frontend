import { StyledLink } from '@/components/ui'
import { Home, ChevronRight } from './icons'

export default function CategoryBreadcrumbs({ breadcrumbs }: { breadcrumbs: Category[] }) {
	return (
		<div className="flex items-center gap-1">
			<StyledLink href="/">
				<Home size="24" />
			</StyledLink>
			<ChevronRight />
			{breadcrumbs.map((crumb, index) => (
				<span key={crumb.id} className="flex items-center gap-1">
					{index !== 0 && <ChevronRight />}
					{index === breadcrumbs.length - 1 ? (
						<span>{crumb.name}</span>
					) : (
						<StyledLink href={`/category/${crumb.slug}`}>{crumb.name}</StyledLink>
					)}
				</span>
			))}
		</div>
	)
}
