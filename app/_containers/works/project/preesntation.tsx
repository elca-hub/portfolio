import Window from '@/components/ui/window/Window'
import ReactMarkdown from 'react-markdown'

interface WorkProjectPresentationProps {
	projectName: string
	readme: string
}

/**
 * @package
 */
export default function WorkProjectPresentation({ projectName, readme }: WorkProjectPresentationProps) {
	const title = `Works - ${projectName.toUpperCase()}`

	const body = (
		<div className="prose prose-invert max-w-none">
			<ReactMarkdown>{readme}</ReactMarkdown>
		</div>
	)

	return (
		<div className="p-4">
			<Window title={title} isMaximized>
				{body}
			</Window>
		</div>
	)
}
