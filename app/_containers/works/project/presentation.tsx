import Window from '@/components/ui/window/Window'

interface WorkProjectPresentationProps {
	projectName: string
	readme: React.ReactNode
}

/**
 * @package
 */
export default function WorkProjectPresentation({ projectName, readme }: WorkProjectPresentationProps) {
	return (
		<Window title={projectName} isMaximized>
			{readme}
		</Window>
	)
}
