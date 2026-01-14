import { BudouXText } from '@/components/ui/text/bundouxText'
import TextWithIcon from '@/components/ui/text/textWithIcon'
import Image from 'next/image'
import { IconType } from 'react-icons'
import { FaBirthdayCake, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiQiita } from 'react-icons/si'

function AboutSectionItem({ title, value }: { title: string; value: string }) {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<h2 className="text-2xl font-bold">{title}</h2>
			<div className="text-md text-center text-gray-100">
				<BudouXText text={value} />
			</div>
		</div>
	)
}

function ContactItem({ href, icon }: { href: string; icon: IconType }) {
	const Icon = icon
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className="text-white transition-colors duration-300 hover:text-gray-300">
			<Icon className="size-8" />
		</a>
	)
}

export default function AboutMeContent() {
	return (
		<article className="flex flex-col items-center justify-center gap-8">
			<section className="flex flex-col items-center justify-center gap-10 sm:flex-row">
				<div className="size-50 overflow-hidden rounded-full">
					<Image src="/icon.png" alt="About Me" width={600} height={600} className="h-full w-full object-cover" />
				</div>
				<div className="flex flex-col items-start justify-center gap-2">
					<h1 className="text-5xl font-bold">elca</h1>
					<div className="text-md text-gray-100">Web Engineer</div>
					<div className="text-md text-gray-100">
						<TextWithIcon icon={<FaBirthdayCake />}>2004/11/16</TextWithIcon>
					</div>
				</div>
			</section>

			<section>
				<h2 className="mb-4 text-center text-2xl font-bold">Contact</h2>
				<div className="flex flex-row items-center justify-center gap-7">
					<ContactItem href="https://github.com/elca-hub" icon={FaGithub} />
					<ContactItem href="https://x.com/elca_e1" icon={FaXTwitter} />
					<ContactItem href="https://qiita.com/elca" icon={SiQiita} />
				</div>
			</section>

			<section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<AboutSectionItem title="Place" value="石川県" />
				<AboutSectionItem title="College" value="金沢工業大学" />
				<AboutSectionItem title="Skills" value="Go, TypeScript, Next.js, Docker, GitHub, AWS(CDK) etc." />
				<AboutSectionItem title="Qualification" value="ITパスポート試験, 基本情報技術者試験, 応用情報技術者試験" />
			</section>

			<section>
				<h2 className="mb-4 text-center text-2xl font-bold">Comment</h2>
				<p className="text-md text-center text-gray-100">
					<BudouXText
						text={`
              みなさんこんにちは、elcaです。
              普段は大学生をやっています。
              私は本来バックエンドを専門としているため、正直フロントエンドに力を入れる必要はないのですが、せっかくなのでCursorの力も借りつつ頑張ってみました。
              普段macを利用している人は操作しやすいサイトになっていると思います。
              このサイトの操作方法は「ヘルプ」(下のDockの右から二番目)で見れるので、わからない人はそちらを参考にしてください。
            `}
					/>
				</p>
			</section>
			<section>
				<h2 className="mb-4 text-center text-2xl font-bold">My Favorites</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<AboutSectionItem
						title="ドライブ"
						value="運転してる時はそのことにしか集中しないので、嫌なことや行き詰まったことも一旦忘れて冷静に考えられるので好きです！"
					/>
					<AboutSectionItem
						title="イラスト"
						value="高校2年生の頃からチマチマ描いています。自分のアイコンを自分で描けば著作権とか気にせずアイコンにできるんじゃね！？という天才的な発想から始まりました。"
					/>
					<AboutSectionItem title="アニメ" value="中学2年から没頭しました。けいおん！やホリミヤ、涼宮ハルヒの憂鬱などが推しアニメです。" />
					<AboutSectionItem
						title="ゲーム"
						value="あまりゲーム自体はしませんが、小島秀夫監督作品やNieRシリーズといった、ストーリーが奥深いゲームはよくプレイしてます。"
					/>
				</div>
			</section>
		</article>
	)
}
