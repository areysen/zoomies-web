// components/sections/InfoGroup.tsx
import { PortableText } from '@portabletext/react'
export default function InfoGroup({ items }: { items: any[] }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {items?.map((item, i) => (
        <div key={i} className="grid grid-cols-[auto_1px_1fr] gap-4 items-start">
          <div className="text-xl font-light">{item.number}</div>
          <div className="w-px bg-gray-400 h-full" />
          <div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <div className="text-base text-gray-500 leading-relaxed">
              <PortableText value={item.body} />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}