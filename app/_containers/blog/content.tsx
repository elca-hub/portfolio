'use client'

import { MicroCMSBlog } from '@/types/micro-cms/blog'
import Image from 'next/image'

type BlogContentProps = {
	blogs: MicroCMSBlog[]
}

function BlogItem({ blog }: { blog: MicroCMSBlog }) {
	return (
		<section className="flex flex-col items-center justify-center gap-2">
			<Image src={blog.eyecatch.url} alt={blog.title} width={500} height={500} className="h-full w-full object-cover" />
			<h2 className="text-2xl font-bold">{blog.title}</h2>
		</section>
	)
}

export default function BlogContent({ blogs }: BlogContentProps) {
	return (
		<article>
			{blogs.map((blog) => (
				<BlogItem key={blog.id} blog={blog} />
			))}
		</article>
	)
}
