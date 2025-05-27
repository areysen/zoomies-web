// web/components/Layout.tsx
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { sanity } from '@/lib/sanity'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'
import { PortableText, PortableTextComponents } from '@portabletext/react'
const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href || '#'}
        className="underline text-white hover:opacity-80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    block: (props) => {
      const children = Array.isArray((props as any).children) ? (props as any).children : []

      return (
        <p>
          {children.map((child: any, i: number) =>
            typeof child === 'string'
              ? child.replace('[year]', `${new Date().getFullYear()}`)
              : React.isValidElement(child)
              ? child
              : null
          )}
        </p>
      )
    },
  },
}

type Theme = {
  logo?: { asset: { url: string } }
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: { mode: string; customColor?: string }
  headerColor?: { mode: string; customColor?: string }
  footerColor?: { mode: string; customColor?: string }
  footerText?: any
  footerLinks?: {
    label: string
    linkType: 'internal' | 'external'
    internalPage?: { slug: { current: string } }
    externalUrl?: string
  }[]
  socialLinks?: { platform: 'instagram' | 'tiktok' | 'facebook'; url: string }[]
}

function resolveColor(setting: any, theme: Theme) {
  if (setting?.mode === 'primary') return theme?.primaryColor
  if (setting?.mode === 'secondary') return theme?.secondaryColor
  return setting?.customColor
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == "theme"][0]{
          logo { asset->{url} },
          primaryColor,
          secondaryColor,
          backgroundColor,
          headerColor,
          footerColor,
          footerText,
          footerLinks[]{
            label,
            linkType,
            internalPage->{ slug },
            externalUrl
          },
          socialLinks
        }`
      )
      .then(setTheme)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme ? resolveColor(theme.backgroundColor, theme) || '#f9fafb' : '#f9fafb' }}
    >
      {/* Header */}
      <header
        className="p-4 sticky top-0 z-50"
        style={{ backgroundColor: theme ? resolveColor(theme.headerColor, theme) || '#000' : '#000' }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {theme?.logo?.asset?.url ? (
            <a href="/">
              <Image
                src={theme.logo.asset.url}
                alt="Logo"
                height={32}
                width={100}
                priority
                style={{ height: 'auto', width: 'auto' }}
              />
            </a>
          ) : (
            <h1 className="text-2xl font-bold text-white">Zoomies</h1>
          )}
          <nav className="text-white font-light tracking-wide uppercase text-sm">
            <a href="/" className="px-4">Home</a>
            <a href="/harnesses" className="px-4">Harnesses</a>
            <a href="/collars" className="px-4">Collars</a>
            <a href="/leashes" className="px-4">Leashes</a>
            <a href="/accessories" className="px-4">Accessories</a>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-white text-xs px-6 py-10"
        style={{ backgroundColor: theme ? resolveColor(theme.footerColor, theme) || '#000' : '#000' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-8">
          <div className="space-y-4">
            <a href="mailto:info@zoomiesgear.com" className="text-white text-sm underline block">info@zoomiesgear.com</a>
            {theme?.footerText && (
              <div className="prose prose-sm text-white max-w-none">
                <PortableText value={theme.footerText} components={portableTextComponents} />
              </div>
            )}
            <p className="text-white text-xs">© {new Date().getFullYear()} Zoomies. Handmade Dog Gear. All rights reserved.</p>
          </div>
          <div className="space-y-4 text-sm text-white">
            {theme?.footerLinks?.length && (
              <div>
                <h4 className="font-semibold uppercase text-xs mb-2">Explore</h4>
                {theme.footerLinks.map((link, idx) => {
                  const href = link.linkType === 'internal'
                    ? `/${link.internalPage?.slug?.current || ''}`
                    : link.externalUrl || '#'

                  return (
                    <p key={idx}>
                      <a
                        href={href}
                        target={link.linkType === 'external' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </p>
                  )
                })}
              </div>
            )}
            {theme?.socialLinks?.length && (
              <div>
                <h4 className="font-semibold uppercase text-xs mb-2 mt-4">Follow Us</h4>
                <div className="flex space-x-4 text-xl">
                  {theme.socialLinks.map((social) => {
                    const Icon =
                      social.platform === 'instagram' ? FaInstagram :
                      social.platform === 'tiktok' ? FaTiktok :
                      social.platform === 'facebook' ? FaFacebook : null

                    return (
                      Icon && (
                        <a key={social.platform} href={social.url} aria-label={social.platform} target="_blank" rel="noopener noreferrer">
                          <Icon />
                        </a>
                      )
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}