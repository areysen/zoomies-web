import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'

interface HeroSectionProps {
  heading?: string
  subheading?: string
  image?: { asset: { _ref: string } }
  backgroundImage?: { asset: { _ref: string } }
  textPosition?: 'top-left' | 'center' | 'bottom-right'
  ctaText?: string
  ctaLink?: string
}

export default function HeroSection({ heading, subheading, image, backgroundImage, textPosition, ctaText, ctaLink }: HeroSectionProps) {
  const alignmentMap = {
    'top-left': 'items-start justify-start',
    'center': 'items-center justify-center',
    'bottom-right': 'items-end justify-end',
  }
  const alignment = alignmentMap[textPosition || 'center']

  return (
    <section className="relative w-full">
      {/* Render background image if present */}
      {backgroundImage?.asset?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.asset.url}
            alt={heading || 'Background Image'}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="relative z-10">
        {image?.asset?._ref && (
          <div className="relative h-96 w-full">
            <Image
              src={urlForImage(image).url()}
              alt={heading || 'Hero Image'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              {heading && (
                <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4 z-10">
                  {heading}
                </h1>
              )}
            </div>
          </div>
        )}
        {!image?.asset?._ref && heading && (
          <div className={`relative h-[300px] flex ${alignment}`}>
            <div className="bg-gray-900 bg-opacity-80 px-6 py-10 text-center text-white rounded max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold">{heading}</h1>
              {subheading && (
                <p className="mt-2 text-white text-md">{subheading}</p>
              )}
              {ctaText && ctaLink && (
                <div className="mt-6">
                  <a
                    href={ctaLink}
                    className="inline-block bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
                  >
                    {ctaText}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
