import { GetStaticProps } from 'next'
import Page from './[slug]'
import { sanity } from '@/lib/sanity'

export default Page

export const getStaticProps: GetStaticProps = async () => {
  const page = await sanity.fetch(
    `*[_type == "page" && slug.current == "home"][0]{
      title,
      "sections": sections[]{
        ...,
        "image": image{asset->{url}},
        "backgroundImage": backgroundImage{asset->{url}}
      }
    }`
  )

  if (!page) {
    return { notFound: true }
  }

  return {
    props: { page },
    revalidate: 60,
  }
}