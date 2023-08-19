import EditProductForm from '@/components/forms/product/edit-product-form'

export default function SellerEditProduct({ params }: { params: { id: number } }) {
	return (
		<div className="w-full">
			<EditProductForm productId={params.id} />
		</div>
	)
}
