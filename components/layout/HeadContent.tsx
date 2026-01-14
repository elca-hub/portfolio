'use client'

interface HeadContentProps {
	title: string
	des: string
}

const HeadContent = ({ title, des }: HeadContentProps) => {
	return (
		<>
			<title>{`${title} | elcaのポートフォリオサイト`}</title>
			<meta name="description" content={des} />
			<link rel="icon" href="/favicon.ico" sizes="any" />
		</>
	)
}

export default HeadContent
