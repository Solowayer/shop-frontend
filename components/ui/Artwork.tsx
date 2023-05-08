import Image from 'next/image'

interface ImageProps {
	src: string
	alt: string
	height?: string
	width?: string
	shape: 'round' | 'rectangle'
}

export default function Artwork({ src, alt, height, width, shape = 'rectangle' }: ImageProps) {
	return (
		<div className={`relative h-[${height}] w-[${width}] ${shape}`}>
			<Image src={src} alt={alt} fill />
		</div>
	)
}
