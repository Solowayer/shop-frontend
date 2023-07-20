interface List {
	id: number
	name: string
	userId: number
}

interface CreateList {
	name: string
}

interface EditList extends Partial<CreateList> {}
