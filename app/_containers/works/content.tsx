'use client'

import TextWithIcon from '@/components/ui/text/textWithIcon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'

function WorkItem({
	title,
	description,
	projectName,
	githubUrl,
	onOpenDetail,
}: {
	title: string
	description: string
	projectName: string
	githubUrl?: string
	onOpenDetail: (projectName: string) => void
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-2">
			<h3 className="text-2xl font-bold">{title}</h3>
			<div className="relative h-[30vh] w-full overflow-hidden rounded-lg">
				<Image src={`/works/${projectName}/title.webp`} alt={title} width={500} height={500} className="h-full w-full object-cover" />
			</div>
			<p className="text-md text-center text-gray-100">{description}</p>
			<div className="flex w-full items-center justify-center gap-4">
				<button
					type="button"
					className="text-md rounded-lg border border-gray-100 p-2 text-center text-gray-100 transition-colors duration-300 hover:bg-gray-100/10"
					onClick={() => onOpenDetail(projectName)}
				>
					詳細を見る
				</button>
				{githubUrl && (
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-md rounded-lg border border-gray-100 p-2 text-center text-gray-100 transition-colors duration-300 hover:bg-gray-100/10"
					>
						<TextWithIcon icon={<FaGithub />}>GitHub</TextWithIcon>
					</a>
				)}
			</div>
		</section>
	)
}

export default function WorksContent() {
	const router = useRouter()

	const works = [
		{
			title: 'TREE',
			description: '学内の蔵書管理システム',
			projectName: 'tree',
		},
		{
			title: 'あーぷっと',
			description: '大学コミュニティ内のアウトプットツール',
			projectName: 'arput',
			githubUrl: 'https://github.com/elca-hub/smapro-hackathon',
		},
	]

	const handleOpenDetail = (projectName: string) => {
		router.push(`/works/${projectName}`)
	}

	return (
		<article className="grid grid-cols-1 items-start gap-4 sm:grid-cols-3">
			{works.map((work) => (
				<WorkItem key={work.title} {...work} onOpenDetail={handleOpenDetail} />
			))}
		</article>
	)
}
