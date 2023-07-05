import axios from 'axios'

// USER


// SELLER
export const registerSeller = async (data: SellerRegister) => {
	try {
		await axios.post(`${process.env.api}/seller/register`, data, { withCredentials: true })
	} catch (error: any) {
		throw new Error(error?.response?.data?.message)
	}
}

// CART
export const addtoCart = async (data: AddToCart) => {
	try {
		await axios.post(`${process.env.api}/cart/add`, data, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

export const deleteCart = async () => {
	try {
		await axios.delete(`${process.env.api}/cart/delete`, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

export const deleteCartItem = async (id: number) => {
	try {
		await axios.delete(`${process.env.api}/cart/${id}`, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

// PRODUCT
export const createProduct = async (data: CreateProduct) => {
	try {
		await axios.post(`${process.env.api}/products/create`, data, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

export const editProduct = async (id: number, data: EditProduct) => {
	try {
		await axios.patch(`${process.env.api}/products/p/${id}`, data, {
			withCredentials: true
		})
	} catch (error) {
		console.log(error)
	}
}

export const deleteProduct = async (id: number) => {
	try {
		await axios.delete(`${process.env.api}/products/p/${id}`, {
			withCredentials: true
		})
	} catch (error) {
		throw new Error('Delete error')
	}
}

// FILES
export const uploadImages = async (data: UploadImageData): Promise<string[]> => {
	try {
		const formData = new FormData()
		for (let i = 0; i < data.images.length; i++) {
			formData.append(data.key, data.images[i])
		}

		const response = await axios.post<{ imageUrls: string[] }>(`${process.env.api}/upload/image`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
			withCredentials: true
		})

		const { imageUrls } = response.data
		return imageUrls
	} catch (error) {
		console.log(error)
		throw new Error('Failed to upload images')
	}
}

export const deleteImage = async (imageUrl: string) => {
	const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
	try {
		const response = await axios.delete(`${process.env.api}/upload/image/${imageName}`, {
			withCredentials: true
		})
		console.log(response.data)
	} catch (error) {
		throw new Error('Failed to delete images')
	}
}
