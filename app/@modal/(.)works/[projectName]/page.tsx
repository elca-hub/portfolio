import WorkProjectContainer from '@/app/_containers/works/project/container'

export default async function WorkProjectPage(props: { params: { projectName: string } }) {
	const { projectName } = await props.params

	return <WorkProjectContainer projectName={projectName} isModal={true} />
}
