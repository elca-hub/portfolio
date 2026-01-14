'use server'

import fetchReadme from '@/action/works/fetchReadme'
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
		readme = 'Error: Failed to fetch README.md'
	}

	if (isModal) {
		return <WorkProjectModalPresentation projectName={projectName} readme={readme} />
	}

	return <WorkProjectPresentation projectName={projectName} readme={readme} />
}
