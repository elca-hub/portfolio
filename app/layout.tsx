import { InteractiveBackground } from '@/components/ui/background/InteractiveBackground'
import { Noto_Sans_JP } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<html lang="ja">
			<body className={`${notoSansJP.variable} bg-gray-300 antialiased dark:bg-slate-950`}>
				<InteractiveBackground breathsPerMinute={5}>
					<Suspense>
						{children}
						{modal}
					</Suspense>
				</InteractiveBackground>
			</body>
		</html>
	)
}
