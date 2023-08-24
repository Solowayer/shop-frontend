interface List {
	id: number
	name: string
	userId: number
}

interface CreateList {
	name: string
}

interface UpdateList extends Partial<CreateList> {}
