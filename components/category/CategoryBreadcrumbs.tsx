import { StyledLink } from '@/ui'

export default function CategoryBreadcrumbs({ breadcrumbs }: { breadcrumbs: Category[] }) {
	return (
		<div>
			<StyledLink href="/">Додому</StyledLink>
			{' > '}
			{breadcrumbs.map((crumb, index) => (
				<span key={crumb.id}>
					{index !== 0 && ' > '}
					{index === breadcrumbs.length - 1 ? (
						<>{crumb.name}</>
					) : (
						<StyledLink href={`/category/${crumb.id}`}>{crumb.name}</StyledLink>
					)}
				</span>
			))}
		</div>
	)
}
