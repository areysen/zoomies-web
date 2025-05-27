import { PortableText } from '@portabletext/react'

type Props = {
  heading?: string
  subheading?: string
  text?: any
  alignment?: 'left' | 'center' | 'right'
}

export default function TextSection({ heading, subheading, text, alignment = 'left' }: Props) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      {heading && (
        <h2 className={`text-3xl font-bold mb-6 text-${alignment}`}>
          {heading}
        </h2>
      )}
      {subheading && (
        <p className={`text-lg text-gray-600 mb-8 text-${alignment}`}>
          {subheading}
        </p>
      )}
      {text && (
        <div className={`prose prose-lg mx-auto text-${alignment}`}>
          <PortableText value={text} />
        </div>
      )}
    </section>
  )
}