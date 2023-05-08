import Image from 'next/image'

interface ImageProps {
	src: string
	alt: string
	height?: string
	width?: string
}

export default function Artwork({ src, alt, height, width }: ImageProps) {
	return (
		<div className={`relative h-[${height}] w-[${width}]`}>
			<Image src={src} alt={alt} fill />
		</div>
	)
}
