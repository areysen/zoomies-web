import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const config = {
  projectId: '09a82cp6',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
}

const client = createClient(config)

const builder = imageUrlBuilder(config)

export function urlForImage(source: any) {
  return builder.image(source)
}

export default client