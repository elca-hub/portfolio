'use client'

import PFButton from '@/components/ui/button/PFButton'
import TextWithIcon from '@/components/ui/text/textWithIcon'
import { MicroCMSBlog } from '@/types/micro-cms/blog'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaEye } from 'react-icons/fa'

type BlogContentProps = {
	blogs: MicroCMSBlog[]
}

function BlogItem({ blog }: { blog: MicroCMSBlog }) {
	const router = useRouter()
	return (
		<section className="flex flex-col items-center justify-center gap-2">
			<Image src={blog.eyecatch.url} alt={blog.title} width={500} height={500} className="h-full w-full rounded-lg object-cover" />
			<h2 className="text-2xl font-bold">{blog.title}</h2>
			<PFButton type="button" onPress={() => router.push(`/blog/${blog.id}`)} className="flex w-full items-center justify-center font-bold">
				<TextWithIcon icon={<FaEye />} className="w-fit">
					記事を見る
				</TextWithIcon>
			</PFButton>
		</section>
	)
}

export default function BlogContent({ blogs }: BlogContentProps) {
	return (
		<article className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{blogs.map((blog) => (
				<BlogItem key={blog.id} blog={blog} />
			))}
		</article>
	)
}
