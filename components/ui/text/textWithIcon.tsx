type TextWithIconProps = {
	icon: React.ReactNode
	children: React.ReactNode
	size?: string
	className?: string
}

export default function TextWithIcon({ icon, children, size, className }: TextWithIconProps) {
	return (
		<span className={`flex items-center gap-2 ${className}`}>
			<span className={size}>{icon}</span>
			{children}
		</span>
	)
}
