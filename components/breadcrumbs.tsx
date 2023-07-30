import { StyledLink } from '@/components/ui'
import { ChevronRight } from './icons'

type BreadcrumbsProps = {
	name: string
	href: string
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbsProps[] }) {
	return (
		<div className="flex items-center gap-1">
			{breadcrumbs.map((crumb, index) => (
				<span key={crumb.name + index} className="flex items-center gap-1">
					{index !== 0 && <ChevronRight />}
					{index === breadcrumbs.length - 1 ? (
						<span>{crumb.name}</span>
					) : (
						<StyledLink href={crumb.href}>{crumb.name}</StyledLink>
					)}
				</span>
			))}
		</div>
	)
}
