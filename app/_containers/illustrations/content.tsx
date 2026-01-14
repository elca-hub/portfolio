import ModalWindow from '@/components/ui/window/ModalWindow'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from 'react-aria-components'
import { MdZoomOutMap } from 'react-icons/md'

function IllustrationItem({ file, title, description }: { file: string; title: string; description: string }) {
	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}
	return (
		<section className="flex flex-col items-center justify-center gap-2">
			<div className="relative h-[30vh] w-full overflow-hidden rounded-lg">
				<Image src={`/illustrations/${file}.webp`} alt={title} width={500} height={500} className="h-full w-full object-cover" />
				<Button
					className="absolute right-2 bottom-2 flex cursor-pointer items-center justify-center rounded-full bg-black/50 p-4 backdrop-blur-xl transition-all duration-300 hover:scale-95 hover:bg-black/70"
					onPress={handleOpen}
				>
					<MdZoomOutMap className="size-8 text-white" />
				</Button>
				<ModalWindow title={title} isOpen={isOpen} onClose={handleClose}>
					<div className="flex items-center justify-center">
						<Image src={`/illustrations/${file}.webp`} alt={title} width={500} height={500} className="h-full w-full rounded-lg object-cover" />
					</div>
				</ModalWindow>
			</div>
			<h2 className="text-2xl font-bold">{title}</h2>
			<p className="text-md text-center text-gray-100">{description}</p>
		</section>
	)
}

export default function IllustrationsContent() {
	const illustrations = [
		{
			file: '1',
			title: '話を楽しく聞いてくれるお姉さん',
			description: 'ファミレスでご近所さんのお姉さんと仲良く会話するシーン。個人的に手がうまく描けました。',
		},
		{
			file: '2',
			title: '原神より「煙緋」',
			description: '原神より、煙緋を参考に描きました。個人的に一番好きなキャラクターなので、割と丁寧に描いた方です。',
		},
		{
			file: '3',
			title: 'ほえー',
			description: '現アイコンです。手の指と指の間のラインを、本来の線の色とは異なり、やや肌色に近い色に変えてあるのがちょっと工夫した点。',
		},
		{
			file: '4',
			title: 'ベー',
			description: 'なんとなく横顔描いてたらいい感じに描けました。横の状態からベロを出すのがとても難しい...まだまだ研究しないとですね。',
		},
	]

	return (
		<article>
			<section className="grid grid-cols-1 items-start gap-4 sm:grid-cols-3">
				{illustrations.map((illustration) => (
					<IllustrationItem key={illustration.title} {...illustration} />
				))}
			</section>
			<section>
				<h2 className="mb-4 text-center text-2xl font-bold">使用ツール</h2>
				<p className="text-md text-center text-gray-100">Clip Studio</p>
				<p className="text-md text-center text-gray-100">iPad Pro 13インチ</p>
			</section>
		</article>
	)
}
