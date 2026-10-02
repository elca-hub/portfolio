'use client'

const domain = 'https://portfolio.elca-web.com'

interface HeadContentProps {
	title: string
	des: string
	image?: string
}

const toAbsoluteUrl = (url: string) => (url.startsWith('/') ? `${domain}${url}` : url)

const HeadContent = ({ title, des, image }: HeadContentProps) => {
	return (
		<>
			<title>{`${title} | elcaのポートフォリオサイト`}</title>
			<meta name="description" content={des} />
			<link rel="icon" href="/favicon.ico" sizes="any" />
			{image && (
				<>
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:image" content={toAbsoluteUrl(image)} />
					<meta property="og:image" content={toAbsoluteUrl(image)} />
				</>
			)}
		</>
	)
}

export default HeadContent
