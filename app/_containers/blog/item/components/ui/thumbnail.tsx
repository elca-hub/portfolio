import { MicroCMSEyecatch } from '@/action/model/micro-cms/eyecatch'
import Image from 'next/image'

export default function BlogItemThumbnail({ eyecatch, alt }: { eyecatch: MicroCMSEyecatch; alt: string }) {
	return (
		<div className="relative mb-10 h-[30vh] w-full overflow-hidden rounded-lg">
			<Image src={eyecatch.url} alt={alt} width={500} height={500} className="h-full w-full object-cover" />
		</div>
	)
}
