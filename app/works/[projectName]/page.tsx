import WorkProjectContainer from '@/app/_containers/works/project/container'
import HeadContent from '@/components/layout/HeadContent'
import { works } from '@/const/works'
import { notFound } from 'next/navigation'

export default async function WorkProjectPage(props: { params: { projectName: string } }) {
	const { projectName } = await props.params

	const tar = works.find((w) => w.projectName === projectName)
	if (!tar) {
		notFound()
	}
	return (
		<>
			<HeadContent title={`${tar.title} | Works`} des={tar.description} />
			<WorkProjectContainer projectName={projectName} />
		</>
	)
}
