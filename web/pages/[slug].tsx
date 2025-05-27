// pages/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next'
import { sanity } from '@/lib/sanity'
import Head from 'next/head'
import Layout from '@/components/Layout'
import HeroSection from '@/components/sections/HeroSection'
import TextSection from '@/components/sections/TextSection'
import ImageSection from '@/components/sections/ImageSection'
import FormSection from '@/components/sections/FormSection'
import RichText from '@/components/sections/RichText'
import InfoGroup from '@/components/sections/InfoGroup'

export default function Page({ page }: { page: any }) {
  if (!page) return <div>Page not found</div>

  const renderSection = (section: any, i: number) => {
    switch (section._type) {
      case 'heroSection':
        return <HeroSection key={i} {...section} />
      case 'textSection':
        return <TextSection key={i} {...section} />
      case 'imageSection':
        return <ImageSection key={i} {...section} />
      case 'formSection':
        return <FormSection key={i} {...section} />
      case 'infoGroup':
        return <InfoGroup key={i} {...section} />
      case 'richText':
        return <RichText key={i} content={section.content} />
      default:
        return null
    }
  }

  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
      </Head>
      <div>
        {page.sections?.map((section: any, i: number) => renderSection(section, i))}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanity.fetch(`*[_type == "page" && defined(slug.current)][].slug.current`)

  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const rawSlug = params?.slug as string
  const slug = rawSlug || ''
  const page = await sanity.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      "sections": sections[]{
        ...,
        "image": image{asset->{url}},
        "backgroundImage": backgroundImage{asset->{url}}
      }
    }`,
    { slug }
  )

  if (!page) {
    return { notFound: true }
  }

  return {
    props: { page },
    revalidate: 60,
  }
}