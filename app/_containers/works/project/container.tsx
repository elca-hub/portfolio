'use server'

import fetchReadme from '@/action/works/fetchReadme'
import ReactMarkdown from 'react-markdown'
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

	const readmeConverted = <ReactMarkdown>{readme}</ReactMarkdown>

	return isModal ? (
		<WorkProjectModalPresentation projectName={projectName} readme={readmeConverted} />
	) : (
		<WorkProjectPresentation projectName={projectName} readme={readmeConverted} />
	)
}
