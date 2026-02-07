import { MicroCMSBlog } from '@/action/model/micro-cms/blog'
import Window from '@/components/ui/window/Window'
import BlogItemThumbnail from './components/ui/thumbnail'

interface BlogItemPresentationProps {
	blog: MicroCMSBlog
	content: React.ReactNode
}

/**
 * @package
 */
export default function BlogItemPresentation({ blog, content }: BlogItemPresentationProps) {
	return (
		<Window title={blog.title} isMaximized>
			<BlogItemThumbnail eyecatch={blog.eyecatch} alt={blog.title} />
			{content}
		</Window>
	)
}
