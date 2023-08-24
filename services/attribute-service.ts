import instance from './api'

const ATTRIBUTES = '/attributes'

class AttributeServ {
	async findAttributeByCategoryId(categoryId: number): Promise<Attribute[]> {
		try {
			const res = await instance.get(`${ATTRIBUTES}/category/${categoryId}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async createAttributeValue() {
		try {
			const res = await instance.get(`${ATTRIBUTES}/create-value`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const AttributeService = new AttributeServ()
export default AttributeService
