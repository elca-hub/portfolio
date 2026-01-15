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
			<body className={`${notoSansJP.variable} antialiased`}>
				<InteractiveBackground breathsPerMinute={5}>
					<Suspense>
						{children}
						{modal}
					</Suspense>
				</InteractiveBackground>
				{/* ios27のステータスバー透過防止 */}
				<div className="pointer-events-none fixed top-0 h-[5px] w-full bg-black mix-blend-lighten"></div>
				{/* ios27のタブバー透過防止 */}
				<div className="pointer-events-none fixed bottom-0 h-[4px] w-full bg-black mix-blend-lighten"></div>
			</body>
		</html>
	)
}
