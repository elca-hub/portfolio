import Image from 'next/image'

function IllustrationItem({
  file,
  title,
  description,
}: {
  file: string
  title: string
  description: string
}) {
  return (
    <section className='flex flex-col items-center justify-center gap-2'>
      <Image src={`/illustrations/${file}`} alt={title} width={500} height={500} className='w-full h-[600px] object-cover' />
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='text-md text-gray-100 text-center'>{description}</p>
    </section>
  )
}

export default function IllustrationsContent() {
  const illustrations = [
    {
      file: '1.jpg',
      title: '話を楽しく聞いてくれるお姉さん',
      description: 'ファミレスでご近所さんのお姉さんと仲良く会話するシーン。個人的に手がうまく描けました',
    },
    {
      file: '2.jpeg',
      title: 'ベー',
      description: '証明写真という、本来は正しく正面から撮るべき場面を、反抗心を露わにした少女を描きました。',
    },
    {
      file: '3.png',
      title: 'ほえー',
      description: '現アイコンです。',
    }
  ]

  return (
    <article className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-start'>
      {illustrations.map((illustration) => (
        <IllustrationItem key={illustration.title} {...illustration} />
      ))}
    </article>
  )
}
