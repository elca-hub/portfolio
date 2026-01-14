'use server'

export default async function fetchReadme(projectName: string): Promise<string> {
	const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://portfolio.elca-web.com'
	const res = await fetch(`${domain}/works/${projectName}/README.md`)
	if (!res.ok) {
		throw new Error(`README.md が見つかりませんでした (status: ${res.status})`)
	}
	return await res.text()
}
