import { PortableText } from '@portabletext/react'

const components = {
  marks: {
    link: ({ value, children }: any) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="underline hover:text-primary transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-medium mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-medium mb-2">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic my-4">{children}</blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
}

export default function RichText({ content }: { content: any }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="prose max-w-none">
        <PortableText value={content} components={components} />
      </div>
    </div>
  )
}