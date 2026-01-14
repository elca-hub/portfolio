export type AppIconType = React.ReactElement<{ className?: string }>

export type AppType = {
	title: string
	content: React.ReactNode
	redirectUrl: string
	icon: AppIconType
}
