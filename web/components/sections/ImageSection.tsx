import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'

interface ImageSectionProps {
  heading?: string
  image?: {
    asset: { _ref: string }
    alt?: string
  }
  alignment?: 'left' | 'right'
}

export default function ImageSection({ heading, image, alignment = 'left' }: ImageSectionProps) {
  if (!image?.asset?._ref) return null

  return (
    <section className="py-12 px-4">
      <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center ${alignment === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2">
          <Image
            src={urlForImage(image).width(800).url()}
            alt={image.alt || 'Image'}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        {heading && (
          <div className="md:w-1/2 md:px-10 mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">{heading}</h2>
          </div>
        )}
      </div>
    </section>
  )
}
