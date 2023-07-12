export const usePagination = (totalPages: number, page: number) => {
	let pages: number[] = Array.from({ length: totalPages }, (_, index) => index + 1)
	const maxVisiblePages = 9

	if (totalPages > maxVisiblePages) {
		const middlePage = Math.ceil(maxVisiblePages / 2)

		if (page <= middlePage) {
			pages = [...pages.slice(0, maxVisiblePages - 2), -1, totalPages]
		} else if (page > totalPages - middlePage) {
			pages = [1, -1, ...pages.slice(totalPages - maxVisiblePages + 2)]
		} else {
			const startPage = page - Math.floor((maxVisiblePages - 3) / 2)
			const endPage = page + Math.floor((maxVisiblePages - 4) / 2)
			pages = [1, -1, ...pages.slice(startPage, endPage), -1, totalPages]
		}
	}

	return pages
}
