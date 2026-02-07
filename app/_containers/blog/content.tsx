'use client'

import { fetchBlogs } from '@/action/blog/featch'
import { MicroCMSBlog } from '@/action/model/micro-cms/blog'
import PFButton from '@/components/ui/button/PFButton'
import TextWithIcon from '@/components/ui/text/textWithIcon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'

type BlogContentProps = {
	blogs: MicroCMSBlog[]
	totalCount: number
}

function BlogItem({ blog }: { blog: MicroCMSBlog }) {
	const router = useRouter()
	return (
		<section className="flex flex-col items-center justify-center gap-2">
			<Image src={blog.eyecatch.url} alt={blog.title} width={500} height={500} className="h-full w-full rounded-lg object-cover" />
			<h2 className="max-w-full overflow-x-hidden pb-2 text-2xl font-bold overflow-ellipsis whitespace-nowrap">{blog.title}</h2>
			<PFButton type="button" onPress={() => router.push(`/blog/${blog.id}`)} className="flex w-full items-center justify-center font-bold">
				<TextWithIcon icon={<FaEye />} className="w-fit">
					記事を見る
				</TextWithIcon>
			</PFButton>
		</section>
	)
}

export default function BlogContent({ blogs, totalCount }: BlogContentProps) {
	const [displayedBlogs, setDisplayedBlogs] = useState<MicroCMSBlog[]>(blogs)

	useEffect(() => {
		setDisplayedBlogs(blogs)
	}, [blogs])

	const handleLoadMore = () => {
		const fetchBlogFlow = async () => {
			const newBlogs = await fetchBlogs(10, displayedBlogs.length)
			if (newBlogs.blogs.length > 0) {
				setDisplayedBlogs([...displayedBlogs, ...newBlogs.blogs])
			}
		}
		fetchBlogFlow()
	}

	return (
		<>
			<article className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{displayedBlogs.map((blog) => (
					<BlogItem key={blog.id} blog={blog} />
				))}
			</article>
			{totalCount > displayedBlogs.length && (
				<PFButton type="button" onPress={handleLoadMore}>
					もっと見る
				</PFButton>
			)}
		</>
	)
}
