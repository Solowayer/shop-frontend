import instance from './api'

const UPLOAD = '/upload'

class Upload {
	async uploadImages(data: UploadImageData): Promise<string[]> {
		try {
			const formData = new FormData()
			for (let i = 0; i < data.images.length; i++) {
				formData.append(data.key, data.images[i])
			}

			const res = await instance.post<{ imageUrls: string[] }>(`${UPLOAD}/image`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})

			const { imageUrls } = res.data
			return imageUrls
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async deleteImage(imageUrl: string) {
		const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
		try {
			const res = await instance.delete(`${UPLOAD}/image/${imageName}`)
			return res.data
		} catch (error: any) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

const UploadService = new Upload()
export default UploadService
