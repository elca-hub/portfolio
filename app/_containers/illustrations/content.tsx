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
      <Image src={`/illustrations/${file}`} alt={title} width={500} height={500} className='w-full h-[30vh] object-cover' />
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
      description: 'ファミレスでご近所さんのお姉さんと仲良く会話するシーン。個人的に手がうまく描けました。',
    },
    {
      file: '2.jpeg',
      title: 'ベー',
      description: '証明写真という、本来は正しく正面から撮るべき場面で抗心を露わにした少女を描きました。',
    },
    {
      file: '3.png',
      title: 'ほえー',
      description: '現アイコンです。手の指と指の間のラインを、本来の線の色とは異なり、やや肌色に近い色に変えてあるのがちょっと工夫した点。',
    },
    {
      file: '4.jpg',
      title: 'はっ、よっ、ほっ！',
      description: '原神より、煙緋を参考に描きました。個人的に一番好きなキャラクターなので、割と丁寧に描いた方です。'
    }
  ]

  return (
    <article>
      <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-start'>
        {illustrations.map((illustration) => (
          <IllustrationItem key={illustration.title} {...illustration} />
        ))}
      </section>
      <section>
        <h2 className='text-2xl font-bold mb-4 text-center'>使用ツール</h2>
        <p className='text-md text-gray-100 text-center'>Clip Studio</p>
        <p className='text-md text-gray-100 text-center'>iPad Pro 13インチ</p>
      </section>
    </article>
  )
}
