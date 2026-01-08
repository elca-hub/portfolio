import { BudouXText } from '@/components/ui/text/bundouxText'
import TextWithIcon from '@/components/ui/text/textWithIcon'
import Image from 'next/image'
import { IconType } from 'react-icons'
import { FaBirthdayCake, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiQiita } from 'react-icons/si'

function AboutSectionItem({ title, value }: { title: string, value: string }) {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <div className='text-md text-gray-100 text-center'>
        <BudouXText text={value} />
      </div>
    </div>
  )
}

function ContactItem({ href, icon }: { href: string, icon: IconType }) {
  const Icon = icon
  return (
    <a href={href} target='_blank' rel='noopener noreferrer' className='text-white hover:text-gray-400 transition-colors duration-300'>
      <Icon className='size-8' />
    </a>
  )
}

export default function AboutMeContent() {
  return (
    <article className='flex flex-col items-center justify-center gap-8'>
      <section className='flex flex-row items-center justify-center gap-10'>
        <div className='size-50 rounded-full overflow-hidden'>
          <Image src='/icon.png' alt='About Me' width={600} height={600} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col items-start justify-center gap-2'>
          <h1 className='text-3xl font-bold'>elca</h1>
          <div className='text-md text-gray-400'>Web Engineer</div>
          <div className='text-md text-gray-400'>
            <TextWithIcon icon={<FaBirthdayCake />} children='2004/11/16' />
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4 text-center'>Contact</h2>
        <div className='flex flex-row items-center justify-center gap-7'>
          <ContactItem href='https://github.com/elca-hub' icon={FaGithub} />
          <ContactItem href='https://x.com/elca_e1' icon={FaXTwitter} />
          <ContactItem href='https://qiita.com/elca' icon={SiQiita} />
        </div>
      </section>

      <section className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <AboutSectionItem title='Place' value='石川県' />
        <AboutSectionItem title='College' value='金沢工業大学' />
        <AboutSectionItem title='Skills' value='Go, TypeScript, Next.js, Docker, GitHub, AWS(CDK) etc.' />
        <AboutSectionItem title='Qualification' value='ITパスポート試験, 基本情報技術者試験, 応用情報技術者試験' />
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4 text-center'>Comment</h2>
        <p className='text-md text-gray-100 text-center'>
          <BudouXText text={
            `
              みなさんこんにちは、elcaです。
              普段は大学生をやっています。
              私は本来バックエンドを専門としているため、正直フロントエンドに力を入れる必要はないのですが、せっかくなのでCursorの力も借りつつ頑張ってみました。
              普段macを利用している人は操作しやすいサイトになっていると思います。
              このサイトの操作方法は「ヘルプ」(下のDockの右から二番目)で見れるので、わからない人はそちらを参考にしてください。
            `
          } />
        </p>
      </section>
    </article>
  )
}
