'use server'

export default async function fetchReadme(projectName: string): Promise<string> {
	const res = await fetch(`/works/${projectName}/README.md`)
	if (!res.ok) {
		throw new Error(`README.md が見つかりませんでした (status: ${res.status})`)
	}
	return await res.text()
}
