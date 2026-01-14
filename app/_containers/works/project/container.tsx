'use server'

import fetchReadme from '@/action/works/fetchReadme'
import WorkProjectPresentation from './preesntation'

export default async function WorkProjectContainer({ projectName }: { projectName: string }): Promise<React.ReactNode> {
	let readme: string | null = null
	try {
		readme = await fetchReadme(projectName)
	} catch (error) {
		console.error(error)
		readme = 'Error: Failed to fetch README.md'
	}

	return <WorkProjectPresentation projectName={projectName} readme={readme} />
}
