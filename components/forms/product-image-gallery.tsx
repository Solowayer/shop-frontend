import React, { ChangeEvent } from 'react'
import Image from 'next/image'
import UploadService from '@/services/upload-service'
import { useMutation } from '@tanstack/react-query'
import { Delete } from '../icons'

type Props = {
  productImages: string[],
  setProductImages: (productImages: string[]) => void
}

export default function ProductImageGallery({ productImages, setProductImages }: Props) {

  const imagesMutation = useMutation({
    mutationFn: UploadService.uploadImages,
    onSuccess: data => {
      if (productImages) {
        const updatedImages = [...productImages, ...data]
        setProductImages(updatedImages)
      }
    },
    onError: () => {
      throw new Error('Something went wrong')
    }
  })

  const imageDeleteMutation = useMutation({
    mutationFn: (imageUrl: string) => UploadService.deleteImage(imageUrl)
  })

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      const images = Array.from(files)
      const trimmedImages = images.length > 10 ? images.slice(0, 10) : images
      try {
        const uploadData: UploadImageData = {
          key: 'image',
          images: trimmedImages
        }
        await imagesMutation.mutateAsync(uploadData)
      } catch (error) {
        console.log(error)
      }

      event.target.value = ''
    }
  }

  const handleImageDelete = async (imageUrl: string) => {
    console.log('Image to delete:', imageUrl)
    const filteredImages = productImages.filter(image => image !== imageUrl)
    setProductImages(filteredImages)
    await imageDeleteMutation.mutateAsync(imageUrl)
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full flex items-center justify-between gap-2">
          <span className='text-xl font-medium'>Фото</span>
          <span>{productImages ? productImages.length : 0}/10</span>
        </div>
        {productImages && productImages.length >= 10 ? null : (
          <>
            <div className="relative border-2 border-dashed border-blue-200 flex w-full items-center justify-center h-[180px] rounded hover:bg-blue-50">
              <label htmlFor="images">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-medium text-blue-500">Додати фото товару</span>
                  <span className="text-xs text-center text-blue-500">
                    Формати: JPG, PNG, GIF, WEBP.
                    <br /> Максимальний розмір: 2 MB.
                  </span>
                </div>
                <input
                  type="file"
                  id="images"
                  onChange={handleImageChange}
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto"
                />
              </label>
            </div>
          </>
        )}

        {imagesMutation.isError && <span className="text-red-500">Помилка</span>}

        <div className="flex flex-col gap-4">
          <div className="flex overflow-hidden overflow-x-auto gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className="relative flex justify-between rounded border items-start p-2 min-w-[160px] h-[160px]"
              >
                <Image src={image} alt={`Image ${index + 1}`} fill className="object-cover p-2 select-none" />
                <div
                  className="absolute right-2 inline-flex rounded-full p-2 bg-black text-white cursor-pointer"
                  onClick={() => handleImageDelete(image)}
                >
                  <Delete />
                </div>
              </div>
            ))}
          </div>
        </div>
      
      </div>
    </>

  )
}
