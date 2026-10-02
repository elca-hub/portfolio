import { MicroCMSEyecatch } from '@/action/model/micro-cms/eyecatch'
import Image from 'next/image'

export default function BlogItemThumbnail({ eyecatch, alt }: { eyecatch: MicroCMSEyecatch | undefined; alt: string }) {
	return (
		<div className="relative mb-10 h-[30vh] w-full overflow-hidden rounded-lg">
			<Image src={eyecatch?.url ?? '/blogs/default-header.webp'} alt={alt} width={500} height={500} className="h-full w-full object-cover" />
		</div>
	)
}
