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
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja">
			<body className={`${notoSansJP.variable} antialiased`}>
				<InteractiveBackground breathsPerMinute={5}>
					<Suspense>{children}</Suspense>
				</InteractiveBackground>
			</body>
		</html>
	)
}
