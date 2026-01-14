'use server'

import fetchReadme from '@/action/works/fetchReadme'
import CustomMarkdown from '@/components/layout/markdown/CustomMarkdown'
import WorkProjectModalPresentation from './modalPresentation'
import WorkProjectPresentation from './presentation'

export default async function WorkProjectContainer({
	projectName,
	isModal = false,
}: {
	projectName: string
	isModal?: boolean
}): Promise<React.ReactNode> {
	let readme: string | null = null
	try {
		readme = await fetchReadme(projectName)
	} catch (error) {
		console.error(error)
		readme = `# エラーが発生しました\n\n再度アクセスしてください。`
	}

	const readmeConverted = <CustomMarkdown>{readme}</CustomMarkdown>

	return isModal ? (
		<WorkProjectModalPresentation projectName={projectName} readme={<div className="text-white">{readmeConverted}</div>} />
	) : (
		<WorkProjectPresentation projectName={projectName} readme={readmeConverted} />
	)
}
