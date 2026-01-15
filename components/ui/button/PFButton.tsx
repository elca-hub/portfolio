import { Button, ButtonProps } from 'react-aria-components'

interface PFButtonProps extends ButtonProps {
	children: React.ReactNode
	href?: string
}

export default function PFButton({ children, href, ...restProps }: PFButtonProps) {
	const buttonStyle = `
    rounded-lg
    border border-gray-100
    p-2
    text-center
    text-gray-100
    text-md
    transition-all
    duration-300
    hover:scale-95
    hover:bg-gray-100/10
    cursor-pointer
    ${restProps.className}
  `
	if (href) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className={buttonStyle}>
				{children}
			</a>
		)
	}
	return (
		<Button {...restProps} className={buttonStyle}>
			{children}
		</Button>
	)
}
