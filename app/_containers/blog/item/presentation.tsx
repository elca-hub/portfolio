import Window from '@/components/ui/window/Window'

interface BlogItemPresentationProps {
	title: string
	eyecatch: {
		url: string
	}
	content: React.ReactNode
}

/**
 * @package
 */
export default function BlogItemPresentation({ title, eyecatch, content }: BlogItemPresentationProps) {
	return (
		<Window title={title} isMaximized>
			{content}
		</Window>
	)
}
